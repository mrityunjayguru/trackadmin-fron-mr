import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

function AdmiHeaders() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

    const navigate=useNavigate()
  
    const handleclick=()=>{
        if(loginUser.role=="SuperAdmin"){
          navigate('/Admin-Roles/Add-Admin-Roles')
    }
    }
  return (
    <div className="flex justify-between setredius items-center w-full p-4 bg-[#000]  text-xl font-semibold text-white">
    <h1 className="text-[#D9E821]">User List</h1>
    <button
      className="cursor-pointer bg-transparent text-[#fff]"
      onClick={handleclick}
    >
      Add New +
    </button> 
  </div>
  )
}

export default AdmiHeaders
