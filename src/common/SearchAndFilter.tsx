import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon
import Select, { SingleValue, ActionMeta } from 'react-select'; // Import necessary types

// Define your status options type
interface StatusOption {
  value: string;
  label: string;
}

interface SearchAndFilterProps {
  statusOptions: StatusOption[]; // Accept statusOptions as prop
  onSearchChange: (value: string) => void;
  onStatusChange: (selectedOption: SingleValue<StatusOption>) => void; // Accept a SingleValue for status
  filter: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  statusOptions,
  onSearchChange,
  onStatusChange,
  filter,
}) => {
  return (
    <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
      {/* Search Input */}
      <div className="col-span-2 relative w-full">
        <input
          className="px-10 border border-gray-300 w-full py-2 rounded-2xl focus:border-gray-300 focus:outline-none"
          placeholder="Search"
          type="text"
          onChange={(e) => onSearchChange(e.target.value)} // Trigger search change
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Select Dropdown */}
      <div className="col-span-1 text-center">
        <Select
          options={statusOptions} // Use statusOptions prop
          placeholder="Filter"
          isSearchable={false}
          onChange={onStatusChange} // Updated to accept SingleValue<StatusOption>
          value={statusOptions.find((option) => option.value === filter)} // Set the current value
          styles={{
            control: (provided: any) => ({
              ...provided,
              minHeight: '38px',
              backgroundColor: '#000', // Set background color to black
              borderRadius: '9999px', // Fully rounded border (pill shape)
              border: 'none', // Remove any default borders
              paddingTop: '2px',
              paddingBottom: '2px',
              display: 'flex',
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }),
            placeholder: (provided: any) => ({
              ...provided,
              textAlign: 'center', // Center the placeholder text
              color: '#D9E821', // Set placeholder color to #D9E821
            }),
            option: (provided: any, state: { isSelected: any }) => ({
              ...provided,
              color: '#000', // Set option text color to black
              textAlign: 'center', // Center the option text
            }),
            singleValue: (provided: any) => ({
              ...provided,
              color: '#D9E821', // Set the color of the selected value
              textAlign: 'center', // Center the selected value
            }),
          }}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
