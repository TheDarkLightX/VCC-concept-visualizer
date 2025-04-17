import React from 'react';

interface EnhancedFormulaSyntaxProps {
  formulas: {
    formula: string;
    description?: string;
  }[];
  title?: string;
}

const EnhancedFormulaSyntax: React.FC<EnhancedFormulaSyntaxProps> = ({ 
  formulas, 
  title 
}) => {
  // Function to process formula text for prettier display
  const processFormula = (text: string): string => {
    // Replace multiplication symbol with proper multiplication sign
    let processed = text.replace(/\*/g, ' × ');
    
    // Replace subscripts like _avg with proper styling
    processed = processed.replace(/\_([a-zA-Z0-9]+)/g, 'ᵢₙₛₜᵣᵤₘₑₙₜᵣₐₙᵏᵢₙᵍ');
    processed = processed.replace(/ᵢₙₛₜᵣᵤₘₑₙₜᵣₐₙᵏᵢₙᵍ/g, '');
    
    processed = processed.replace(/\_avg/g, 'ₐᵥₐ');
    processed = processed.replace(/\_target/g, 'ₜₐᵣₐₑₜ');
    processed = processed.replace(/\_Sensitivity/g, 'ₛₑₙₛᵢₜᵢᵥᵢₜᵧ');
    processed = processed.replace(/\_Factor/g, 'fₐcₜₒᵣ');
    processed = processed.replace(/\_Multiplier/g, 'ₘᵤₗₜᵢₚₗᵢₑᵣ');
    processed = processed.replace(/\_Feedback/g, 'fₑₑdₐcₖ');
    processed = processed.replace(/\_BR/g, 'ₑᵣ');
    
    return processed;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 my-6 rounded-lg shadow-lg">
      {title && (
        <h3 className="text-xl font-bold text-gray-100 mb-4 pb-2 border-b border-gray-700">
          {title}
        </h3>
      )}
      
      <div className="space-y-4">
        {formulas.map((item, index) => (
          <div key={index} className="text-center">
            <div className="bg-gray-800 p-4 rounded-md font-mono text-lg md:text-xl text-blue-100 overflow-x-auto mb-2">
              {item.formula.split('\n').map((line, lineIndex) => (
                <div 
                  key={lineIndex} 
                  className={`flex ${line.startsWith('//') ? 'text-green-400 text-sm italic justify-start' : 'justify-center'}`}
                >
                  {line.startsWith('//') ? line : processFormula(line)}
                </div>
              ))}
            </div>
            {item.description && (
              <p className="text-sm text-gray-400 italic">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedFormulaSyntax;