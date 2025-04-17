import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import EnhancedFormulaSyntax from '@/components/EnhancedFormulaSyntax';
import MathFormula from '@/components/MathFormula';

export default function FormulasPage() {
  const dbrFormulas = [
    {
      formula: 'BR_Multiplier = 1 + DBR_Sensitivity * (EETF_avg - EETF_target)',
      description: 'Base multiplier calculation using network average EETF'
    },
    {
      formula: 'Clamped_Multiplier = Clamp(BR_Multiplier, Min_BR_Factor, Max_BR_Factor)',
      description: 'Ensuring the multiplier stays within acceptable bounds'
    },
    {
      formula: '// Optional Enhancement:\nEnhanced_Sensitivity = DBR_Sensitivity * (1 + Network_Feedback_Factor * max(0, EETF_avg - EETF_target))',
      description: 'Advanced sensitivity calculation that increases as network EETF exceeds target'
    },
    {
      formula: 'Enhanced_BR_Multiplier = 1 + Enhanced_Sensitivity * (EETF_avg - EETF_target)',
      description: 'Improved multiplier calculation with non-linear sensitivity scaling'
    },
    {
      formula: 'Enhanced_Clamped_Multiplier = Clamp(Enhanced_BR_Multiplier, Min_BR_Factor, Max_BR_Factor)',
      description: 'Ensuring the enhanced multiplier stays within acceptable bounds'
    },
    {
      formula: 'Current_BR = Base_BR * Enhanced_Clamped_Multiplier',
      description: 'Final Dynamic Base Reward calculation'
    }
  ];

  const hcrFormulas = [
    {
      formula: 'Base_Compounding_Rate = 0.05 // 5% annual standard rate',
      description: 'Starting point for compounding calculations'
    },
    {
      formula: 'EETF_Bonus = max(0, (EETF_Account - EETF_Min)) * EETF_Amplifier',
      description: 'Bonus rate based on account\'s ethical behavior'
    },
    {
      formula: 'LTHF_Bonus = LTHF_Account * LTHF_Multiplier',
      description: 'Bonus rate based on long-term holding behavior'
    },
    {
      formula: 'Effective_Compounding_Rate = Base_Compounding_Rate + EETF_Bonus + LTHF_Bonus',
      description: 'Combined hyper-compounding rate'
    },
    {
      formula: 'Clamped_Rate = Clamp(Effective_Compounding_Rate, Min_Rate, Max_Rate)',
      description: 'Ensuring the compounding rate stays within reasonable bounds'
    },
    {
      formula: 'Future_Value = Present_Value * (1 + Clamped_Rate)^Time',
      description: 'Final calculation of future value with hyper-compounding'
    }
  ];

  const aebFormulas = [
    {
      formula: 'Burn_Multiplier = 1 + AEB_Sensitivity * max(0, (EETF_avg - EETF_threshold))',
      description: 'Base burn multiplier calculation'
    },
    {
      formula: '// Non-linear enhancement:\nEnhanced_Burn_Multiplier = 1 + AEB_Sensitivity * max(0, (EETF_avg - EETF_threshold))^AEB_Exponent',
      description: 'Advanced burn multiplier with exponential scaling for network EETF'
    },
    {
      formula: 'Base_Burn_Amount = Network_Revenue * Base_Burn_Percentage',
      description: 'Standard burn amount from network revenue'
    },
    {
      formula: 'Actual_Burn_Amount = Base_Burn_Amount * Enhanced_Burn_Multiplier',
      description: 'Final enhanced burn amount based on network\'s ethical behavior'
    },
    {
      formula: 'Clamped_Burn_Amount = Clamp(Actual_Burn_Amount, Min_Burn, Max_Burn)',
      description: 'Ensuring the burn amount stays within acceptable bounds'
    }
  ];

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
              The Dynamic Base Reward mechanism adjusts the base reward multiplier according to the network's 
              average Ethical-Ecosystem Transaction Factor (EETF). Higher network-wide ethical behavior leads 
              to greater rewards for all participants.
            </p>

            <MathFormula caption="Dynamic Base Reward Complete Formula Set">
{`// Base calculation
BR_Multiplier = 1 + DBR_Sensitivity * (EETF_avg - EETF_target)

// Bounds enforcement
Clamped_Multiplier = Clamp(BR_Multiplier, Min_BR_Factor, Max_BR_Factor)

// Advanced enhancement with non-linear feedback
Enhanced_Sensitivity = DBR_Sensitivity * (1 + Network_Feedback_Factor * max(0, EETF_avg - EETF_target))
Enhanced_BR_Multiplier = 1 + Enhanced_Sensitivity * (EETF_avg - EETF_target)
Enhanced_Clamped_Multiplier = Clamp(Enhanced_BR_Multiplier, Min_BR_Factor, Max_BR_Factor)

// Final calculation
Current_BR = Base_BR * Enhanced_Clamped_Multiplier`}
            </MathFormula>

            <div className="space-y-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Key Variables:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><strong>EETF_avg</strong>: Network-wide average Ethical-Ecosystem Transaction Factor</li>
                  <li><strong>EETF_target</strong>: Target EETF level where base multiplier equals 1</li>
                  <li><strong>DBR_Sensitivity</strong>: How strongly the reward responds to EETF changes</li>
                  <li><strong>Network_Feedback_Factor</strong>: Controls non-linear feedback strength</li>
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
              The Hyper-Compounding Rewards mechanism accelerates the compounding rate based on individual 
              account metrics. Unlike standard compounding, HCR creates a personalized compounding rate 
              that increases with ethical behavior and long-term holding.
            </p>

            <MathFormula caption="Hyper-Compounding Rewards Complete Formula Set">
{`// Base rate
Base_Compounding_Rate = 0.05  // 5% annual standard rate

// Individual behavior bonuses
EETF_Bonus = max(0, (EETF_Account - EETF_Min)) * EETF_Amplifier
LTHF_Bonus = LTHF_Account * LTHF_Multiplier

// Combined hyper-compounding rate
Effective_Compounding_Rate = Base_Compounding_Rate + EETF_Bonus + LTHF_Bonus
Clamped_Rate = Clamp(Effective_Compounding_Rate, Min_Rate, Max_Rate)

// Future value calculation
Future_Value = Present_Value * (1 + Clamped_Rate)^Time`}
            </MathFormula>

            <div className="space-y-4 mt-6">
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Variables:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><strong>EETF_Account</strong>: Individual account's Ethical-Ecosystem Transaction Factor</li>
                  <li><strong>EETF_Min</strong>: Minimum EETF required to begin receiving bonus</li>
                  <li><strong>EETF_Amplifier</strong>: Controls how strongly EETF affects compounding rate</li>
                  <li><strong>LTHF_Account</strong>: Individual account's Long-Term Holding Factor</li>
                  <li><strong>LTHF_Multiplier</strong>: Controls how strongly LTHF affects compounding rate</li>
                  <li><strong>Min/Max_Rate</strong>: Bounds for compounding rate to ensure system stability</li>
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
              The Aggressive Ethical Burn mechanism adjusts token burning based on network-wide ethical behavior. 
              As collective EETF rises, the burn rate increases non-linearly, creating stronger deflationary 
              pressure in response to ethical network participation.
            </p>

            <MathFormula caption="Aggressive Ethical Burn Complete Formula Set">
{`// Base burn multiplier
Burn_Multiplier = 1 + AEB_Sensitivity * max(0, (EETF_avg - EETF_threshold))

// Non-linear enhancement
Enhanced_Burn_Multiplier = 1 + AEB_Sensitivity * max(0, (EETF_avg - EETF_threshold))^AEB_Exponent

// Burn amount calculations
Base_Burn_Amount = Network_Revenue * Base_Burn_Percentage
Actual_Burn_Amount = Base_Burn_Amount * Enhanced_Burn_Multiplier
Clamped_Burn_Amount = Clamp(Actual_Burn_Amount, Min_Burn, Max_Burn)`}
            </MathFormula>

            <div className="space-y-4 mt-6">
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Key Variables:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><strong>EETF_avg</strong>: Network-wide average Ethical-Ecosystem Transaction Factor</li>
                  <li><strong>EETF_threshold</strong>: Minimum EETF level required to increase burn rate</li>
                  <li><strong>AEB_Sensitivity</strong>: Controls how strongly burn responds to EETF changes</li>
                  <li><strong>AEB_Exponent</strong>: Power for non-linear scaling (typically greater than 1)</li>
                  <li><strong>Network_Revenue</strong>: Total revenue available for burning</li>
                  <li><strong>Base_Burn_Percentage</strong>: Default percentage of revenue allocated to burns</li>
                  <li><strong>Min/Max_Burn</strong>: Bounds for burn amount to ensure system stability</li>
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
              The true power of the Virtuous Cycle Compounder emerges when these formulas interact. 
              High network EETF increases both the DBR and AEB mechanisms, while individual high EETF 
              enhances HCR. This creates multiple reinforcing feedback loops that amplify the value of 
              ethical participation.
            </p>

            <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Combined Feedback Loop:</h4>
              <MathFormula>
{`// As Network EETF increases:
↑ Network_EETF → ↑ DBR & ↑ AEB → ↑ Token_Value → ↑ Incentive → ↑ Network_EETF

// As Individual EETF increases:
↑ Individual_EETF → ↑ HCR → ↑ Personal_Rewards → ↑ Incentive → ↑ Individual_EETF

// Cross-mechanism synergy:
↑ Individual_EETF (many accounts) → ↑ Network_EETF → Benefits All`}
              </MathFormula>
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