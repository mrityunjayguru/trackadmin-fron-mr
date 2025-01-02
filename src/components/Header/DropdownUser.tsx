import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';
import { useSelector } from 'react-redux';
import { updateProfile } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { FaRegUserCircle } from 'react-icons/fa';

const DropdownUser = () => {
  const dispatch=useDispatch<AppDispatch>()
  const data = useSelector((state: any) => state.Auth?.loginUserData);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle image upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const payload:any={
      profile:file,
      _id:data._id
    }
    dispatch(updateProfile(payload))
  };

  // Handle clicking on the image to trigger the file input
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          to="#"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {data ? data.Name : ''}
            </span>
            <span className="block text-xs"> {data ? data.phone : ''}</span>
          </span>
          {data?.profile ? (
            <span className="h-12 w-12 rounded-full overflow-hidden" onClick={handleImageClick}>
              <img className='h-full w-full object-cover' src={`${import.meta.env.VITE_APP_Image_Url}${data?.profile}`} alt="User" />
            </span>
          ) : (
            <span className="h-12 w-12 rounded-full overflow-hidden mcenter text-2xl" onClick={handleImageClick}>
              <Link to="#">
                {/* <img src={UserOne} alt="User" /> */}
                <FaRegUserCircle />
              </Link>
            </span>
          )}
        </Link>
      </ClickOutside>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileChange}
      />
    </>
  );
};

export default DropdownUser;
