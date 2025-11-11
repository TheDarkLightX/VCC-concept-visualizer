import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FormulaSyntax from "@/components/FormulaSyntax";
import SliderControl from "@/components/SliderControl";
import VCCCharts from "@/components/VCCCharts";
import {
  calculateBurnOutcome,
  calculateCompoundingRate,
  calculateDBRMultiplier,
  createDefaultDBRState,
  type DBRControllerState,
} from "@/utils/vccCalculations";

export default function Home() {
  // Dynamic Base Reward state
  const [dbrEETFAvg, setDbrEETFAvg] = useState(1.2);
  const [dbrControllerState, setDbrControllerState] = useState<DBRControllerState>(() =>
    createDefaultDBRState(),
  );
  const [dbrCurrentBR, setDbrCurrentBR] = useState(1);

  // Hyper-Compounding Rewards state
  const [hcrEETFAccount, setHcrEETFAccount] = useState(1.0);
  const [hcrLTHFAccount, setHcrLTHFAccount] = useState(1.0);
  const [hcrEffectiveRate, setHcrEffectiveRate] = useState(0);

  // Aggressive Ethical Burn state
  const [aebEETFAvg, setAebEETFAvg] = useState(1.2);
  const [aebOutcome, setAebOutcome] = useState(() => calculateBurnOutcome(1.2));

  useEffect(() => {
    setHcrEffectiveRate(calculateCompoundingRate(hcrEETFAccount, hcrLTHFAccount));
  }, [hcrEETFAccount, hcrLTHFAccount]);

  useEffect(() => {
    setDbrControllerState(prevState => {
      const { multiplier, state } = calculateDBRMultiplier(dbrEETFAvg, prevState);
      setDbrCurrentBR(multiplier);
      return state;
    });
  }, [dbrEETFAvg]);

  useEffect(() => {
    setAebOutcome(calculateBurnOutcome(aebEETFAvg));
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
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">
                VCC Components & Visualizations
              </h2>

              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">
                  1. Dynamic Base Reward (PI Controlled)
                </h3>
                <p className="text-gray-700 mb-2">
                  The base reward multiplier (`Current_BR`) reacts to the network&apos;s smoothed ethical signal via a discrete PI controller. Persistent shortfalls below the target lift rewards for everyone, while sustained overshoots gently cool rewards, promoting stability without abrupt jumps.
                </p>

                <FormulaSyntax>
{`α = ln(2) / Half_Life
EETF_EMA_t = (1 - α) * EETF_EMA_{t-1} + α * EETF_avg_t
e_t = EETF_target - EETF_EMA_t
u_t = u_{t-1} + k_p (e_t - e_{t-1}) + k_i e_t
DBR_multiplier_t = Clamp(exp(u_t), Min_BR_Factor, Max_BR_Factor)
// Inside a dead-band: use a reduced k_p to add hysteresis`}
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
                  additionalInfo={`Current BR Multiplier: ${dbrCurrentBR.toFixed(2)}x`}
                />

                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2">
                  <div>
                    <span className="font-semibold text-gray-800">Smoothed EETF: </span>
                    {dbrControllerState.ema.toFixed(3)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">PI error: </span>
                    {dbrControllerState.error.toFixed(3)}
                  </div>
                </div>

                <button
                  className="mt-3 rounded border border-blue-200 bg-white px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
                  onClick={() => {
                    setDbrControllerState(createDefaultDBRState());
                    setDbrCurrentBR(1);
                  }}
                >
                  Reset Controller State
                </button>

                <VCCCharts
                  chartType="dbr"
                  currentValue={dbrEETFAvg}
                  calculatedValue={dbrCurrentBR}
                />
              </div>

              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">2. Hyper-Compounding Rewards (HCR)</h3>
                <p className="text-gray-700 mb-2">
                  Replaces simple compounding with a bounded Cobb–Douglas response to account-level ethics and long-term holding. Returns remain monotone and complementary—both signals high is best—while hard caps prevent runaway rates.
                </p>

                <FormulaSyntax>
{`Effective_Comp_Rate = Clamp(
Base_Comp_Rate *
(EETF_account_avg / Base_EETF)^α *
(LTHF_account / Base_LTHF)^β,
Rate_min,
Rate_max)
Compounding_Factor = (1 + Effective_Comp_Rate)^Time`}
                </FormulaSyntax>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                <p className="mt-2 text-center text-sm text-gray-600">
                  Effective Annual Compounding Rate:{" "}
                  <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-base font-semibold text-blue-800">
                    {(hcrEffectiveRate * 100).toFixed(2)}
                  </span>
                  %
                </p>

                <VCCCharts
                  chartType="hcr"
                  currentValue1={hcrEETFAccount}
                  currentValue2={hcrLTHFAccount}
                  calculatedValue={hcrEffectiveRate}
                />

                <p className="mt-1 text-center text-xs text-gray-500">
                  Chart shows growth of 100 tokens over 10 years at the calculated rate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">3. Aggressive Ethical Burn (AEB)</h3>
                <p className="text-gray-700 mb-2">
                  Couples burning to a supply target: the network must burn the surplus when issuance exceeds the desired inflation path, and a logistic tilt makes high ethical periods burn a little hotter without blowing past caps.
                </p>

                <FormulaSyntax>
{`Issuance_t = Base_Issuance * Activity_t * DBR_multiplier_t
Budget_Burn_t = max(0, Issuance_t - π* * Supply_t)
σ(z) = 1 / (1 + e^{-z})
Modulation_t = 1 + γ * (σ((EETF_EMA_t - 1)/s) - 0.5)
Burn_t = Clamp(Modulation_t * Budget_Burn_t, Burn_min, Burn_max)`}
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
                  additionalInfo={`Relative Burn Factor: ${aebOutcome.relativeBurn.toFixed(2)}x baseline`}
                />

                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2">
                  <div>
                    <span className="font-semibold text-gray-800">Issuance (normalized): </span>
                    {aebOutcome.issuance.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Budget burn need: </span>
                    {aebOutcome.budgetBurn.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Modulation factor: </span>
                    {aebOutcome.modulation.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Actual burn (normalized): </span>
                    {aebOutcome.absoluteBurn.toFixed(2)}
                  </div>
                </div>

                <VCCCharts
                  chartType="aeb"
                  currentValue={aebEETFAvg}
                  calculatedValue={aebOutcome.relativeBurn}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Why this is Powerful: Synergy & Feedback</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong className="font-semibold text-gray-800">Synergy:</strong> Individual ethical performance earns higher compounding via HCR, while the shared DBR/AEB loop keeps the network anchored near its target.</li>
                <li><strong className="font-semibold text-gray-800">Feedback Loop 1 (Account-Level):</strong> Sustained high average EETF for an account drives faster balance growth through the bounded Cobb–Douglas compounding rate.</li>
                <li><strong className="font-semibold text-gray-800">Feedback Loop 2 (Collective):</strong> Network EETF below target lifts DBR multipliers to encourage improvement; when ethics run hot, AEB removes surplus supply to protect value.</li>
                <li><strong className="font-semibold text-gray-800">Alignment:</strong> The strongest returns come from keeping both individual and collective ethics high over time, linking token value directly to sustained pro-social behaviour.</li>
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
