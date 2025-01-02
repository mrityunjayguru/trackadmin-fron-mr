import { useSelector } from 'react-redux';
import AdminRoleTable from './Component/AdminRoleTable'

import { useNavigate } from 'react-router-dom';
import AdmiHeaders from './Component/AdmiHeaders';
import { useEffect } from 'react';
function AdminRoles() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const navigate=useNavigate()
  useEffect(()=>{
    if(loginUser.role!="SuperAdmin"){
      navigate("/")
    }
  },[])
  return (
    <div>
      <AdmiHeaders/>
     <AdminRoleTable/>
    
    </div>
  )
}

export default AdminRoles
