// Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    title: string;
    message: string;
    urgency: string;
    sendTo: string;
    createdAt: string;
    result: { name: string }[]; // Replace with a specific type if you have one
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, notification }) => {
  if (!isOpen) return null;
console.log(notification,"notificationnotification")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg py-5 w-1/2 mx-auto px-20 relative"> {/* Added relative positioning */}
        <div className='flex gap-2 items-center'>
          <div className={`w-3 h-3 text-[#000] rounded-full bg-[${notification.urgency}]`} style={{background:notification.urgency}} />
          <h2 className="text-sm text-[#000] font-semibold">
            {notification.title}
          </h2>
        </div>
        <p className="mt-1 text-sm text-[#000]">{notification.message}</p>
        <p className="mt-1 text-[#000]">
          {notification.result.length==0?(
                   <strong className='text-sm'>Sent To: All</strong> 
          ):(
      null
          )}
   
        </p>
        <p className="mt-1 text-sm text-[#000]">
          <strong>Created At:</strong>{' '}
          {new Date(notification.createdAt).toLocaleString()}
        </p>

        {notification.result.length > 0 ? (
          <>
            <div className="setredius py-1 px-4 bg-[#000000] font-normal text-sm my-1 md:px-6 xl:px-7.5">
              <h4 className="text-normal texty font-medium dark:text-white">
                Send To
              </h4>
            </div>
            <div className="mt-2">
              {notification.result.map((user, index) => (
                <p key={index} className="text-sm text-[#000]">
                  {user.name}
                </p>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-[#000]"></p>
        )}

        {/* Cross icon to close the modal */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-[#000] border " // Circle button
        >
          &times; {/* Cross icon */}
        </button>
      </div>
    </div>
  );
};

export default Modal;
