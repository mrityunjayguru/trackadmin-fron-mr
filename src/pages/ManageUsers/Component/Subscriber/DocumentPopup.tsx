// DocumentPopup.tsx
import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
interface PopupProps {
  imageSrc: string;  // Prop to pass the image URL
  onClose: () => void;  // Function to close the popup
}

const DocumentPopup: React.FC<PopupProps> = ({ imageSrc, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 relative rounded shadow-lg max-w-lg mx-auto">
        <button
          onClick={onClose}
          className=" w-10 h-10 absolute top-0 right-2 bg-black text-white rounded-full p-2 cursor-pointer text-2xl"
        >
      <IoMdCloseCircle/>
        </button>
        <div className="flex justify-center">
          <img src={`${import.meta.env.VITE_APP_Image_Url}${imageSrc}`} alt="Popup Image" className="max-w-full max-h-96" />
        </div>
      </div>
    </div>
  );
};

export default DocumentPopup;
