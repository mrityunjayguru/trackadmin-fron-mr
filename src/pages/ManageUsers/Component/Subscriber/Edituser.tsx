import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editSubscriber } from '../../../../api/users'; // Import your action here
import { AppDispatch } from '../../../../store/store';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { EditKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/EditKeySubscriber';
import SubscriverHeader from './SubscriverHeader';

const Edituser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const singleSubscriber = useSelector((state: any) => state.subscriber.singleSubscriber);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  // Redirect to home page if the subscriber ID does not match the URL parameter
  useEffect(() => {
    if (singleSubscriber?._id !== userId) {
      navigate(`/`);
    }
  }, [singleSubscriber, navigate, userId]);

  const handleSubmit = async (val: any) => {
    try {
      // Make API call to edit the subscriber
      const payload:any={
        ...val,
        status:val.status=='Active'?true:false,
        _id:singleSubscriber._id
      }
      const response = await dispatch(editSubscriber(payload));

      if (response.payload === true) {
        navigate('/subscribers');
      }
    } catch (error) {
      console.error('Error updating subscriber: ', error);
    }
  };

  return (
    <>
      <div className="my-3"></div>
      <SubscriverHeader SingleSubscriber={singleSubscriber} />


      <div className="my-3"></div>
      <div className="w-full">
        <GlobalForm fields={EditKeySubscriber(singleSubscriber)} handleSubmit={handleSubmit} buttontext="Submit" />
      </div>
    </>
  );
};

export default Edituser;
