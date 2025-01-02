import { useEffect } from 'react';
import ListOfDevices from '../Devices/ListOfDevices';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import SubscriverHeader from './SubscriverHeader';
import {  ViewKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/ViewKeysSubscriber';
import GlobalForm from '../../../../GlobalForm/GlobalForm';

const Editusr: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const SingleSubscriber = useSelector((state: any) => state.subscriber.singleSubscriber);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  // Check if the SingleSubscriber is loaded and ensure the userId matches
  useEffect(() => {
    if (SingleSubscriber?._id !== userId) {
      navigate(`/`);
    }
  }, [SingleSubscriber, navigate, userId]);

  const handleSubmit = async (e: any) => {
    if (loginUser.permissions.Subscribers?.Update === true) {
      navigate(`/Edit-subscriber/${SingleSubscriber._id}`);
    }
    return;
  };

  return (
    <>
      <div className="my-3"></div>
      <SubscriverHeader SingleSubscriber={SingleSubscriber} />
      <div className="w-full">
        <div className="">
          <GlobalForm fields={ViewKeySubscriber(SingleSubscriber)} handleSubmit={handleSubmit} buttontext="Edit Subscriber" />
        </div>
      </div>

      <div className="my-4">
        <ListOfDevices />
      </div>
    </>
  );
};

export default Editusr;
