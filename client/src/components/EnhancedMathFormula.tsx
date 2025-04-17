import React from 'react';
import TooltipFormula from './TooltipFormula';

interface EnhancedMathFormulaProps {
  formula: string;
  caption?: string;
  tooltips: {
    term: string;
    symbol: string;
    explanation: string;
  }[];
}

/**
 * An enhanced math formula component that provides tooltips for mathematical symbols
 */
const EnhancedMathFormula: React.FC<EnhancedMathFormulaProps> = ({ 
  formula, 
  caption, 
  tooltips 
}) => {
  // Function to replace terms with tooltip-wrapped versions
  const processFormulaWithTooltips = (text: string) => {
    // Split by lines to process each line separately
    const lines = text.split('\n');
    
    const processedLines = lines.map((line, lineIndex) => {
      // If the line is a comment, don't process tooltips
      if (line.trim().startsWith('//')) {
        return <div key={`line-${lineIndex}`} className="text-green-400 text-sm italic text-left">{line}</div>;
      }
      
      // Process normal lines with potential tooltips
      const parts: React.ReactNode[] = [];
      let currentIndex = 0;
      let currentText = '';

      // For each character, check if it starts any tooltip term
      for (let i = 0; i < line.length; i++) {
        let foundTooltip = false;
        
        // Check each tooltip to see if it matches at the current position
        for (const tooltip of tooltips) {
          if (i + tooltip.symbol.length <= line.length && 
              line.substring(i, i + tooltip.symbol.length) === tooltip.symbol) {
            
            // If we have accumulated text, add it before the tooltip
            if (currentText) {
              parts.push(<span key={`text-${currentIndex}`}>{currentText}</span>);
              currentText = '';
              currentIndex++;
            }
            
            // Add the tooltip
            parts.push(
              <TooltipFormula 
                key={`tooltip-${currentIndex}`} 
                term={tooltip.term} 
                explanation={tooltip.explanation}
              >
                {tooltip.symbol}
              </TooltipFormula>
            );
            
            // Skip ahead past the symbol
            i += tooltip.symbol.length - 1;
            currentIndex++;
            foundTooltip = true;
            break;
          }
        }
        
        // If no tooltip was found, add the character to current text
        if (!foundTooltip && i < line.length) {
          currentText += line[i];
        }
      }
      
      // Add any remaining text
      if (currentText) {
        parts.push(<span key={`text-${currentIndex}`}>{currentText}</span>);
      }
      
      return <div key={`line-${lineIndex}`} className="leading-relaxed">{parts}</div>;
    });
    
    return <>{processedLines}</>;
  };

  return (
    <div className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg overflow-x-auto">
        <pre className="font-mono text-lg text-blue-100 whitespace-pre-wrap text-center">
          {processFormulaWithTooltips(formula)}
        </pre>
      </div>
      {caption && (
        <div className="text-center text-sm text-gray-600 mt-2 italic">
          {caption}
        </div>
      )}
      <div className="text-center text-xs text-gray-500 mt-1">
        Hover over symbols for explanations
      </div>
    </div>
  );
};

export default EnhancedMathFormula;