
import { useSelector } from 'react-redux';
import ManageSplash from './Component/ManageSplash'
import SplashTable from './Component/SplashTable'
function Splash() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  return (
    <div>
       <ManageSplash/>
  {/* <SplashTable/> */}
     
     
    </div>
  )
}

export default Splash
