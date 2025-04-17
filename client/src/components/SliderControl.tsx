import React from 'react';

interface SliderControlProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  valueDisplay: string;
  additionalInfo?: string;
}

const SliderControl: React.FC<SliderControlProps> = ({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  valueDisplay,
  additionalInfo
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="mt-4 mb-2">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <input 
          type="range" 
          id={id} 
          min={min} 
          max={max} 
          step={step} 
          value={value}
          onChange={handleChange}
          className="w-full md:w-64 cursor-pointer" 
        />
        <span className="font-semibold text-blue-800 min-w-[45px] text-right inline-block bg-blue-100 px-2 py-0.5 rounded">
          {valueDisplay}
        </span>
        
        {additionalInfo && (
          <span className="ml-2 text-sm text-gray-600">
            {additionalInfo.split(":")[0]}: <strong className="font-semibold text-blue-800 inline-block bg-blue-100 px-2 py-0.5 rounded">
              {additionalInfo.split(":")[1]}
            </strong>
          </span>
        )}
      </div>
    </div>
  );
};

export default SliderControl;
