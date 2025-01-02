import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  suportdetail: {
    title: string;
    description: string; // Description will be shown here
    urgency: string; // You may want to keep this if you have different urgency levels
    sendTo: string; // This can be removed if not used
    createdAt: string;
    emailAddress: string; // New email property
    name: string; // This seems to be used for the urgency color
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, suportdetail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg py-5 w-1/2 mx-auto px-20 relative">
      <div className="flex gap-1">
      <p className="mt-1 text-sm text-[#949495]">
           {suportdetail.name} {/* Display email address */}
        </p>|
        <p className="mt-1 text-sm text-[#949495]">
          {new Date(suportdetail.createdAt).toLocaleString()}
        </p>
      </div>
        <div className=''>
          <div className="py-2 rounded-full"  /> {/* Use name as a color */}
          <h2 className="text-sm text-[#000] font-semibold">
            {suportdetail.title}
          </h2>
        </div>
        <p className="mt-1 py-2 text-sm font-normal text-[#000]">{suportdetail.description}</p>

        {/* Cross icon to close the modal */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-[#000] border"
        >
          &times; {/* Cross icon */}
        </button>
      </div>
    </div>
  );
};

export default Modal;
