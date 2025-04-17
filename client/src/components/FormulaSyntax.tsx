import React from 'react';

interface FormulaSyntaxProps {
  children: React.ReactNode;
}

const FormulaSyntax: React.FC<FormulaSyntaxProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 border-l-4 border-blue-500 p-4 my-4 font-mono text-sm text-gray-700 rounded whitespace-pre-wrap">
      {children}
    </div>
  );
};

export default FormulaSyntax;
