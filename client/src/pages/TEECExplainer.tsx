import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FormulaSyntax from "@/components/FormulaSyntax";
import TEECFormulaVisual from "@/components/TEECFormulaVisual";
import TEECtoVCCDiagram from "@/components/TEECtoVCCDiagram";

export default function TEECExplainer() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="text-center py-8 px-4 md:py-12 lg:py-16 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">TauNet Ethical-Eco Compounder (TEEC)</h1>
        <p className="text-lg text-gray-600">Understanding the Formula and Mechanisms Behind TEEC</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-16">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="mb-4 text-gray-700">
              The TauNet Ethical-Eco Compounder (TEEC) is a reward system designed to incentivize ethical behavior, 
              ecosystem contributions, and long-term commitment in the TauNet ecosystem. It forms the foundation upon 
              which the Virtuous Cycle Compounder (VCC) builds to create powerful feedback loops.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">TEEC Formula Components</h2>
            
            <div className="mb-8">
              <TEECFormulaVisual />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">1. Base Reward (BR)</h3>
                <p className="text-gray-700 mb-2">
                  A fundamental reward multiplier set by the project. It's the starting point for all reward calculations.
                </p>
                <p className="text-gray-600 text-sm italic">Example: If the Base Reward is set to 2, it serves as the initial multiplier for calculations.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">2. Early and Large Purchase Factor (ELPF)</h3>
                <p className="text-gray-700 mb-2">
                  Rewards users based on how early and how much they purchase. Earlier and larger purchases receive a higher factor.
                </p>
                <p className="text-gray-600 text-sm italic">Example: A purchase of 1000 tokens on launch day might have an ELPF of 1.5, while 500 tokens a month later might have an ELPF of 1.2.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">3. Long-Term Holding Factor (LTHF)</h3>
                <p className="text-gray-700 mb-2">
                  Increases with the duration of token holding. Longer holding periods result in a higher factor, rewarding commitment.
                </p>
                <p className="text-gray-600 text-sm italic">Example: Holding tokens for over a year might give an LTHF of 2, whereas holding for 6 months might result in an LTHF of 1.5.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">4. Ecosystem and Ethical Transaction Factor (EETF)</h3>
                <p className="text-gray-700 mb-2">
                  Rewards transactions that benefit the ecosystem and align with ethical standards. Higher scores are assigned to more beneficial and ethical transactions.
                </p>
                <p className="text-gray-600 text-sm italic">Example: Participating in a community-driven, eco-friendly project might earn an EETF of 1.3, while a regular transaction might have an EETF of 1.0.</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">5. Compounding Reward Mechanism (CRM)</h3>
              <p className="text-gray-700 mb-2">
                Allows the reward to compound over time. The longer the period, the greater the compounding effect.
              </p>
              <p className="text-gray-600 text-sm italic mb-4">Example: With a CRM set at 5% compounding rate per year over 2 years, the compounding factor would be approximately 1.1025.</p>
              
              <FormulaSyntax>
{`Compounding Factor = (1 + Rate)^Time`}
              </FormulaSyntax>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Complete TEEC Formula</h3>
              <FormulaSyntax>
{`Total Reward = (BR × ELPF × LTHF × EETF) × (1 + Rate)^Time`}
              </FormulaSyntax>
              
              <div className="bg-blue-50 p-4 mt-4 rounded-md border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Example Calculation:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Base Reward (BR): 2</li>
                  <li>Early and Large Purchase Factor (ELPF): 1.5</li>
                  <li>Long-Term Holding Factor (LTHF): 2</li>
                  <li>Ecosystem and Ethical Transaction Factor (EETF): 1.3</li>
                  <li>Compounding Rate: 5% per year</li>
                  <li>Time Period: 2 years</li>
                </ul>
                <p className="mt-2 text-gray-700">
                  Total Reward = (2 × 1.5 × 2 × 1.3) × (1 + 0.05)^2 = 7.8 × 1.1025 ≈ 8.6
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">TEEC Wealth Amplification Mechanisms</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">1. Ethical Burn Mechanism (EBM)</h3>
                <p className="text-gray-700 mb-4">
                  A portion of network fees or rewards is used to purchase the native token from the market and permanently 
                  remove it from circulation (burn). The rate of this burn is tied to the network's average EETF score.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-semibold text-gray-800 mb-2">How EBM Amplifies Wealth:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Deflationary Pressure:</strong> High collective ethical behavior leads to faster supply reduction, potentially increasing token value.</li>
                    <li><strong>Synergy with TEEC:</strong> High-EETF actors earn more tokens via TEEC rewards, while EBM makes those tokens scarcer.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">2. EETF-Weighted Governance & Influence</h3>
                <p className="text-gray-700 mb-4">
                  A user's voting power within governance is weighted not just by token holdings, but significantly by 
                  their sustained EETF score and potentially LTHF.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-semibold text-gray-800 mb-2">How Governance Weighting Amplifies Wealth:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Steering Power:</strong> Ethical actors gain more influence over network development and resource allocation.</li>
                    <li><strong>Information Advantage:</strong> High-influence actors may gain earlier insights that can inform investment decisions.</li>
                    <li><strong>Status & Opportunity:</strong> Reputation from governance influence can unlock social and economic opportunities.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">3. Ethical Staking Multiplier (ESM)</h3>
                <p className="text-gray-700 mb-4">
                  If the network uses Proof-of-Stake or similar, staking rewards are multiplied based on the staker's individual EETF score.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-semibold text-gray-800 mb-2">How ESM Amplifies Wealth:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Increased Yield:</strong> Directly increases return rate for ethical actors who help secure the network.</li>
                    <li><strong>Compounding Synergy:</strong> Higher staking rewards provide more tokens, which can benefit from TEEC compounding and EBM-induced deflation.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">4. "Ethical Contribution Mining" Rewards</h3>
                <p className="text-gray-700 mb-4">
                  Significant token rewards for specific, verifiable, high-impact ethical or ecosystem contributions that go beyond routine transactions.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-semibold text-gray-800 mb-2">Examples of "Mineable" Contributions:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Implementing verifiable improvements to the network's ecological footprint</li>
                    <li>Contributing crucial open-source software that benefits the ecosystem</li>
                    <li>Resolving complex disputes through ethical processes</li>
                    <li>Improving the formal definitions of ethical/ecological standards</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">5. Dynamic Base Reward (DBR) Scaling</h3>
                <p className="text-gray-700 mb-4">
                  The Base Reward component within the core TEEC formula becomes dynamic, scaling upwards when the 
                  overall network's average EETF is high.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-semibold text-gray-800 mb-2">How DBR Amplifies Wealth:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Collective Incentive:</strong> Creates motivation to promote ethical behavior network-wide, as everyone's base reward increases.</li>
                    <li><strong>Amplified Gains:</strong> When network EETF is high, individuals with high personal EETF receive doubly amplified rewards.</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">From TEEC to VCC: The Evolution</h2>
            
            <p className="text-gray-700 mb-6">
              The Virtuous Cycle Compounder (VCC) builds on the TEEC foundation to create powerful synergistic effects 
              and feedback loops. It enhances several core components of TEEC, creating a system where ethical behavior 
              is amplified through multiple interconnected mechanisms.
            </p>
            
            <TEECtoVCCDiagram />
            
            <div className="space-y-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">TEEC → VCC Enhancements:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Dynamic Base Reward → Dynamic & Amplified Base Reward (DBR+):</strong> VCC extends the DBR concept with potential feedback that increases sensitivity at high network EETF levels.</li>
                  <li><strong>Compounding Reward Mechanism → Hyper-Compounding Rewards (HCR):</strong> VCC transforms simple compounding into an aggressively boosted compounding rate based on both individual EETF and LTHF.</li>
                  <li><strong>Ethical Burn Mechanism → Aggressive Ethical Burn (AEB):</strong> VCC enhances token burning with non-linear scaling as network EETF increases, creating stronger deflationary pressure.</li>
                </ul>
              </div>
              
              <p className="text-gray-700">
                The VCC takes these enhanced mechanisms and creates multiple reinforcing feedback loops:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-semibold text-gray-800 mb-2">Key Feedback Loops in the VCC:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Account-Level Feedback:</strong> High individual EETF → Faster token accumulation through HCR → Greater incentive to maintain high EETF</li>
                  <li><strong>Collective Feedback:</strong> High network EETF → Increased base rewards (DBR+) and token burning (AEB) → Greater token value → Stronger incentive for high EETF</li>
                  <li><strong>Cross-Mechanism Synergy:</strong> As account holders optimize for high EETF to maximize their own reward rate (HCR), they contribute to higher network EETF, which benefits everyone through DBR+ and AEB</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300 mb-8">
          <h3 className="font-semibold text-gray-700 mb-2">Implementation Note</h3>
          <p className="text-sm text-gray-500">
            In a Tau-based implementation of TEEC and VCC, the focus would be on describing 'what' these mechanisms should do rather 
            than 'how' they should do it, aligning with Tau's declarative programming paradigm. The approach would involve defining 
            formal specifications for behaviors like ethical standards, reward calculations, and governance weighting, which would 
            then be executable within Tau's logical AI environment.
          </p>
        </div>
      </main>

      <footer className="text-center mt-10 pt-5 border-t border-gray-300 max-w-7xl mx-auto px-4">
        <p className="text-sm text-gray-500 pb-6">TEEC & VCC Concept Explainer</p>
      </footer>
    </div>
  );
}