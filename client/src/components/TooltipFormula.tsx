import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipFormulaProps {
  term: string;
  explanation: string;
  children: React.ReactNode;
}

/**
 * A component that wraps mathematical terms with tooltips explaining their meaning
 */
const TooltipFormula: React.FC<TooltipFormulaProps> = ({ 
  term, 
  explanation, 
  children 
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-gray-400">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-gray-900 text-white p-3 rounded-md shadow-lg">
          <div className="font-bold text-blue-300 mb-1">{term}</div>
          <p className="text-sm">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipFormula;