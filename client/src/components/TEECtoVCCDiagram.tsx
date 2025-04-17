import React from 'react';

const TEECtoVCCDiagram: React.FC = () => {
  return (
    <div className="py-6">
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <h3 className="text-xl font-bold text-center mb-6">TEEC to VCC Evolution: The Feedback Loops</h3>
        
        {/* SVG Diagram showing the TEEC to VCC transformation and feedback loops */}
        <svg 
          viewBox="0 0 800 500" 
          className="w-full max-w-4xl mx-auto"
          style={{ minWidth: '700px' }}
        >
          {/* Background */}
          <rect x="0" y="0" width="800" height="500" fill="#f8fafc" rx="10" ry="10" />
          
          {/* TEEC Box on Left */}
          <rect x="50" y="100" width="250" height="300" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="10" ry="10" />
          <text x="175" y="130" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e40af">TEEC Components</text>
          
          {/* TEEC Elements */}
          <rect x="70" y="150" width="210" height="40" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" rx="5" ry="5" />
          <text x="175" y="175" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1e40af">Base Reward (BR)</text>
          
          <rect x="70" y="200" width="210" height="40" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" rx="5" ry="5" />
          <text x="175" y="225" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1e40af">Long-Term Holding Factor (LTHF)</text>
          
          <rect x="70" y="250" width="210" height="40" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" rx="5" ry="5" />
          <text x="175" y="275" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1e40af">Ethical-Eco Transaction Factor (EETF)</text>
          
          <rect x="70" y="300" width="210" height="40" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" rx="5" ry="5" />
          <text x="175" y="325" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1e40af">Compounding Reward Mechanism</text>
          
          {/* VCC Box on Right */}
          <rect x="500" y="100" width="250" height="300" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" rx="10" ry="10" />
          <text x="625" y="130" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#166534">VCC Enhancements</text>
          
          {/* VCC Elements */}
          <rect x="520" y="150" width="210" height="40" fill="#ffffff" stroke="#16a34a" strokeWidth="1" rx="5" ry="5" />
          <text x="625" y="175" textAnchor="middle" fontSize="14" fontWeight="500" fill="#166534">Dynamic Base Reward (DBR+)</text>
          
          <rect x="520" y="200" width="210" height="40" fill="#ffffff" stroke="#16a34a" strokeWidth="1" rx="5" ry="5" />
          <text x="625" y="225" textAnchor="middle" fontSize="14" fontWeight="500" fill="#166534">Hyper-Compounding Rewards (HCR)</text>
          
          <rect x="520" y="250" width="210" height="40" fill="#ffffff" stroke="#16a34a" strokeWidth="1" rx="5" ry="5" />
          <text x="625" y="275" textAnchor="middle" fontSize="14" fontWeight="500" fill="#166534">Aggressive Ethical Burn (AEB)</text>
          
          <rect x="520" y="300" width="210" height="40" fill="#ffffff" stroke="#16a34a" strokeWidth="1" rx="5" ry="5" />
          <text x="625" y="325" textAnchor="middle" fontSize="14" fontWeight="500" fill="#166534">Multi-Level Feedback Loops</text>
          
          {/* Transformation Arrow */}
          <path d="M 320 250 L 480 250" stroke="#6b7280" strokeWidth="2" fill="none" />
          <polygon points="470,240 490,250 470,260" fill="#6b7280" />
          <text x="400" y="235" textAnchor="middle" fontSize="14" fontWeight="500" fill="#6b7280">Evolution</text>
          
          {/* Feedback Loops */}
          {/* Individual EETF Loop */}
          <path d="M 730 220 C 760 220, 760 170, 730 170" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="5,3" />
          <polygon points="740,170 730,160 720,170" fill="#ef4444" />
          <text x="770" y="195" textAnchor="start" fontSize="12" fill="#ef4444">Individual</text>
          <text x="770" y="210" textAnchor="start" fontSize="12" fill="#ef4444">Feedback</text>
          
          {/* Network EETF Loop */}
          <path d="M 730 270 C 780 270, 780 170, 625 170 C 470 170, 470 270, 520 270" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="5,3" />
          <polygon points="530,280 520,270 530,260" fill="#8b5cf6" />
          <text x="400" y="150" textAnchor="middle" fontSize="12" fill="#8b5cf6">Network-Wide Feedback</text>
          
          {/* Cross-Mechanism Synergy */}
          <path d="M 625 350 C 625 380, 400 380, 400 250" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <polygon points="410,260 400,250 390,260" fill="#0ea5e9" />
          <text x="400" y="400" textAnchor="middle" fontSize="12" fill="#0ea5e9">Cross-Mechanism Synergy</text>
          
          {/* Title */}
          <text x="400" y="50" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1f2937">From TEEC to Virtuous Cycle Compounder</text>
          <text x="400" y="75" textAnchor="middle" fontSize="14" fill="#4b5563">A visualization of mechanism enhancement and feedback loop creation</text>
        </svg>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="p-3 bg-red-50 rounded border border-red-200">
            <h4 className="font-semibold text-red-700">Individual Feedback</h4>
            <p className="text-gray-700">High personal EETF increases reward rate (HCR), creating stronger incentive to maintain ethical behavior.</p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded border border-purple-200">
            <h4 className="font-semibold text-purple-700">Network-Wide Feedback</h4>
            <p className="text-gray-700">High collective EETF improves base rewards (DBR+) and increases token burning (AEB), benefiting all participants.</p>
          </div>
          
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <h4 className="font-semibold text-blue-700">Cross-Mechanism Synergy</h4>
            <p className="text-gray-700">Individual optimization for personal rewards contributes to network-wide benefits, creating a virtuous cycle.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TEECtoVCCDiagram;