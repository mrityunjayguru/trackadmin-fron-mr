import { useState, useEffect, useRef } from 'react';

interface VehicleType {
  _id: string; // Add _id field
  icons: string; // Assuming this is a URL to the icon image
  vehicleTypeName: string;
}

const CustomDropdown = ({
  vehicletypes,
  selectedType,
  isdisabled,
  onSelect,
}: {
  vehicletypes: VehicleType[];
  selectedType: string;
  isdisabled: Boolean;
  onSelect: (typeId: string) => void; // Change type to accept typeId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the dropdown

  const toggleDropdown = () => {
    if (!isdisabled) return; // Ensure the dropdown is only toggled if enabled
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium flex justify-between items-center ${
          !selectedType ? 'text-gray-500' : ''
        }`}
      >
        {selectedType || 'Select vehicle type'}
        <span className={`ml-2 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className=" absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg h-48 overflow-y-scroll">
          {vehicletypes &&
            vehicletypes.map((type) => (
              <div
                key={type._id} // Use _id as the key
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  onSelect(type._id); // Pass the _id instead of name
                  setIsOpen(false); // Close the dropdown after selection
                }}
              >
                <img
                  src={`${import.meta.env.VITE_APP_Image_Url}${type.icons}`}
                  alt={type.vehicleTypeName}
                  className="w-5 h-5 mr-2"
                />
                {type.vehicleTypeName}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
