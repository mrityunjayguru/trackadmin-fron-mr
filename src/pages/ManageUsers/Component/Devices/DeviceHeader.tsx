import React from 'react';
import { FaEye } from 'react-icons/fa';

interface DeviceHeaderProps {
  sibglesubscriber: any;
}

const DeviceHeader: React.FC<DeviceHeaderProps> = ({ sibglesubscriber }) => {
  return (
    <div>
      <div className="rounded-2xl flex justify-between gap-1 w-full px-4">
        <div className="flex gap-20">
          {/* Check if the user name exists and display it */}

          <div className='flex gap-1 items-center'>
            <div>
            <p className="text-sm font-normal text-[#9F9EA2]">User Name</p>
            <h1 className="text-[#000000] cursor-pointer font-medium">
              {sibglesubscriber.Name}
            </h1>
            <p className="text-sm font-normal text-[#9F9EA2]">
              {sibglesubscriber?.emailAddress}
            </p>
            </div>
            <div>
              <p className="text-[#D9E821] cursor-pointer flex justify-center items-center">
                <FaEye style={{ fontSize: '24px' }} />
              </p>
            </div>
          </div>

          {/* Check if dealer details exist and display them */}
          {sibglesubscriber?.dealerdetail && (
            <div className='flex items-center gap-1'>
            <div>
            <p className="text-sm font-normal text-[#9F9EA2]">Dealer Code</p>
              <h1 className="text-[#000000] cursor-pointer font-medium">
                {sibglesubscriber?.dealerdetail?.uniqueCode}
              </h1>
              <p className="text-sm font-normal text-[#9F9EA2]">
                {sibglesubscriber?.dealerdetail?.Name}
              </p>
            </div>
              <div>
              <p className="text-[#D9E821] cursor-pointer flex justify-center items-center">
                <FaEye style={{ fontSize: '24px' }} />
              </p>
            </div>
            </div>
          )}

          {/* Check if the phone number exists */}
          {sibglesubscriber?.dealerdetail?.phone && (
            <div className='flex items-center gap-1'>
             <div>
             <p className="text-sm font-normal text-[#9F9EA2]">
                Dealer Contact
              </p>
              <h1 className="text-[#000000] cursor-pointer font-medium">
                {sibglesubscriber?.dealerdetail?.Name}
              </h1>
              <p className="text-sm font-normal text-[#9F9EA2]">
                {sibglesubscriber?.dealerdetail?.phone}
              </p>
             </div>
              <div>
              <p className="text-[#D9E821] cursor-pointer flex justify-center items-center">
                <FaEye style={{ fontSize: '24px' }} />
              </p>
            </div>
            </div>
          )}
        </div>

        {/* Check if subscribeType exists before showing it */}
        {sibglesubscriber?.subscribeType && (
          <div className="text-sm text-[#000000] px-10 py-2 cursor-pointer rounded-lg">
            <h1 className="text-[#D9E821]">Account Type</h1>
            <p className="text-[#000000]">{sibglesubscriber?.subscribeType}</p>
          </div>
        )}
      </div>

      <div className="border-b-2 border-[#D9E821]"></div>
    </div>
  );
};

export default DeviceHeader;
