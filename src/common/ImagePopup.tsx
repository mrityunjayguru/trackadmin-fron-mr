import React from 'react';

interface ImagePopupProps {
  imageSrc: string; // URL or path of the image
  onClose: () => void; // Function to close the popup
}

const ImagePopup: React.FC<ImagePopupProps> = ({ imageSrc, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <img src={ `${import.meta.env.VITE_APP_Image_Url}${imageSrc}` } alt="popup" className="popup-image" />
      </div>
    </div>
  );
};

export default ImagePopup;
