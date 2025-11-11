const EETF_TARGET = 1.0;
const MIN_BR_FACTOR = 0.5;
const MAX_BR_FACTOR = 3.0;

const DEFAULT_HALF_LIFE = 4; // epochs
const DEFAULT_KP = 0.35;
const DEFAULT_KI = 0.08;
const DEFAULT_DEADBAND = 0.015;
const DEFAULT_DEADBAND_KP_SCALE = 0.2;
const DEFAULT_ANTI_WINDUP = 0.25;
const DBR_STEADY_STATE_STEPS = 24;

const BASE_COMP_RATE = 0.05;
const MIN_COMP_RATE = 0.01;
const MAX_COMP_RATE = 0.2;
const BASE_EETF = 1.0;
const BASE_LTHF = 1.0;
const MIN_RATIO = 0.05;
const HCR_ALPHA = 0.6;
const HCR_BETA = 0.4;

const BASE_ISSUANCE = 5.0;
const BASE_ACTIVITY = 1.0;
const SUPPLY_REFERENCE = 100;
const TARGET_INFLATION_RATE = 0.03;
const LOGISTIC_SCALE = 0.15;
const BURN_GAMMA = 1.4;
const MIN_BURN = 0;
const MAX_BURN = 8;

const BASELINE_DBR = 1.0;
const BASE_BURN_AT_TARGET = Math.max(
  0,
  BASE_ISSUANCE * BASE_ACTIVITY * BASELINE_DBR - TARGET_INFLATION_RATE * SUPPLY_REFERENCE,
);

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function logistic(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function computeAlpha(halfLife: number): number {
  return Math.log(2) / halfLife;
}

export interface DBRControllerParams {
  target: number;
  minMultiplier: number;
  maxMultiplier: number;
  halfLife: number;
  kP: number;
  kI: number;
  deadband: number;
  deadbandKpScale: number;
  antiWindup: number;
}

export interface DBRControllerState {
  ema: number;
  error: number;
  u: number;
}

export interface DBRStepResult {
  multiplier: number;
  state: DBRControllerState;
}

export const DBR_DEFAULT_PARAMS: DBRControllerParams = {
  target: EETF_TARGET,
  minMultiplier: MIN_BR_FACTOR,
  maxMultiplier: MAX_BR_FACTOR,
  halfLife: DEFAULT_HALF_LIFE,
  kP: DEFAULT_KP,
  kI: DEFAULT_KI,
  deadband: DEFAULT_DEADBAND,
  deadbandKpScale: DEFAULT_DEADBAND_KP_SCALE,
  antiWindup: DEFAULT_ANTI_WINDUP,
};

export function createDefaultDBRState(
  params: Pick<DBRControllerParams, "target"> = DBR_DEFAULT_PARAMS,
): DBRControllerState {
  return {
    ema: params.target,
    error: 0,
    u: Math.log(1),
  };
}

export function stepDBRController(
  eetfAvg: number,
  prevState: DBRControllerState,
  params: DBRControllerParams = DBR_DEFAULT_PARAMS,
): DBRStepResult {
  const alpha = computeAlpha(params.halfLife);
  const ema = (1 - alpha) * prevState.ema + alpha * eetfAvg;
  const error = params.target - ema;
  const kp =
    Math.abs(error) < params.deadband ? params.kP * params.deadbandKpScale : params.kP;

  const proportional = kp * (error - prevState.error);
  let integralContribution = params.kI * error;
  let tentativeU = prevState.u + proportional + integralContribution;
  let tentativeMultiplier = Math.exp(tentativeU);
  let clampedMultiplier = clamp(tentativeMultiplier, params.minMultiplier, params.maxMultiplier);

  if (clampedMultiplier !== tentativeMultiplier) {
    integralContribution = params.kI * error * params.antiWindup;
    tentativeU = prevState.u + proportional + integralContribution;
    tentativeMultiplier = Math.exp(tentativeU);
    clampedMultiplier = clamp(tentativeMultiplier, params.minMultiplier, params.maxMultiplier);
  }

  const newU = Math.log(clampedMultiplier);

  return {
    multiplier: clampedMultiplier,
    state: {
      ema,
      error,
      u: newU,
    },
  };
}

function simulateDBRSteadyState(
  eetfAvg: number,
  params: DBRControllerParams = DBR_DEFAULT_PARAMS,
  steps: number = DBR_STEADY_STATE_STEPS,
): DBRStepResult {
  let state = createDefaultDBRState(params);
  let result: DBRStepResult = { multiplier: Math.exp(state.u), state };

  for (let i = 0; i < steps; i += 1) {
    result = stepDBRController(eetfAvg, state, params);
    state = result.state;
  }

  return result;
}

export function calculateDBRMultiplier(eetfAvg: number): number;
export function calculateDBRMultiplier(
  eetfAvg: number,
  prevState: DBRControllerState,
  params?: DBRControllerParams,
): DBRStepResult;
export function calculateDBRMultiplier(
  eetfAvg: number,
  prevState?: DBRControllerState,
  params: DBRControllerParams = DBR_DEFAULT_PARAMS,
): number | DBRStepResult {
  if (!prevState) {
    return simulateDBRSteadyState(eetfAvg, params).multiplier;
  }

  return stepDBRController(eetfAvg, prevState, params);
}

export function generateDBRChartData(): number[] {
  const chartData: number[] = [];
  for (let i = 0.5; i <= 2.0; i += 0.1) {
    chartData.push(simulateDBRSteadyState(parseFloat(i.toFixed(1))).multiplier);
  }
  return chartData;
}

export function calculateCompoundingRate(
  eetfAccountAvg: number,
  lthfAccount: number,
): number {
  const eetfRatio = Math.max(eetfAccountAvg, MIN_RATIO) / BASE_EETF;
  const lthfRatio = Math.max(lthfAccount, MIN_RATIO) / BASE_LTHF;

  const rawRate =
    BASE_COMP_RATE * Math.pow(eetfRatio, HCR_ALPHA) * Math.pow(lthfRatio, HCR_BETA);

  return clamp(rawRate, MIN_COMP_RATE, MAX_COMP_RATE);
}

export interface BurnOutcome {
  relativeBurn: number;
  absoluteBurn: number;
  issuance: number;
  budgetBurn: number;
  modulation: number;
  dbrMultiplier: number;
  dbrEma: number;
}

export function calculateBurnOutcome(
  eetfAvg: number,
  dbrState?: DBRControllerState,
  dbrMultiplier?: number,
): BurnOutcome {
  const { multiplier, state } = dbrState && typeof dbrMultiplier === "number"
    ? { multiplier: dbrMultiplier, state: dbrState }
    : simulateDBRSteadyState(eetfAvg);

  const issuance = BASE_ISSUANCE * multiplier * BASE_ACTIVITY;
  const budgetBurn = Math.max(0, issuance - TARGET_INFLATION_RATE * SUPPLY_REFERENCE);
  const modulation =
    1 + BURN_GAMMA * (logistic((state.ema - EETF_TARGET) / LOGISTIC_SCALE) - 0.5);
  const absoluteBurn = clamp(modulation * budgetBurn, MIN_BURN, MAX_BURN);
  const relativeBurn =
    BASE_BURN_AT_TARGET > 0 ? absoluteBurn / BASE_BURN_AT_TARGET : absoluteBurn;

  return {
    relativeBurn,
    absoluteBurn,
    issuance,
    budgetBurn,
    modulation,
    dbrMultiplier: multiplier,
    dbrEma: state.ema,
  };
}

export function calculateBurnMultiplier(
  eetfAvg: number,
  dbrState?: DBRControllerState,
  dbrMultiplier?: number,
): number {
  return calculateBurnOutcome(eetfAvg, dbrState, dbrMultiplier).relativeBurn;
}

export function generateHCRChartData(
  effectiveRate: number,
): { standard: number[]; hyperCompounding: number[] } {
  const standard: number[] = [];
  const hyperCompounding: number[] = [];

  for (let i = 0; i <= 10; i += 1) {
    standard.push(100 * Math.pow(1.05, i));
    hyperCompounding.push(100 * Math.pow(1 + effectiveRate, i));
  }

  return { standard, hyperCompounding };
}

export function generateAEBChartData(): number[] {
  const chartData: number[] = [];
  for (let i = 0.5; i <= 2.0; i += 0.1) {
    chartData.push(calculateBurnMultiplier(parseFloat(i.toFixed(1))));
  }
  return chartData;
}

export function generateEETFLabels(): string[] {
  return Array.from({ length: 16 }, (_, i) => (i / 10 + 0.5).toFixed(1));
}

export function generateYearLabels(): number[] {
  return Array.from({ length: 11 }, (_, i) => i);
}
