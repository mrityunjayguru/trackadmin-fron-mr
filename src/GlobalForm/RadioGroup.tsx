import React from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, selectedValue, handleChange }) => {
  return (
    <div>
      {options.map((option, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            className="h-4 w-4 border-gray-300 rounded-full"
          />
          <label htmlFor={`${name}-${option.value}`} className="text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
