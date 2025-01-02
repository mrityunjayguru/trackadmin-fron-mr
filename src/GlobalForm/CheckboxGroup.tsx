import React from 'react';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  selectedValues: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, options, selectedValues, handleChange }) => {
  return (
    <div>
      {options.map((option, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValues?.includes(option.value)}
            onChange={handleChange}
            className="h-4 w-4 border-gray-300 rounded"
          />
          <label htmlFor={`${name}-${option.value}`} className="text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
