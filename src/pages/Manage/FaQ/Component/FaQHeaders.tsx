import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../common/Breadcrumb";

function FaQHeaders() {
    const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
    const navigate=useNavigate()
    const AddList = () => {
        // if (loginUser.permissions.FAQ?.Add == true) {
        navigate('/manage/Add-List');
        // }
      };
  return (
  <>
    <div className=''><Breadcrumb/></div>

<div className="flex justify-between gap-1 w-full p-4 mt-5 bg-[#000] setredius text-xl font-semibold text-white">
    <div className="flex gap-1">
      <h1 className="text-[#D9E821]">FAQs List</h1>
    </div>
    <div onClick={AddList} className="cursor-pointer">
      Add New +
    </div>
  </div>
  </>
  )
}

export default FaQHeaders
