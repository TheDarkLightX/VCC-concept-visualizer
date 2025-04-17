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
    let result = text;
    
    // Sort tooltips by length of symbol (descending) to prevent shorter symbols 
    // from matching parts of longer ones
    const sortedTooltips = [...tooltips].sort((a, b) => 
      b.symbol.length - a.symbol.length
    );
    
    for (const tooltipItem of sortedTooltips) {
      const regex = new RegExp(tooltipItem.symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      
      result = result.replace(regex, match => {
        return `<tooltip data-term="${tooltipItem.term}" data-explanation="${tooltipItem.explanation}">${match}</tooltip>`;
      });
    }
    
    // Split by lines to process each line separately
    const lines = result.split('\n');
    const processedLines = lines.map(line => {
      // If the line is a comment, don't process tooltips
      if (line.trim().startsWith('//')) {
        return <div key={line} className="text-green-400 text-sm italic text-left">{line}</div>;
      }
      
      // Extract tooltip parts and convert to components
      const parts: React.ReactNode[] = [];
      let remainingText = line;
      let tooltipRegex = /<tooltip data-term="([^"]*)" data-explanation="([^"]*)">([^<]*)<\/tooltip>/;
      let match;
      let lastIndex = 0;
      
      while ((match = tooltipRegex.exec(remainingText)) !== null) {
        const [fullMatch, term, explanation, symbol] = match;
        const index = remainingText.indexOf(fullMatch);
        
        // Add text before the tooltip
        if (index > 0) {
          parts.push(remainingText.substring(0, index));
        }
        
        // Add the tooltip
        parts.push(
          <TooltipFormula key={`${term}-${lastIndex}`} term={term} explanation={explanation}>
            {symbol}
          </TooltipFormula>
        );
        
        // Update the remaining text
        remainingText = remainingText.substring(index + fullMatch.length);
        lastIndex++;
      }
      
      // Add any remaining text
      if (remainingText) {
        parts.push(remainingText);
      }
      
      return <div key={line} className="leading-relaxed">{parts}</div>;
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