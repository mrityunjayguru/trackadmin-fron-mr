import { useState, useEffect } from 'react';
import OtherDetails from '../OtherDetails';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { vehicleFields } from '../../../../Utility/FolmKeys/Devices/Devices';
import { getDeviceType } from '../../../../api/DeviceType';
import DeviceHeader from './DeviceHeader';
interface VehicleType {
  _id: string;
  icons: string;
  vehicleTypeName: string;
}
const AddDevices = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [owner, setOwner] = useState<{ Name?: string; _id?: string }>({});
  const [vehicletypes, setVehicleType] = useState<VehicleType[]>([]);
  const data = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType,
  );
  console.log(devicetypeDetails,"devicetypeDetailsdevicetypeDetails")
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setVehicleType(data);
    setOwner(data2);
  }, [data, data2]);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const getVehicleType = async () => {
    try {
      const payload: any = {};
      await dispatch(fetchVehicleType(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVehicleType();
  }, [dispatch]);

  const handleSubmit = async (val: any) => {
    const payload: any = {
      ...val,
      status: val.deviceStatus,
      fule: val.fuelStatus == 'of' ? false : true,
      ownerID: data2?._id,
    };

    await dispatch(addDevice(payload));
    setErrors({});
  };

  useEffect(() => {
    if (
      loginUser &&
      loginUser.permissions?.Device?.Add === false &&
      loginUser.role !== 'SuperAdmin'
    ) {
      navigate('/');
    }
  }, [loginUser, navigate]);

  // Fetching device types
 
const PropsRecord={
...data2
}
  return (
    <div className="w-full">
      <DeviceHeader  sibglesubscriber={PropsRecord}/>

      <div className="my-5">
        <GlobalForm
          fields={vehicleFields(devicetypeDetails,DealerRecord)}
          handleSubmit={handleSubmit}
          buttontext="Sign Up"
        />

      </div>
    </div>
  );
};

export default AddDevices;
