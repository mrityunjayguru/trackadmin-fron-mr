import { useSelector } from 'react-redux';
import ManageMaps from './Component/ManageMaps';
import Maps from './Component/Maps';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { searchDevices } from '../../api/Map';
// import { socket } from './Utils/socket';

function mapoverview() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const navigate = useNavigate();
  const dispatch=useDispatch<AppDispatch>()
  const getDevicesList=()=>{
    const payload:any={}
    dispatch(searchDevices(payload))
  }
  //   useEffect(() => {
  //   const userId = 'All'; // Example: replace this with actual userId
  //   socket.emit('registerUser', { userId, socketId: socket.id });
  //   socket.on('message', (data: string) => {
  //     console.log('Message received:', data); 
  //   });
  //   return () => {
  //     socket.off('message');
  //   };
  // }, []);

  useEffect(() => {
    getDevicesList()
    if (
      loginUser?.permissions?.Map?.View !=true && loginUser.role!="SuperAdmin"
    ) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <ManageMaps />
      <div>
        <Maps />
      </div>
    </div>
  );
}

export default mapoverview;
