import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * A component that visualizes the TEEC formula with LaTeX-like formatting
 */
const TEECFormulaVisual: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mb-8">
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-4 text-center">TEEC Core Formula</h3>
        
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg font-mono text-lg">
            <div className="mb-2">
              <span className="text-blue-300">TEEC</span> = <span className="text-green-300">EETF</span> × <span className="text-amber-300">LTHF</span> × <span className="text-purple-300">NF</span>
            </div>
            <div className="text-sm text-gray-400">
              where:
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-green-300 font-semibold mb-1">EETF</div>
              <div className="text-sm">Ethical-Ecosystem Transaction Factor</div>
              <div className="mt-2 text-xs text-gray-400">Measures transaction's ethical impact</div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-amber-300 font-semibold mb-1">LTHF</div>
              <div className="text-sm">Long-Term Holding Factor</div>
              <div className="mt-2 text-xs text-gray-400">Rewards long-term participation</div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-purple-300 font-semibold mb-1">NF</div>
              <div className="text-sm">Network Factor</div>
              <div className="mt-2 text-xs text-gray-400">Collective network health metrics</div>
            </div>
          </div>
          
          <div className="bg-blue-900/30 p-4 rounded-lg w-full">
            <h4 className="font-semibold mb-2">Extended Formula</h4>
            <div className="font-mono text-sm md:text-base">
              <div className="mb-2">
                <span className="text-green-300">EETF</span> = <span className="text-gray-300">EthicalScore × EcosystemBenefit</span>
              </div>
              <div className="mb-2">
                <span className="text-amber-300">LTHF</span> = <span className="text-gray-300">HoldingTime<sup>α</sup> × ActivityConsistency</span>
              </div>
              <div>
                <span className="text-purple-300">NF</span> = <span className="text-gray-300">NetworkStability × AdoptionRate</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 italic">
            The TEEC formula creates a mathematical framework for rewarding ethical behavior,
            long-term participation, and contributions to network health.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TEECFormulaVisual;