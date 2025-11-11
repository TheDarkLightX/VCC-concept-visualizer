import { Card, CardContent } from "@/components/ui/card";
import EnhancedMathFormula from "@/components/EnhancedMathFormula";

export default function FormulasPage() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="text-center py-8 px-4 md:py-12 lg:py-16 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">VCC Mathematical Formulas</h1>
        <p className="text-lg text-gray-600">Detailed Mathematical Representations of the Virtuous Cycle Compounder</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-16">
        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="mb-4 text-gray-700">
              The Virtuous Cycle Compounder (VCC) is built on three key mathematical mechanisms that work together 
              to create powerful incentives for ethical behavior. Each mechanism is carefully designed with 
              precise mathematical formulations to ensure optimal balance and effectiveness.
            </p>
          </CardContent>
        </Card>

        {/* DBR Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Dynamic Base Reward (DBR)</h2>
            
              <p className="mb-4 text-gray-700">
                The Dynamic Base Reward mechanism uses a smoothed network signal and a discrete PI controller in log-space. It raises rewards when ethics lag the target and cools them when the network overshoots, while clamps, hysteresis, and anti-windup maintain stability.
              </p>

              <EnhancedMathFormula 
                formula={`α = ln(2) / Half_Life
EETF_EMA_t = (1 - α) * EETF_EMA_{t-1} + α * EETF_avg_t

e_t = EETF_target - EETF_EMA_t
u_t = u_{t-1} + k_p (e_t - e_{t-1}) + k_i e_t
// Anti-windup: scale k_i when Clamp(exp(u_t)) hits bounds
DBR_multiplier_t = Clamp(exp(u_t), Min_BR_Factor, Max_BR_Factor)
Current_BR = Base_BR * DBR_multiplier_t`}
                caption="Dynamic Base Reward PI Controller"
              tooltips={[
                  { term: "Half-Life", symbol: "Half_Life", explanation: "Number of epochs for the exponential moving average to respond halfway to a step change." },
                  { term: "α (alpha)", symbol: "α", explanation: "The smoothing coefficient derived from the EMA half-life (α = ln(2)/Half_Life)." },
                  { term: "EETF_EMA", symbol: "EETF_EMA_t", explanation: "Smoothed network ethical signal that filters out short-term noise." },
                  { term: "Error", symbol: "e_t", explanation: "Difference between the target EETF and the smoothed network EETF." },
                  { term: "Proportional Gain", symbol: "k_p", explanation: "Controls how strongly the controller reacts to changes in error." },
                  { term: "Integral Gain", symbol: "k_i", explanation: "Ensures persistent deviations accumulate pressure to restore the target." },
                  { term: "Anti-Windup", symbol: "Anti-windup", explanation: "Scales the integral action when the multiplier hits min/max clamps to prevent runaway integration." },
                  { term: "Clamp Function", symbol: "Clamp", explanation: "Keeps the multiplier between Min_BR_Factor and Max_BR_Factor." },
                  { term: "Minimum BR Factor", symbol: "Min_BR_Factor", explanation: "Lower bound on the base reward multiplier." },
                  { term: "Maximum BR Factor", symbol: "Max_BR_Factor", explanation: "Upper bound on the base reward multiplier." },
                  { term: "Current Base Reward", symbol: "Current_BR", explanation: "Final base reward after applying the PI-controlled multiplier." },
                  { term: "Base Base Reward", symbol: "Base_BR", explanation: "Baseline reward amount before control adjustments." }
              ]}
            />

            <div className="space-y-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Key Variables:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><strong>EETF_avg</strong>: Network-wide average Ethical-Ecosystem Transaction Factor</li>
                  <li><strong>EETF_target</strong>: Target EETF level where base multiplier equals 1</li>
                    <li><strong>Half_Life</strong>: Controls how quickly the EMA responds to changes in network ethics</li>
                    <li><strong>k_p / k_i</strong>: PI gains that set responsiveness and persistence</li>
                    <li><strong>Deadband &amp; Anti-windup</strong>: Safeguards that prevent oscillation and integral windup</li>
                    <li><strong>Min/Max_BR_Factor</strong>: Bounds for the multiplier to ensure system stability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HCR Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Hyper-Compounding Rewards (HCR)</h2>
            
              <p className="mb-4 text-gray-700">
                Hyper-Compounding Rewards apply a bounded Cobb–Douglas weighting to account ethics and long-term holding. The rate is strictly monotone in each signal, shows diminishing returns, and remains inside policy bounds.
              </p>

              <EnhancedMathFormula 
                formula={`Effective_Compounding_Rate = Clamp(
Base_Comp_Rate *
(EETF_account / Base_EETF)^α *
(LTHF_account / Base_LTHF)^β,
Rate_min,
Rate_max)

Future_Value = Present_Value * (1 + Effective_Compounding_Rate)^Time`}
                caption="Hyper-Compounding Rewards Cobb–Douglas Form"
              tooltips={[
                  { term: "Base Compounding Rate", symbol: "Base_Comp_Rate", explanation: "Baseline annual compounding before ethics or holding adjustments." },
                  { term: "Account EETF", symbol: "EETF_account", explanation: "Smoothed ethical performance for the account." },
                  { term: "Baseline EETF", symbol: "Base_EETF", explanation: "Reference EETF at which the multiplier equals one." },
                  { term: "Account LTHF", symbol: "LTHF_account", explanation: "Long-term holding factor for the account." },
                  { term: "Baseline LTHF", symbol: "Base_LTHF", explanation: "Reference holding factor used to normalise the ratio." },
                  { term: "α, β", symbol: "α, β", explanation: "Elasticities controlling diminishing returns for EETF and LTHF (typically α + β ≤ 1)." },
                  { term: "Clamp Function", symbol: "Clamp", explanation: "Enforces minimum and maximum compounding rates." },
                  { term: "Minimum Rate", symbol: "Rate_min", explanation: "Lower bound on the effective compounding rate." },
                  { term: "Maximum Rate", symbol: "Rate_max", explanation: "Upper bound on the effective compounding rate." },
                  { term: "Future Value", symbol: "Future_Value", explanation: "Projected holdings after compounding at the effective rate." },
                  { term: "Present Value", symbol: "Present_Value", explanation: "Current holdings prior to compounding." },
                  { term: "Time Period", symbol: "Time", explanation: "Duration of compounding, typically measured in years or epochs." }
              ]}
            />

            <div className="space-y-4 mt-6">
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Variables:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>EETF_account</strong>: Individual account's Ethical-Ecosystem Transaction Factor</li>
                    <li><strong>LTHF_account</strong>: Individual account's Long-Term Holding Factor</li>
                    <li><strong>α / β</strong>: Elasticities governing how strongly each signal influences the rate</li>
                    <li><strong>Base_EETF &amp; Base_LTHF</strong>: Reference points for normalising the signals</li>
                    <li><strong>Rate_min / Rate_max</strong>: Bounds ensuring compounding stays within policy targets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AEB Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Aggressive Ethical Burn (AEB)</h2>
            
              <p className="mb-4 text-gray-700">
                Aggressive Ethical Burn ties network burns to a supply target. It retires the surplus needed to stay on the desired inflation path and adds a logistic tilt so high-ethics epochs burn slightly more without risking runaway deflation.
              </p>

              <EnhancedMathFormula 
                formula={`Issuance_t = Base_Issuance * Activity_t * DBR_multiplier_t
Budget_Burn_t = max(0, Issuance_t - π* * Supply_t)
σ(z) = 1 / (1 + e^{-z})
Modulation_t = 1 + γ * (σ((EETF_EMA_t - 1)/s) - 0.5)
Burn_t = Clamp(Modulation_t * Budget_Burn_t, Burn_min, Burn_max)
Supply_{t+1} = Supply_t + Issuance_t - Burn_t`}
                caption="Aggressive Ethical Burn Supply Controller"
                tooltips={[
                  { term: "Base Issuance", symbol: "Base_Issuance", explanation: "Baseline tokens emitted per epoch before dynamic adjustments." },
                  { term: "Activity Level", symbol: "Activity_t", explanation: "Normalised activity scalar that expands or contracts issuance." },
                  { term: "DBR Multiplier", symbol: "DBR_multiplier_t", explanation: "Output of the PI-controlled base reward mechanism." },
                  { term: "Target Inflation", symbol: "π*", explanation: "Desired inflation rate that defines the issuance budget." },
                  { term: "Supply", symbol: "Supply_t", explanation: "Current circulating supply used to compute the inflation budget." },
                  { term: "Budget Burn", symbol: "Budget_Burn_t", explanation: "Minimum burn required to keep net issuance on target." },
                  { term: "Logistic Function", symbol: "σ(z)", explanation: "Smooth non-linearity that tilts burns up or down based on ethical performance." },
                  { term: "Gamma", symbol: "γ", explanation: "Strength of the pro-social tilt applied via the logistic." },
                  { term: "Scale", symbol: "s", explanation: "Controls how quickly modulation responds to deviations from the target." },
                  { term: "Burn Bounds", symbol: "Burn_min / Burn_max", explanation: "Safeguards that limit how much supply can be removed in one epoch." },
                  { term: "Supply Update", symbol: "Supply_{t+1}", explanation: "Resulting supply after subtracting burns from issuance." }
                ]}
              />

              <div className="space-y-4 mt-6">
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Key Variables:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>Base_Issuance</strong>: Nominal issuance before dynamic adjustments</li>
                    <li><strong>π*</strong>: Target inflation rate (per epoch) for the supply path</li>
                    <li><strong>EETF_EMA_t</strong>: Smoothed network ethics signal shared with DBR</li>
                    <li><strong>γ &amp; s</strong>: Logistic modulation parameters controlling pro-social tilt</li>
                    <li><strong>Burn_min / Burn_max</strong>: Bounds that cap supply removal each epoch</li>
                  </ul>
                </div>
              </div>
          </CardContent>
        </Card>

        {/* Combined Effects */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Synergistic Formula Interactions</h2>
            
              <p className="mb-4 text-gray-700">
                The three mechanisms form complementary loops: DBR lifts rewards when ethics underperform, AEB burns surplus supply when ethics run hot, and HCR rewards individual excellence. Together they keep the network near its ethical and monetary targets while preserving strong positive incentives.
              </p>

            <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Combined Feedback Loop:</h4>
              <EnhancedMathFormula 
                formula={`// Network loop (corrective)
↓ Network_EETF → ↑ DBR_multiplier → ↑ Incentive → ↑ Network_EETF
↑ Network_EETF → ↑ Burn_t → ↓ Net_Issuance → ↑ Token_Value → Align Incentives

// Individual loop
↑ Individual_EETF → ↑ HCR_rate → ↑ Personal_Rewards → ↑ Individual_EETF

// Cross-mechanism synergy
↑ Individual_EETF (many accounts) → EETF_EMA_t rises → DBR & AEB react system-wide`}
                caption="Synergistic Interaction of VCC Components"
                tooltips={[
                  { term: "Network EETF", symbol: "Network_EETF", explanation: "The smoothed ethical signal used by DBR and AEB." },
                  { term: "DBR Multiplier", symbol: "DBR_multiplier", explanation: "PI-controlled multiplier that corrects low ethics by raising rewards." },
                  { term: "Burn_t", symbol: "Burn_t", explanation: "Budget-aware burn that reduces supply when ethics are above target." },
                  { term: "Net Issuance", symbol: "Net_Issuance", explanation: "Issuance minus burn, driven toward the target inflation path." },
                  { term: "Token Value", symbol: "Token_Value", explanation: "Market value influenced by supply discipline and ethical performance." },
                  { term: "Hyper-Compounding", symbol: "HCR_rate", explanation: "Individual compounding rate shaped by account-level ethics and commitment." },
                  { term: "Incentive Alignment", symbol: "Incentive", explanation: "Combined effect of higher rewards and stronger token value on behaviour." }
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center mt-10 pt-5 border-t border-gray-300 max-w-7xl mx-auto px-4">
        <p className="text-sm text-gray-500 pb-6">VCC Mathematical Formulas</p>
      </footer>
    </div>
  );
}