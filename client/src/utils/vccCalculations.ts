// Constants
const EETF_TARGET = 1.0;
const BASE_BR = 1.0;
const MIN_BR_FACTOR = 0.5;
const MAX_BR_FACTOR = 3.0;
const DBR_SENSITIVITY = 2.0;
const NETWORK_FEEDBACK_FACTOR = 0.5;

const BASE_COMP_RATE = 0.05; // 5% base annual compounding
const EETF_COMP_SENSITIVITY = 1.0;
const LTHF_COMP_SENSITIVITY = 0.5;
const BASE_EETF = 1.0;
const BASE_LTHF = 1.0;

const POWER_SENSITIVITY = 2.0;
const EETF_TARGET_BURN = 1.0;

/**
 * Calculate the Dynamic Base Reward multiplier
 * @param eetfAvg Network average EETF
 * @returns The calculated BR multiplier
 */
export function calculateDBRMultiplier(eetfAvg: number): number {
  const enhancedSensitivity = DBR_SENSITIVITY * (1 + NETWORK_FEEDBACK_FACTOR * Math.max(0, eetfAvg - EETF_TARGET));
  const enhancedMultiplier = 1 + enhancedSensitivity * (eetfAvg - EETF_TARGET);
  // Clamp the value
  return Math.min(Math.max(enhancedMultiplier, MIN_BR_FACTOR), MAX_BR_FACTOR);
}

/**
 * Calculate the compounding rate for HCR
 * @param eetfAccountAvg Account's average EETF
 * @param lthfAccount Account's LTHF
 * @returns The effective compounding rate
 */
export function calculateCompoundingRate(eetfAccountAvg: number, lthfAccount: number): number {
  const eetfCompMult = 1 + EETF_COMP_SENSITIVITY * Math.max(0, eetfAccountAvg - BASE_EETF);
  const lthfCompMult = 1 + LTHF_COMP_SENSITIVITY * Math.max(0, lthfAccount - BASE_LTHF);
  return BASE_COMP_RATE * eetfCompMult * lthfCompMult;
}

/**
 * Calculate the burn multiplier for AEB
 * @param eetfAvg Network average EETF
 * @returns The burn multiplier
 */
export function calculateBurnMultiplier(eetfAvg: number): number {
  return Math.pow(1 + Math.max(0, eetfAvg - EETF_TARGET_BURN), POWER_SENSITIVITY);
}

/**
 * Generate data for the DBR chart
 * @returns Array of data points for the chart
 */
export function generateDBRChartData(): number[] {
  const chartData = [];
  for (let i = 0.5; i <= 2.0; i += 0.1) {
    chartData.push(calculateDBRMultiplier(i));
  }
  return chartData;
}

/**
 * Generate data for the HCR chart
 * @param effectiveRate The effective compounding rate
 * @returns Object with standard and hyper-compounding data points
 */
export function generateHCRChartData(effectiveRate: number): { standard: number[], hyperCompounding: number[] } {
  const standard = [];
  const hyperCompounding = [];
  
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
export function generateAEBChartData(): number[] {
  const chartData = [];
  for (let i = 0.5; i <= 2.0; i += 0.1) {
    chartData.push(calculateBurnMultiplier(i));
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
