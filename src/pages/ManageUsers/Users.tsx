import UserTable from './Component/Subscriber/userTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Getsubscribers } from '../../api/users'; // Ensure this imports the action creator correctly
import { AppDispatch } from '../../store/store';
import UserTableHeader from './Component/UserTableHeader';
import { getDeviceType } from '../../api/DeviceType';
function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const GetsubscribersList = async () => {
    const payload: any = {}; // Define payload structure if known
    try {
      await dispatch(Getsubscribers(payload));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetsubscribersList();
  }, [dispatch]);
  const getDeviceTypes = async () => {
    try {
      const payload: any = {
      };
      const response: any = await dispatch(getDeviceType(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDeviceTypes();
  }, []);
  return (
    <>
     <UserTableHeader/>
     {loginUser?.permissions?.Subscribers?.View === true || loginUser?.role=="SuperAdmin" ? (
        <UserTable />
      ) : (null)}

    </>
  );
}

export default Users;
