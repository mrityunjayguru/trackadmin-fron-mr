import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CommonHeader from "../../../common/CommonHeader";
function UserTableHeader() {
    const navigate=useNavigate()
    const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
    const createSubscriber = () => {
        navigate('/add-subscribers');
      };
      const propsData={
        title:"List of All Subscribers",
        button:"Add New +",
        redirect:"add-subscribers",
    }
  return (

    <>
    <CommonHeader  propsData={propsData} />
    </>
  //   <div className="rounded-2xl flex justify-between gap-1 w-full p-4 bg-[#000]  text-xl font-semibold text-white">
  //   <h1 className="text-[#D9E821] cursor-pointer">
  //     List of All Subscribers
  //   </h1>
  //   {loginUser.permissions.Subscribers?.Add === true || loginUser.role=="SuperAdmin" ? (
  //     <div onClick={createSubscriber} className="cursor-pointer">
  //       Add New +
  //     </div>
  //   ) : null}
  // </div>
  )
}

export default UserTableHeader
