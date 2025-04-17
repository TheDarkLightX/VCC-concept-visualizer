import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FormulaSyntax from "@/components/FormulaSyntax";
import SliderControl from "@/components/SliderControl";
import VCCCharts from "@/components/VCCCharts";
import { 
  calculateDBRMultiplier, 
  calculateCompoundingRate, 
  calculateBurnMultiplier 
} from "@/utils/vccCalculations";

export default function Home() {
  // Dynamic Base Reward state
  const [dbrEETFAvg, setDbrEETFAvg] = useState(1.2);
  const [dbrCurrentBR, setDbrCurrentBR] = useState(0);

  // Hyper-Compounding Rewards state
  const [hcrEETFAccount, setHcrEETFAccount] = useState(1.0);
  const [hcrLTHFAccount, setHcrLTHFAccount] = useState(1.0);
  const [hcrEffectiveRate, setHcrEffectiveRate] = useState(0);

  // Aggressive Ethical Burn state
  const [aebEETFAvg, setAebEETFAvg] = useState(1.2);
  const [aebBurnAmount, setAebBurnAmount] = useState(0);

  useEffect(() => {
    // Calculate values on initial render and state changes
    setDbrCurrentBR(calculateDBRMultiplier(dbrEETFAvg));
    setHcrEffectiveRate(calculateCompoundingRate(hcrEETFAccount, hcrLTHFAccount));
    setAebBurnAmount(calculateBurnMultiplier(aebEETFAvg));
  }, [dbrEETFAvg, hcrEETFAccount, hcrLTHFAccount, aebEETFAvg]);

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
              <p className="text-gray-700 mb-2">The base reward multiplier (`Current_BR`) used in all TEEC calculations adjusts based on the network's average EETF (`EETF_avg`). Higher average ethics boost the base reward for everyone. This version includes a subtle feedback where the sensitivity might slightly increase at very high `EETF_avg`.</p>
              
              <FormulaSyntax>
{`BR_Multiplier = 1 + DBR_Sensitivity * (EETF_avg - EETF_target)
Clamped_Multiplier = Clamp(BR_Multiplier, Min_BR_Factor, Max_BR_Factor)
// Optional Enhancement:
Enhanced_Sensitivity = DBR_Sensitivity * (1 + Network_Feedback_Factor * max(0, EETF_avg - EETF_target))
Enhanced_BR_Multiplier = 1 + Enhanced_Sensitivity * (EETF_avg - EETF_target)
Enhanced_Clamped_Multiplier = Clamp(Enhanced_BR_Multiplier, Min_BR_Factor, Max_BR_Factor)

Current_BR = Base_BR * Enhanced_Clamped_Multiplier // Use enhanced version`}
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
              
              <VCCCharts 
                chartType="dbr" 
                currentValue={dbrEETFAvg} 
                calculatedValue={dbrCurrentBR} 
              />
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">2. Hyper-Compounding Rewards (HCR)</h3>
              <p className="text-gray-700 mb-2">Replaces simple compounding. The *rate* of compounding (`Effective_Comp_Rate`) is aggressively boosted by an account's sustained average EETF (`EETF_account_avg`) and Long-Term Holding Factor (`LTHF_account`).</p>
              
              <FormulaSyntax>
{`EETF_Comp_Mult = 1 + EETF_Comp_Sensitivity * max(0, EETF_account_avg - Base_EETF)
LTHF_Comp_Mult = 1 + LTHF_Comp_Sensitivity * max(0, LTHF_account - Base_LTHF)

Effective_Comp_Rate = Base_Comp_Rate * EETF_Comp_Mult * LTHF_Comp_Mult
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
                Effective Annual Compounding Rate: <span className="font-semibold text-blue-800 inline-block bg-blue-100 px-2 py-0.5 rounded text-base">{(hcrEffectiveRate * 100).toFixed(2)}</span>%
              </p>
              
              <VCCCharts 
                chartType="hcr" 
                currentValue1={hcrEETFAccount} 
                currentValue2={hcrLTHFAccount} 
                calculatedValue={hcrEffectiveRate} 
              />
              
              <p className="text-xs text-center text-gray-500 mt-1">Chart shows growth of 100 tokens over 10 years at the calculated rate.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">3. Aggressive Ethical Burn (AEB)</h3>
              <p className="text-gray-700 mb-2">Enhances token burning. The burn rate increases non-linearly (e.g., using a power law) as the network average EETF (`EETF_avg`) surpasses its target, creating stronger deflationary pressure at higher collective ethics.</p>
              
              <FormulaSyntax>
{`// Power Law Example:
Burn_Power_Multiplier = (1 + max(0, EETF_avg - EETF_target))^Power_Sensitivity
Burn_Amount = Funding_Source * Base_Burn_Rate * Burn_Power_Multiplier`}
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
                additionalInfo={`Relative Burn Amount: ${aebBurnAmount.toFixed(2)}x Base`}
              />
              
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
