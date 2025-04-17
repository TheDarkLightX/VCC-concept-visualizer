import React from 'react';

interface FormulaSyntaxProps {
  children: React.ReactNode;
}

const FormulaSyntax: React.FC<FormulaSyntaxProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 p-4 my-4 rounded-md border border-gray-200 font-mono text-center overflow-x-auto">
      <div className="text-lg md:text-xl text-gray-800">
        {children}
      </div>
    </div>
  );
};

export default FormulaSyntax;