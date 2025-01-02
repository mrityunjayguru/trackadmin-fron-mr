import { useState, useEffect } from 'react';
import OtherDetails from '../OtherDetails';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from '../Subscriber/CustomDropdown';
import { manageSingleDevices, updateDevices } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { ViewDeviceKeys } from '../../../../Utility/FolmKeys/Devices/ViewDeviceKey';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { getDeviceType } from '../../../../api/DeviceType';
import DeviceHeader from './DeviceHeader';
interface FormData {
  deviceId: string;
  imei: string;
  vehicleType: string; // This will hold the vehicle type ID
  vehicleTypeName: string; // This will hold the vehicle type name
  vehicleNo: string;
  status: string;
  ownerID: string;
  _id: string;
  fuel: string; // Added fuel status field
}

interface VehicleType {
  _id: string;
  icons: string;
  vehicleTypeName: string;
}

const VeiwDevices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [vehicletypes, setVehicleType] = useState<VehicleType[]>([]);
  const VehiclwType = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const singleDevices = useSelector((state: any) => state.subscriber.singleDevice);
  const allDevices = useSelector((state: any) => state.subscriber.userDevices);

  const [owner, setOwner] = useState<{ uniqueID?: string; _id?: string }>({});
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye.deviceType,
  );
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const getVehicleType = async () => {
    const payload: any = {};
    try {
      await dispatch(fetchVehicleType(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVehicleType();
  }, [dispatch]);

  const handleSubmit = async () => {
    navigate('/Edit-Devices');
  
  };



  const reniewsubscribes = () => {
    localStorage.setItem('ownerid', data2._id);

    navigate('/manage/deviceList');
  };
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  // Handler for the change event
  const handleDeviceChange = (event: any) => {
    setSelectedDeviceId(event.target.value); // Set the selected deviceId to state

    allDevices.find((val: any) => {
      if (val._id == event.target.value) {
        dispatch(manageSingleDevices(val));
      }
    });
  };
  const getDates = (mydate: any): string => {
    const date = new Date(mydate);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // Formats to "11 Jan 2024"
  }

  const formattedVehicleTypes = VehiclwType?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName,  // Use the name of the vehicle type as label
    value: vehicle._id,  // Convert to lowercase and replace spaces with dashes
    icon: vehicle.icons,  // Assuming the icon filename is stored in `icons`
  }));
 const getDeviceTypes = async () => {
    try {
      const payload: any = {
      };
      const response: any = await dispatch(getDeviceType(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDeviceTypes();
  }, []);
  const PropsRecord={
    ...data2,
    ...singleDevices
    }
  return (
    <>
      <div className="w-full">
      <DeviceHeader sibglesubscriber={PropsRecord}  />
        <div className="my-5 p-2 ">
          <div className="mb-4 px-2">
            <label
              htmlFor="deviceId"
              className="block text-sm font-medium text-gray-700 dark:text-white mb-1 p-2"
            >
              Select Vehicle
            </label>
            <select
              name="deviceId"
              id="deviceId"
              value={selectedDeviceId}
              onChange={handleDeviceChange}
              className="block w-1/2 p-2.5   border border-gray-300 rounded-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            >
              {allDevices &&
                allDevices.map((val: any) => (
                  <option key={val._id} value={val._id}>
                    {val.imei} {/* Show deviceId as the text */}
                  </option>
                ))}
            </select>
          </div>

        
        <GlobalForm fields={ViewDeviceKeys(singleDevices,formattedVehicleTypes,devicetypeDetails,DealerRecord)} handleSubmit={handleSubmit} buttontext="Submit" />

          <div className="py-2 px-5 flex gap-24">
            <div>
              <p className="textred font-bold text-[12px]">
                Subscription Expire
              </p>
              <h1 className="text-[#000] font-bold text-[14px]">
  {singleDevices?.subscriptionexp 
    ? getDates(singleDevices.subscriptionexp)
    : "-"}
</h1>

            </div>
            <div
              onClick={reniewsubscribes}
              className="bg-[#000] text-[12px] font-bold cursor-pointer texty flex justify-center items-center py-1 px-5 rounded-2xl"
            >
              Renew / Extend Subscription
            </div>
          </div>
          <div className="mt-20">
            <OtherDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default VeiwDevices;
