import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import FormulaSyntax from "@/components/FormulaSyntax";
import SliderControl from "@/components/SliderControl";
import VCCCharts from "@/components/VCCCharts";
import { 
  calculateDBRMultiplier, 
  calculateCompoundingRate, 
  calculateBurnMultiplier,
  DEFAULT_DBR_STATE,
  DEFAULT_DBR_CONFIG,
  DEFAULT_AEB_STATE,
  DBRMeta,
  HCRResult,
  AEBMeta,
} from "@/utils/vccCalculations";

export default function Home() {
  // Dynamic Base Reward state
  const [dbrEETFAvg, setDbrEETFAvg] = useState(1.2);
  const [dbrCurrentBR, setDbrCurrentBR] = useState(0);
  const [dbrMeta, setDbrMeta] = useState<DBRMeta>({
    smoothedEetf: DEFAULT_DBR_STATE.smoothedEetf,
    error: 0,
    deltaError: 0,
    unclampedMultiplier: DEFAULT_DBR_CONFIG.baseMultiplier,
    withinDeadband: true,
  });
  const dbrStateRef = useRef({ ...DEFAULT_DBR_STATE });

  // Hyper-Compounding Rewards state
  const [hcrEETFAccount, setHcrEETFAccount] = useState(1.0);
  const [hcrLTHFAccount, setHcrLTHFAccount] = useState(1.0);
  const [hcrResult, setHcrResult] = useState<HCRResult>(() =>
    calculateCompoundingRate(1.0, 1.0)
  );

  // Aggressive Ethical Burn state
  const [aebEETFAvg, setAebEETFAvg] = useState(1.2);
  const [aebBurnAmount, setAebBurnAmount] = useState(0);
  const [aebMeta, setAebMeta] = useState<AEBMeta>({
    smoothedEetf: DEFAULT_AEB_STATE.smoothedEetf,
    logistic: 0.5,
    budgetBurn: 0,
    rawBurn: 0,
  });
  const aebStateRef = useRef({ ...DEFAULT_AEB_STATE });

  useEffect(() => {
    const dbrResult = calculateDBRMultiplier(dbrEETFAvg, dbrStateRef.current);
    dbrStateRef.current = dbrResult.state;
    setDbrCurrentBR(dbrResult.multiplier);
    setDbrMeta(dbrResult.meta);
  }, [dbrEETFAvg]);

  useEffect(() => {
    setHcrResult(calculateCompoundingRate(hcrEETFAccount, hcrLTHFAccount));
  }, [hcrEETFAccount, hcrLTHFAccount]);

  useEffect(() => {
    const aebResult = calculateBurnMultiplier(aebEETFAvg, aebStateRef.current);
    aebStateRef.current = aebResult.state;
    setAebBurnAmount(aebResult.burnMultiplier);
    setAebMeta(aebResult.meta);
  }, [aebEETFAvg]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="text-center py-8 px-4 md:py-12 lg:py-16 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">The Virtuous Cycle Compounder (VCC)</h1>
        <p className="text-lg text-gray-600">A High-Impact TEEC Formula Concept for Aligning Ethics and Rewards</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-16">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="mb-4 text-gray-700">This concept aims to create the most powerful alignment between ethical/ecosystem-beneficial actions (as measured by EETF associated with accounts and transactions) and potential wealth accumulation. It draws inspiration from mechanisms that drove early Bitcoin adoption and value while grounding the rewards in demonstrable "goodness" defined by the TauNet Ethical-Eco Compounder (TEEC) principles.</p>
            <p className="text-gray-700">It focuses on creating strong positive feedback loops where ethical activity is significantly amplified.</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Core Principles</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong className="font-semibold text-gray-800">Aggressive Compounding:</strong> Rewards associated with accounts demonstrating high ethical performance should compound at rates significantly boosted by sustained ethical transaction patterns and long-term commitment (LTHF).</li>
              <li><strong className="font-semibold text-gray-800">Accelerated Deflation:</strong> Network-wide ethical behavior (high average EETF) should trigger increasingly strong deflationary pressure (token burning), linking collective goodness to token scarcity.</li>
              <li><strong className="font-semibold text-gray-800">Positive Feedback Loops:</strong> Mechanisms where high EETF scores from account activity and high collective network ethics reinforce each other, accelerating reward generation and value appreciation.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">VCC Components & Visualizations</h2>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">1. Dynamic & Amplified Base Reward (DBR+)</h3>
                <p className="text-gray-700 mb-2">The base reward multiplier (`Current_BR`) now rides on a smoothed network ethics signal and a PI controller with deadband and anti-windup safeguards. That keeps the system centred on the ethical target while avoiding oscillation or runaway boosts when the crowd surges.</p>
              
              <FormulaSyntax>
{`// Signal smoothing
alpha = ln(2) / half_life
EETF_ema_t = (1 - alpha) * EETF_ema_{t-1} + alpha * EETF_avg_t

// Error & PI control (log space for positivity)
e_t = EETF_target - EETF_ema_t
u_t = u_{t-1}
      + k_p * (e_t - e_{t-1})  // proportional on delta-error
      + k_i * e_t              // integral with deadband + anti-windup

DBR_multiplier_t = clamp(exp(u_t), Min_BR, Max_BR)
Current_BR_t = Base_BR * DBR_multiplier_t`}
              </FormulaSyntax>
              
                <SliderControl
                  id="dbr-eetf-avg-slider"
                  label="Network Avg EETF:"
                  min={0.5}
                  max={2.0}
                  step={0.01}
                  value={dbrEETFAvg}
                  onChange={setDbrEETFAvg}
                  valueDisplay={dbrEETFAvg.toFixed(2)}
                  additionalInfo={`Current BR Multiplier: ${dbrCurrentBR.toFixed(2)}x (EMA ${dbrMeta.smoothedEetf.toFixed(2)})`}
                />
              
              <VCCCharts 
                chartType="dbr" 
                currentValue={dbrEETFAvg} 
                calculatedValue={dbrCurrentBR} 
              />
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">2. Hyper-Compounding Rewards (HCR)</h3>
                <p className="text-gray-700 mb-2">Replaces simple compounding. The *rate* of compounding (`Effective_Comp_Rate`) is set by a capped Cobb–Douglas function of the account's sustained `EETF` and `LTHF`, giving smooth, monotone, and complementary incentives with diminishing returns.</p>
              
              <FormulaSyntax>
{`// Smooth ratios to avoid kinks & retain monotonicity
EETF_ratio = smooth_ratio(EETF_account_avg / EETF_base, smoothness)
LTHF_ratio = smooth_ratio(LTHF_account / LTHF_base, smoothness)

Effective_Comp_Rate =
    clamp(
      Base_Comp_Rate
      * (EETF_ratio)^alpha
      * (LTHF_ratio)^beta,
      Rate_min,
      Rate_max
    )

Compounding_Factor = (1 + Effective_Comp_Rate)^Time`}
              </FormulaSyntax>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SliderControl
                  id="hcr-eetf-account-slider"
                  label="Account Avg EETF:"
                  min={0.8}
                  max={2.0}
                  step={0.01}
                  value={hcrEETFAccount}
                  onChange={setHcrEETFAccount}
                  valueDisplay={hcrEETFAccount.toFixed(2)}
                />
                
                <SliderControl
                  id="hcr-lthf-account-slider"
                  label="Account LTHF:"
                  min={1.0}
                  max={3.0}
                  step={0.01}
                  value={hcrLTHFAccount}
                  onChange={setHcrLTHFAccount}
                  valueDisplay={hcrLTHFAccount.toFixed(2)}
                />
              </div>
              
              <p className="text-center mt-2 text-sm text-gray-600">
                  Effective Annual Compounding Rate: <span className="font-semibold text-blue-800 inline-block bg-blue-100 px-2 py-0.5 rounded text-base">{(hcrResult.effectiveRate * 100).toFixed(2)}</span>%
              </p>
                <p className="text-center mt-1 text-xs text-gray-500">
                  Contribution weights — EETF: {(hcrResult.components.eetfComponent).toFixed(2)}, LTHF: {(hcrResult.components.lthfComponent).toFixed(2)}
                </p>
              
                <VCCCharts 
                  chartType="hcr" 
                  currentValue1={hcrEETFAccount} 
                  currentValue2={hcrLTHFAccount} 
                  calculatedValue={hcrResult.effectiveRate} 
              />
              
              <p className="text-xs text-center text-gray-500 mt-1">Chart shows growth of 100 tokens over 10 years at the calculated rate.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">3. Aggressive Ethical Burn (AEB)</h3>
                <p className="text-gray-700 mb-2">Token burning now centres on the supply budget: the system first calculates how much burn is needed to hit the target inflation path, then applies a logistic tilt based on the smoothed network ethics signal so over-target states burn faster but still within safe bounds.</p>
              
              <FormulaSyntax>
{`// Budget-aligned burn with pro-social tilt
EETF_ema_t = (1 - alpha) * EETF_ema_{t-1} + alpha * EETF_avg_t
Budget_Burn_t = max(0, Issuance_t - pi_target * Supply_t)
Logistic_Tilt_t = 1 + gamma * sigma((EETF_ema_t - EETF_target)/width)

Required_Burn_t = clamp(
  Logistic_Tilt_t * Budget_Burn_t,
  Burn_min,
  Burn_max
)
Relative_Burn = Required_Burn_t / Burn_reference`}
              </FormulaSyntax>
              
                <SliderControl
                  id="aeb-eetf-avg-slider"
                  label="Network Avg EETF:"
                  min={0.5}
                  max={2.0}
                  step={0.01}
                  value={aebEETFAvg}
                  onChange={setAebEETFAvg}
                  valueDisplay={aebEETFAvg.toFixed(2)}
                  additionalInfo={`Relative Burn: ${aebBurnAmount.toFixed(2)}x (EMA ${aebMeta.smoothedEetf.toFixed(2)})`}
                />
                <p className="text-center mt-1 text-xs text-gray-500">
                  Budget burn baseline: {aebMeta.budgetBurn.toFixed(2)}, logistic tilt: {aebMeta.logistic.toFixed(2)}
                </p>
              
              <VCCCharts 
                chartType="aeb" 
                currentValue={aebEETFAvg} 
                calculatedValue={aebBurnAmount} 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Why this is Powerful: Synergy & Feedback</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong className="font-semibold text-gray-800">Synergy:</strong> High EETF scores associated with an account's transactions directly boost base rewards AND dramatically increase the effective compounding rate (HCR) for that account's holdings.</li>
              <li><strong className="font-semibold text-gray-800">Feedback Loop 1 (Account-Level):</strong> Sustained high average EETF for an account leads to exponentially faster growth of holdings via HCR.</li>
              <li><strong className="font-semibold text-gray-800">Feedback Loop 2 (Collective):</strong> High network average EETF increases the base reward for all (DBR+) AND triggers aggressive burning (AEB), reducing supply and potentially increasing the value of tokens held by all accounts.</li>
              <li><strong className="font-semibold text-gray-800">Alignment:</strong> The path to potentially significant returns is explicitly tied to maximizing EETF scores associated with account activity and the collective network average over the long term. It aims to make sustained "goodness" (as defined by transaction evaluation criteria) the most profitable strategy, regardless of whether the actor is human or AI.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300 mb-8">
          <h3 className="font-semibold text-gray-700 mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-500">This website presents a conceptual model (VCC). The precise parameters (Sensitivities, Factors, Rates, Targets, Base Values) are illustrative and would require extensive modeling, simulation, and governance via community consensus to ensure stability and achieve the intended effects without unintended consequences. The non-linearities introduced make the system potentially powerful but also highly sensitive and complex to calibrate.</p>
        </div>
      </main>

      <footer className="text-center mt-10 pt-5 border-t border-gray-300 max-w-7xl mx-auto px-4">
        <p className="text-sm text-gray-500 pb-6">VCC Concept Explainer</p>
      </footer>
    </div>
  );
}
