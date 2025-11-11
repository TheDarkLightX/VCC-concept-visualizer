const MIN_NUMERIC = 1e-9;

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// -----------------------------
// Dynamic Base Reward (DBR+)
// -----------------------------

export interface DBRConfig {
  targetEetf: number;
  baseMultiplier: number;
  minMultiplier: number;
  maxMultiplier: number;
  proportionalGain: number;
  integralGain: number;
  emaHalfLife: number;
  deadband: number;
  antiWindupFactor: number;
}

export interface DBRState {
  smoothedEetf: number;
  previousError: number;
  logControl: number;
}

export interface DBRMeta {
  smoothedEetf: number;
  error: number;
  deltaError: number;
  unclampedMultiplier: number;
  withinDeadband: boolean;
}

export interface DBRResult {
  multiplier: number;
  state: DBRState;
  meta: DBRMeta;
}

export const DEFAULT_DBR_CONFIG: DBRConfig = {
  targetEetf: 1.0,
  baseMultiplier: 1.0,
  minMultiplier: 0.5,
  maxMultiplier: 3.0,
  proportionalGain: 0.35,
  integralGain: 0.12,
  emaHalfLife: 4, // epochs
  deadband: 0.015,
  antiWindupFactor: 0.4,
};

export const DEFAULT_DBR_STATE: DBRState = {
  smoothedEetf: DEFAULT_DBR_CONFIG.targetEetf,
  previousError: 0,
  logControl: Math.log(DEFAULT_DBR_CONFIG.baseMultiplier),
};

const LN_2 = Math.log(2);

const computeAlpha = (halfLife: number): number => {
  if (!Number.isFinite(halfLife) || halfLife <= 0) {
    return 1;
  }
  return Math.min(1, Math.max(0, LN_2 / halfLife));
};

const applyDeadband = (error: number, deadband: number): { effectiveError: number; withinDeadband: boolean } => {
  const withinDeadband = Math.abs(error) <= deadband;
  return {
    effectiveError: withinDeadband ? 0 : error,
    withinDeadband,
  };
};

export function calculateDBRMultiplier(
  eetfAvg: number,
  previousState: DBRState = DEFAULT_DBR_STATE,
  config: DBRConfig = DEFAULT_DBR_CONFIG
): DBRResult {
  const alpha = computeAlpha(config.emaHalfLife);
  const smoothedEetf = (1 - alpha) * previousState.smoothedEetf + alpha * eetfAvg;

  const rawError = config.targetEetf - smoothedEetf;
  const deltaError = rawError - previousState.previousError;
  const { effectiveError, withinDeadband } = applyDeadband(rawError, config.deadband);

  const proportionalIncrement = withinDeadband ? 0 : config.proportionalGain * deltaError;
  const integralIncrement = config.integralGain * effectiveError;

  const proposedLogControl = previousState.logControl + proportionalIncrement + integralIncrement;
  const unclampedMultiplier = Math.exp(proposedLogControl);
  const multiplier = clamp(unclampedMultiplier, config.minMultiplier, config.maxMultiplier);
  const clampedLogControl = Math.log(multiplier);

  const updatedLogControl =
    multiplier === unclampedMultiplier
      ? clampedLogControl
      : previousState.logControl + config.antiWindupFactor * (clampedLogControl - previousState.logControl);

  const nextState: DBRState = {
    smoothedEetf,
    previousError: rawError,
    logControl: updatedLogControl,
  };

  return {
    multiplier,
    state: nextState,
    meta: {
      smoothedEetf,
      error: rawError,
      deltaError,
      unclampedMultiplier,
      withinDeadband,
    },
  };
}

// -----------------------------
// Hyper-Compounding Rewards (HCR)
// -----------------------------

export interface HCRConfig {
  baseRate: number;
  minRate: number;
  maxRate: number;
  baseEetf: number;
  baseLthf: number;
  alpha: number;
  beta: number;
  smoothness: number;
}

export interface HCRResult {
  effectiveRate: number;
  components: {
    eetfComponent: number;
    lthfComponent: number;
  };
  ratios: {
    eetf: number;
    lthf: number;
    smoothedEetf: number;
    smoothedLthf: number;
  };
}

export const DEFAULT_HCR_CONFIG: HCRConfig = {
  baseRate: 0.05,
  minRate: 0.01,
  maxRate: 0.3,
  baseEetf: 1.0,
  baseLthf: 1.0,
  alpha: 0.6,
  beta: 0.35,
  smoothness: 2.4,
};

const smoothRatio = (value: number, baseline: number, smoothness: number): number => {
  const ratio = Math.max(value, MIN_NUMERIC) / Math.max(baseline, MIN_NUMERIC);
  if (!Number.isFinite(ratio) || ratio <= 0) {
    return 1;
  }

  if (smoothness <= 0) {
    return ratio;
  }

  const logRatio = Math.log(ratio);
  const smoothedLog = Math.tanh(logRatio * smoothness) / Math.max(smoothness, MIN_NUMERIC);
  return Math.exp(smoothedLog);
};

export function calculateCompoundingRate(
  eetfAccountAvg: number,
  lthfAccount: number,
  config: HCRConfig = DEFAULT_HCR_CONFIG
): HCRResult {
  const smoothEetfRatio = smoothRatio(eetfAccountAvg, config.baseEetf, config.smoothness);
  const smoothLthfRatio = smoothRatio(lthfAccount, config.baseLthf, config.smoothness);

  const eetfComponent = Math.pow(smoothEetfRatio, config.alpha);
  const lthfComponent = Math.pow(smoothLthfRatio, config.beta);

  const unclampedRate = config.baseRate * eetfComponent * lthfComponent;
  const effectiveRate = clamp(unclampedRate, config.minRate, config.maxRate);

  return {
    effectiveRate,
    components: {
      eetfComponent,
      lthfComponent,
    },
    ratios: {
      eetf: Math.max(eetfAccountAvg, MIN_NUMERIC) / Math.max(config.baseEetf, MIN_NUMERIC),
      lthf: Math.max(lthfAccount, MIN_NUMERIC) / Math.max(config.baseLthf, MIN_NUMERIC),
      smoothedEetf: smoothEetfRatio,
      smoothedLthf: smoothLthfRatio,
    },
  };
}

// -----------------------------
// Aggressive Ethical Burn (AEB)
// -----------------------------

export interface AEBConfig {
  targetEetf: number;
  targetInflation: number;
  nominalSupply: number;
  baseIssuance: number;
  logisticWidth: number;
  gamma: number;
  emaHalfLife: number;
  minBurnMultiplier: number;
  maxBurnMultiplier: number;
  baseBurnReference?: number;
}

export interface AEBState {
  smoothedEetf: number;
}

export interface AEBMeta {
  smoothedEetf: number;
  logistic: number;
  budgetBurn: number;
  rawBurn: number;
}

export interface AEBResult {
  burnMultiplier: number;
  state: AEBState;
  meta: AEBMeta;
}

export const DEFAULT_AEB_CONFIG: AEBConfig = {
  targetEetf: 1.0,
  targetInflation: 0.015,
  nominalSupply: 1.0,
  baseIssuance: 1.0,
  logisticWidth: 0.1,
  gamma: 1.8,
  emaHalfLife: 5,
  minBurnMultiplier: 0,
  maxBurnMultiplier: 6,
};

export const DEFAULT_AEB_STATE: AEBState = {
  smoothedEetf: DEFAULT_AEB_CONFIG.targetEetf,
};

export function calculateBurnMultiplier(
  eetfAvg: number,
  previousState: AEBState = DEFAULT_AEB_STATE,
  config: AEBConfig = DEFAULT_AEB_CONFIG
): AEBResult {
  const alpha = computeAlpha(config.emaHalfLife);
  const smoothedEetf = (1 - alpha) * previousState.smoothedEetf + alpha * eetfAvg;

  const budgetBurn = Math.max(0, config.baseIssuance - config.targetInflation * config.nominalSupply);
  const logisticInput = (smoothedEetf - config.targetEetf) / Math.max(config.logisticWidth, MIN_NUMERIC);
  const logistic = 1 / (1 + Math.exp(-logisticInput));

  const rawBurn = budgetBurn * (1 + config.gamma * logistic);
  const reference = config.baseBurnReference && config.baseBurnReference > 0 ? config.baseBurnReference : Math.max(budgetBurn, MIN_NUMERIC);
  const burnMultiplier = clamp(rawBurn / reference, config.minBurnMultiplier, config.maxBurnMultiplier);

  const nextState: AEBState = {
    smoothedEetf,
  };

  return {
    burnMultiplier,
    state: nextState,
    meta: {
      smoothedEetf,
      logistic,
      budgetBurn,
      rawBurn,
    },
  };
}

/**
 * Generate data for the DBR chart
 * @returns Array of data points for the chart
 */
const simulateDBRSteadyState = (eetfAvg: number, iterations = 32): number => {
  let state: DBRState = { ...DEFAULT_DBR_STATE };
  let result: DBRResult = {
    multiplier: DEFAULT_DBR_CONFIG.baseMultiplier,
    state,
    meta: {
      smoothedEetf: state.smoothedEetf,
      error: 0,
      deltaError: 0,
      unclampedMultiplier: DEFAULT_DBR_CONFIG.baseMultiplier,
      withinDeadband: true,
    },
  };

  for (let i = 0; i < iterations; i += 1) {
    result = calculateDBRMultiplier(eetfAvg, state);
    state = result.state;
  }

  return result.multiplier;
};

export function generateDBRChartData(): number[] {
  const chartData: number[] = [];
  for (let i = 0.5; i <= 2.001; i += 0.1) {
    chartData.push(simulateDBRSteadyState(+i.toFixed(3)));
  }
  return chartData;
}

/**
 * Generate data for the HCR chart
 * @param effectiveRate The effective compounding rate
 * @returns Object with standard and hyper-compounding data points
 */
export function generateHCRChartData(effectiveRate: number): { standard: number[]; hyperCompounding: number[] } {
  const standard: number[] = [];
  const hyperCompounding: number[] = [];
  
  for (let i = 0; i <= 10; i++) {
    standard.push(100 * Math.pow(1.05, i));
    hyperCompounding.push(100 * Math.pow(1 + effectiveRate, i));
  }
  
  return { standard, hyperCompounding };
}

/**
 * Generate data for the AEB chart
 * @returns Array of data points for the chart
 */
const simulateAEBSteadyState = (eetfAvg: number, iterations = 24): number => {
  let state: AEBState = { ...DEFAULT_AEB_STATE };
  let result = calculateBurnMultiplier(eetfAvg, state);
  state = result.state;

  for (let i = 1; i < iterations; i += 1) {
    result = calculateBurnMultiplier(eetfAvg, state);
    state = result.state;
  }

  return result.burnMultiplier;
};

export function generateAEBChartData(): number[] {
  const chartData: number[] = [];
  for (let i = 0.5; i <= 2.001; i += 0.1) {
    chartData.push(simulateAEBSteadyState(+i.toFixed(3)));
  }
  return chartData;
}

/**
 * Generate x-axis labels for the DBR and AEB charts
 * @returns Array of x-axis labels
 */
export function generateEETFLabels(): string[] {
  return Array.from({length: 16}, (_, i) => (i/10 + 0.5).toFixed(1));
}

/**
 * Generate x-axis labels for the HCR chart (years)
 * @returns Array of x-axis labels (years)
 */
export function generateYearLabels(): number[] {
  return Array.from({length: 11}, (_, i) => i);
}
