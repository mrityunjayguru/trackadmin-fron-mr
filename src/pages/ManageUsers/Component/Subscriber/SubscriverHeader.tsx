import React from 'react';

interface SubscriberHeaderProps {
  SingleSubscriber: {
    subscribeType?: string;
  };
}

const SubscriberHeader: React.FC<SubscriberHeaderProps> = ({ SingleSubscriber }) => {
  return (
    <div>
      {/* Render the subscribeType if it exists, else show a default message */}
      <h1 className='text-[#000000] text-xl'>{SingleSubscriber?.subscribeType || 'No Subscription Type Available'}</h1>

      <div className="border-b-2 border-[#D9E821]"></div>
    </div>
  );
};

export default SubscriberHeader;
