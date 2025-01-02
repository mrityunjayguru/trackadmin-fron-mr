import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../common/Breadcrumb";

function FaQHeaders() {
    const navigate=useNavigate()
    const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
    const addTopic = () => {
    
            navigate('/manage/add-Topic-List');
      };
  return (
    <>
        <div className=''><Breadcrumb/></div>
        <div className="flex justify-between gap-1 mt-5 w-full p-4 bg-[#000] setredius text-xl font-semibold text-white">
    <div className="flex gap-1">
      <h1 className="text-[#D9E821]">FAQ Topics List</h1>
    </div>
    <div onClick={addTopic} className="cursor-pointer">
      Add New +
    </div>
  </div>
    </>
 
  )
}

export default FaQHeaders
