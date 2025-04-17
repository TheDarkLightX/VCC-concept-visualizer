import React from 'react';

interface VCCLogoProps {
  size?: number;
  className?: string;
}

const VCCLogo: React.FC<VCCLogoProps> = ({ size = 120, className = "" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 240 240" 
        width={size} 
        height={size}
        className="rounded-lg"
      >
        {/* Background */}
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a365d" />
            <stop offset="100%" stopColor="#164e63" />
          </linearGradient>
          <linearGradient id="loop-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="loop-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="loop-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Main background */}
        <rect x="0" y="0" width="240" height="240" fill="url(#bg-gradient)" rx="20" ry="20" />
        
        {/* Central circle */}
        <circle cx="120" cy="120" r="25" fill="#f8fafc" opacity="0.9" />
        
        {/* Virtuous cycle loops */}
        {/* First loop (DBR) */}
        <path 
          d="M 120 95 C 60 95, 60 170, 120 170" 
          stroke="url(#loop-gradient-1)" 
          strokeWidth="10" 
          fill="none" 
          strokeLinecap="round"
          filter="url(#glow)"
          opacity="0.9"
        />
        
        {/* Second loop (HCR) */}
        <path 
          d="M 120 95 C 180 95, 180 170, 120 170" 
          stroke="url(#loop-gradient-2)" 
          strokeWidth="10" 
          fill="none" 
          strokeLinecap="round"
          filter="url(#glow)"
          opacity="0.9"
        />
        
        {/* Third loop (AEB) */}
        <path 
          d="M 120 70 C 40 70, 40 195, 120 195 C 200 195, 200 70, 120 70" 
          stroke="url(#loop-gradient-3)" 
          strokeWidth="6" 
          fill="none" 
          strokeLinecap="round"
          filter="url(#glow)"
          opacity="0.7"
        />
        
        {/* Text */}
        <text x="120" y="124" fontFamily="Arial" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">VCC</text>
        
        {/* Small icons representing the three mechanisms */}
        {/* DBR Icon */}
        <circle cx="85" cy="125" r="12" fill="#4ade80" opacity="0.9" />
        <text x="85" y="130" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">DBR</text>
        
        {/* HCR Icon */}
        <circle cx="155" cy="125" r="12" fill="#60a5fa" opacity="0.9" />
        <text x="155" y="130" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">HCR</text>
        
        {/* AEB Icon */}
        <circle cx="120" cy="165" r="12" fill="#f43f5e" opacity="0.9" />
        <text x="120" y="170" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">AEB</text>
      </svg>
    </div>
  );
};

export default VCCLogo;