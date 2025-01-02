import  { useEffect,useState } from 'react';
import { fetchVehicleType,singlevehicle } from '../../../../api/VehicleType';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { AppDispatch } from '../../../../store/store';
function VehicleTable() {
  const [vehicle, setVehicle] = useState([]); // State for storing vehicle types
  const data = useSelector((state: any) => state.vehicletype.vehicleType);

  useEffect(() => {
    if (data) {
      setVehicle(data); // Set vehicle data from Redux state
      console.log(vehicle)
    }
  }, [data]);

  const dispatch = useDispatch<AppDispatch>();

  const getVehicleType = async () => {
    try {
      const payload: any = {};
      dispatch(fetchVehicleType(payload)); // Dispatch fetchVehicleType action
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVehicleType(); // Fetch vehicle types on component mount
  }, []);

const setProductData=(data:any)=>{
dispatch(singlevehicle(data))
}

  return (
    <>
     <div className=" rounded-2xl flex justify-between gap-1 w-full p-4 text-xl font-semibold text-white bg-[#000] mt-5">
        <div className="flex gap-1">
          <h1 className="text-[#D9E821]">Added Vehicle Type</h1>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        { data &&  data.map((item: any, index: number) => (
          <div key={index} className="flex justify-center items-center flex-col">
            <div>
              <img 
                src={`${import.meta.env.VITE_APP_Image_Url}${item.icons}`} 
                alt={item.vehicleTypeName} 
                className="w-20 h-20 object-cover"
              />
            </div>
            <div>{item.vehicleTypeName}</div> {/* Display vehicle type name (e.g., car) */}
            <div onClick={()=>setProductData(item)} className="cursor-pointer text-red-500 text-2xl mt-2">
              <FaRegEdit /> {/* Edit icon with red color and larger size */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default VehicleTable;
