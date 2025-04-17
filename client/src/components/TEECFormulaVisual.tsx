import React, { useEffect, useRef } from 'react';

/**
 * A component that visualizes the TEEC formula with LaTeX-like formatting
 */
const TEECFormulaVisual: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">TEEC Total Reward Formula</h3>
        
        <div className="py-4 flex justify-center">
          {/* Main formula rendered in a LaTeX-like style */}
          <div className="text-2xl md:text-3xl font-serif">
            <span className="font-semibold">Total Reward = </span>
            <span className="inline-flex items-center">
              <span className="inline-block mx-1">(</span>
              <span className="inline-flex flex-col items-center mx-1">
                <span className="text-blue-800 font-bold">BR</span>
                <span className="text-xs text-gray-600">Base Reward</span>
              </span>
              <span className="inline-block mx-1">×</span>
              <span className="inline-flex flex-col items-center mx-1">
                <span className="text-green-700 font-bold">ELPF</span>
                <span className="text-xs text-gray-600">Early & Large Purchase</span>
              </span>
              <span className="inline-block mx-1">×</span>
              <span className="inline-flex flex-col items-center mx-1">
                <span className="text-purple-700 font-bold">LTHF</span>
                <span className="text-xs text-gray-600">Long-Term Holding</span>
              </span>
              <span className="inline-block mx-1">×</span>
              <span className="inline-flex flex-col items-center mx-1">
                <span className="text-red-700 font-bold">EETF</span>
                <span className="text-xs text-gray-600">Ethical & Ecosystem</span>
              </span>
              <span className="inline-block mx-1">)</span>
            </span>
            <span className="inline-block mx-2">×</span>
            <span className="inline-flex items-center">
              <span className="inline-block mx-1">(</span>
              <span className="inline-flex flex-col items-center mx-1">
                <span className="text-amber-700 font-bold">(1 + Rate)<sup>Time</sup></span>
                <span className="text-xs text-gray-600">Compounding</span>
              </span>
              <span className="inline-block mx-1">)</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          {/* Base Reward */}
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
            <div className="text-xl text-blue-800 font-bold mb-1">BR</div>
            <div className="text-sm text-gray-700">Base Reward set by project</div>
          </div>
          
          {/* ELPF */}
          <div className="bg-green-50 p-3 rounded-md border border-green-200">
            <div className="text-xl text-green-700 font-bold mb-1">ELPF</div>
            <div className="text-sm text-gray-700">Rewards early and large purchases</div>
          </div>
          
          {/* LTHF */}
          <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
            <div className="text-xl text-purple-700 font-bold mb-1">LTHF</div>
            <div className="text-sm text-gray-700">Increases with holding duration</div>
          </div>
          
          {/* EETF */}
          <div className="bg-red-50 p-3 rounded-md border border-red-200">
            <div className="text-xl text-red-700 font-bold mb-1">EETF</div>
            <div className="text-sm text-gray-700">Higher for ethical transactions</div>
          </div>
          
          {/* CRM */}
          <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
            <div className="text-xl text-amber-700 font-bold mb-1">CRM</div>
            <div className="text-sm text-gray-700">Compounding reward over time</div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            The TEEC formula creates a multiplicative effect where ethical behavior (EETF), 
            long-term commitment (LTHF), early support (ELPF), and time (CRM) combine to 
            significantly amplify rewards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TEECFormulaVisual;