import { useState, useEffect } from 'react';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { updateDevices } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { editDeviceKeys } from '../../../../Utility/FolmKeys/Devices/editDeviceKeys';
import { getDeviceType } from '../../../../api/DeviceType';
import DeviceHeader from './DeviceHeader';

const EditDevices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const VehiclwType = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const singleUserDevice = useSelector((state: any) => state.subscriber.singleDevice);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [owner, setOwner] = useState<{ uniqueID?: string; _id?: string }>({});
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye.deviceType,
  );
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  // Fetch vehicle types on mount
  useEffect(() => {
    const getVehicleType = async () => {
      const payload:any={}
      try {
        await dispatch(fetchVehicleType(payload));
      } catch (err) {
        console.error(err);
      }
    };
    getVehicleType();
  }, [dispatch]);

  // Redirect if the user doesn't have permission
  useEffect(() => {
    if (loginUser.permissions?.Device?.Update === false && loginUser.role !== "SuperAdmin") {
      navigate("/");
    }
  }, [loginUser, navigate]);

  const handleSubmit = async (val: any) => {
    // Clone the val object to avoid mutation
    let payload: any = { ...val };
    // Convert displayParameters array into an object with keys as the parameters and values as true
    if (payload.displayParameters && Array.isArray(payload.displayParameters)) {
      const displayParametersObject = payload.displayParameters.reduce((acc: any, param: string) => {
        acc[param] = true;
        return acc;
      }, {});
  
      // Assign the newly created object to displayParameters key
      payload.displayParameters = displayParametersObject;
      payload._id=singleUserDevice._id
    }
  
    console.log(payload, "payloadpayload");

    // Dispatch the updated payload
    await dispatch(updateDevices(payload));
  
    // Navigate to the subscribers page after successful update
    // navigate("/subscribers");
  };
  

  const getDates = (mydate: any): string => {
    const date = new Date(mydate);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // Formats to "11 Jan 2024"
  };

  const reniewsubscribes = () => {
    localStorage.setItem('ownerid', data2._id);
    navigate('/manage/deviceList');
  };

  // Format vehicle types for dropdown
  const formattedVehicleTypes = VehiclwType?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName,
    value: vehicle._id,
    icon: vehicle.icons,
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
    ...singleUserDevice
    }
  return (
    <div className="w-full">
            <DeviceHeader sibglesubscriber={PropsRecord}  />


      <div className="my-5 ">
        <GlobalForm fields={editDeviceKeys(singleUserDevice, formattedVehicleTypes,devicetypeDetails,DealerRecord)} handleSubmit={handleSubmit} buttontext="Submit" />

        {/* Subscription Expiry and Renewal */}
        <div className="py-2 px-5 flex gap-24">
          <div>
            <p className="textred font-bold text-[12px]">Subscription Expire</p>
            <h1 className="text-[#000] font-bold text-[14px]">
              {singleUserDevice?.subscriptionexp ? getDates(singleUserDevice.subscriptionexp) : "-"}
            </h1>
          </div>
          <div onClick={reniewsubscribes} className="bg-[#000] text-[12px] font-bold cursor-pointer texty flex justify-center items-center py-1 px-5 rounded-2xl">
            Renew / Extend Subscription
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDevices;
