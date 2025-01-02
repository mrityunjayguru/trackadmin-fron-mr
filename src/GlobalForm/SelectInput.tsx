import React from 'react';

interface SelectInputProps {
  field: any;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ field, formData, handleChange }) => (
  <div className="relative">
    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
      {field.label}
    </label>
    <select
      id={field.name}
      name={field.name}
      className="w-full border py-2 rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
      value={formData[field.name] || ''}
      onChange={handleChange}
    >
      <option value="">{field.placeholder || `Select ${field.label}`}</option>
      {field.options.map((option: any, idx: number) =>
        typeof option === 'string' ? (
          <option key={idx} value={option}>
            {option}
          </option>
        ) : (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        )
      )}
    </select>
  </div>
);

export default SelectInput;
