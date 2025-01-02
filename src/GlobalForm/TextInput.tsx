import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface TextInputProps {
  field: any;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  field,
  formData,
  handleChange,
  passwordVisible,
  togglePasswordVisibility,
}) => (
  <div className="relative">
    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
      {field.label}
    </label>
    <div className="mt-1 relative">
      {field.icon && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          {field.icon}
        </span>
      )}
      <input
        type={field.name === 'password' ? (passwordVisible ? 'text' : 'password') : field.type}
        id={field.name}
        name={field.name}
        className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
        placeholder={field.placeholder}
        value={formData[field.name] || ''}
        onChange={handleChange}
      />
      {field.name === 'password' && (
        <span
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <FaEye size={20} color="#5E5E5E" /> : <FaEyeSlash size={20} color="#5E5E5E" />}
        </span>
      )}
    </div>
  </div>
);

export default TextInput;
