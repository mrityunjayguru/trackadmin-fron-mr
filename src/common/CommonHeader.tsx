import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Define the type for propsData to improve type safety
interface CommonHeaderProps {
  title: string;
  button: string;
  redirect:string;
}

function CommonHeader({ propsData }: { propsData: CommonHeaderProps }) {
  const navigate = useNavigate();
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  // Descriptive event handler function name
  const handleCreateSubscriber = (redirect:any) => {
    if(redirect){
      navigate(`/${redirect}`);
    }
  };

  return (
  <>
    <div className="rounded-2xl flex justify-between gap-1 w-full px-4  text-xl font-semibold ">
      <h1 className="text-[#000000] cursor-pointer">
        {propsData.title}
      </h1>
      {propsData.button?(<div onClick={()=>{handleCreateSubscriber(propsData.redirect)}} className="text-sm text-[#000000] px-10 py-2 cursor-pointer bg-[#D9E821]">
          {propsData.button}
        </div>):(null)}
        
    </div>
    <div className="border-b-2 border-[#D9E821]"></div>
  </>
  );
}

export default CommonHeader;
