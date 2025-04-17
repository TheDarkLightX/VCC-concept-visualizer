import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TEECFormulaVisual from '@/components/TEECFormulaVisual';
import MathFormula from '@/components/MathFormula';
import FormulaSyntax from '@/components/FormulaSyntax';

export default function TEECExplainer() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="text-center py-8 px-4 md:py-12 lg:py-16 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">TauNet Ethical-Eco Compounder</h1>
        <p className="text-lg text-gray-600">Understanding the Foundation of the VCC Concept</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-16">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Introduction to TEEC</h2>
            
            <p className="mb-4 text-gray-700">
              The TauNet Ethical-Eco Compounder (TEEC) is a fundamental economic model designed to reward ethical 
              participation in digital networks. It serves as the theoretical foundation for the more advanced 
              Virtuous Cycle Compounder (VCC) concept.
            </p>
            
            <p className="mb-6 text-gray-700">
              At its core, TEEC aims to solve a critical problem in digital economic systems: how to create 
              financial incentives that align with ethical behavior and ecosystem health, rather than encouraging 
              exploitation or short-term thinking.
            </p>
            
            <TEECFormulaVisual />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Key Principles</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Ethical Transactions:</strong> Prioritizing actions that benefit the collective ecosystem</li>
                  <li><strong>Long-Term Alignment:</strong> Rewarding patient capital and consistent participation</li>
                  <li><strong>Network Effects:</strong> Incorporating the health of the overall network into rewards</li>
                  <li><strong>Compounding Value:</strong> Creating exponential growth for ethical participants</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold mb-3 text-green-800">Practical Applications</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Token Economics:</strong> Design of tokenomics that encourage sustainable actions</li>
                  <li><strong>Community Governance:</strong> Fair distribution of voting power based on ethical participation</li>
                  <li><strong>Reward Mechanisms:</strong> Alternative to wasteful mining or staking mechanisms</li>
                  <li><strong>Value Appreciation:</strong> Sustainable token value growth through ethical actions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">Core Components of TEEC</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Ethical-Ecosystem Transaction Factor (EETF)</h3>
                <p className="mb-3 text-gray-700">
                  The EETF measures how much a transaction contributes positively to the network ecosystem
                  and aligns with collectively defined ethical standards.
                </p>
                <MathFormula caption="EETF Calculation">
{`EETF = EthicalScore × EcosystemBenefit

where:
- EthicalScore: Measures alignment with community-defined ethical standards (0-1)
- EcosystemBenefit: Quantifies how much the transaction strengthens the ecosystem (0-1)`}
                </MathFormula>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Long-Term Holding Factor (LTHF)</h3>
                <p className="mb-3 text-gray-700">
                  The LTHF rewards users who demonstrate long-term commitment to the network through
                  consistent participation and token holding.
                </p>
                <MathFormula caption="LTHF Calculation">
{`LTHF = HoldingTime^α × ActivityConsistency

where:
- HoldingTime: Duration tokens have been held (in time units)
- α: Exponent controlling the weight of holding time (typically 0.5-0.7)
- ActivityConsistency: Measure of regular participation in the network (0-1)`}
                </MathFormula>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Network Factor (NF)</h3>
                <p className="mb-3 text-gray-700">
                  The NF incorporates the overall health of the network into reward calculations, creating
                  a dynamic feedback loop between individual actions and collective outcomes.
                </p>
                <MathFormula caption="NF Calculation">
{`NF = NetworkStability × AdoptionRate

where:
- NetworkStability: Measure of the network's resilience and health (0-1)
- AdoptionRate: Growth rate of the network's user base`}
                </MathFormula>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-500 pb-2">How TEEC Evolved into VCC</h2>
            
            <p className="mb-6 text-gray-700">
              The Virtuous Cycle Compounder (VCC) builds upon TEEC by introducing more sophisticated mechanisms
              that create powerful positive feedback loops and exponential growth for ethical participants.
            </p>
            
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Evolution of Core Components</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">1</div>
                  <div className="ml-3">
                    <h4 className="font-semibold">EETF → Dynamic Base Reward (DBR)</h4>
                    <p className="text-gray-700">
                      TEEC's simple EETF scoring evolved into VCC's Dynamic Base Reward mechanism, which adjusts
                      base rewards for all participants based on network-wide ethical behavior.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">2</div>
                  <div className="ml-3">
                    <h4 className="font-semibold">LTHF → Hyper-Compounding Rewards (HCR)</h4>
                    <p className="text-gray-700">
                      TEEC's LTHF concept expanded into VCC's Hyper-Compounding Rewards, creating accelerated
                      compound growth rates for ethical long-term participants.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">3</div>
                  <div className="ml-3">
                    <h4 className="font-semibold">NF → Aggressive Ethical Burn (AEB)</h4>
                    <p className="text-gray-700">
                      TEEC's Network Factor was enhanced into VCC's Aggressive Ethical Burn mechanism, which
                      creates token scarcity in proportion to network-wide ethical behavior.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Key Enhancements in VCC</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Non-Linear Scaling:</strong> VCC introduces exponential and polynomial functions for more powerful feedback loops</li>
                <li><strong>Dynamic Parameters:</strong> Parameters in VCC self-adjust based on network conditions</li>
                <li><strong>Combined Effects:</strong> The three mechanisms in VCC interact to create mutually reinforcing virtuous cycles</li>
                <li><strong>Enhanced Security:</strong> VCC's mechanisms make attacks and manipulation expensive and self-defeating</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center mt-10 pt-5 border-t border-gray-300 max-w-7xl mx-auto px-4">
        <p className="text-sm text-gray-500 pb-6">TEEC Explainer</p>
      </footer>
    </div>
  );
}