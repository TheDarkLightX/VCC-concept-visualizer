import React from 'react';

interface MathFormulaProps {
  children: React.ReactNode;
  caption?: string;
}

const MathFormula: React.FC<MathFormulaProps> = ({ children, caption }) => {
  return (
    <div className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg overflow-x-auto">
        <pre className="font-mono text-lg text-blue-100 whitespace-pre-wrap">{children}</pre>
      </div>
      {caption && (
        <div className="text-center text-sm text-gray-600 mt-2 italic">
          {caption}
        </div>
      )}
    </div>
  );
};

export default MathFormula;