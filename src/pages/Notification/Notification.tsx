import { useSelector } from 'react-redux';
import ManageNotification from './Component/ManageNotification'
import Notificationtable from './Component/Notificationtable'
function Notification() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  return (
 <>
 {loginUser.permissions.Notification?.Add=== true || loginUser.role=="SuperAdmin"?(  <div className='w-10/12 m-auto'>
      <ManageNotification/>
    </div>):(null)}
    {loginUser.permissions.Notification?.View=== true || loginUser.role=="SuperAdmin"?(  
      
      <div className='mt-10'>
      <Notificationtable/>
      </div>
  ):(null)}
  
 </>
  )
}

export default Notification
