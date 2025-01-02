import { useEffect, useState } from 'react';
import DatePickerTwo from '../../../../components/Forms/DatePicker/DatePickerTwo';
import { AddSubscriber, Getsubscribers } from '../../../../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { AddSubscriberKey } from '../../../../Utility/FolmKeys/Subscriber/Subscriber';
import { AddCompanySubscriber } from '../../../../Utility/FolmKeys/Subscriber/AddCompanySubscriber';
import { vehicleFields } from '../../../../Utility/FolmKeys/Devices/Devices';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { AddDealear } from '../../../../Utility/FolmKeys/Dealear/AddDealear';

const AddSubscribe: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Selectors
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const vehicleTypeData = useSelector(
    (state: any) => state.vehicletype.vehicleType
  );
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType
  );
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records
  );

  const [subscriberType, setSubscriberType] = useState('Individual');

  // Fetch vehicle types and dealer subscribers
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const payload:any={ filter: 'Dealer' }
        await dispatch(fetchVehicleType(payload));
       await dispatch(Getsubscribers(payload));
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
  }, []);

  // Store vehicle type data in local storage
  useEffect(() => {
    localStorage.setItem('vehicleTypeData', JSON.stringify(vehicleTypeData));
  }, [vehicleTypeData]);

  // Redirect if user doesn't have permission
  useEffect(() => {
    if (loginUser.permissions?.Subscribers?.Add === false) {
      navigate('/');
    }
  }, [loginUser, navigate]);

  const handleSubmit = async (formData: any) => {
    const payload = {
      ...formData,
      subscribeType: subscriberType,
      status: formData.status === 'Active'?true:false,
    };
    const response = await dispatch(AddSubscriber(payload));
    if (response.payload) {
      navigate('/subscribers');
    }
  };

  // Render fields based on subscriber type
  const renderFormFields = () => {
    if (subscriberType === 'Individual') {
      return (
        <GlobalForm
          fields={AddSubscriberKey}
          handleSubmit={handleSubmit}
          buttontext=""
        />
      );
    }
    if (subscriberType === 'Company') {
      return (
        <GlobalForm
          fields={AddCompanySubscriber}
          handleSubmit={handleSubmit}
          buttontext=""
        />
      );
    }
    if (subscriberType === 'Dealer') {
      return (
        <GlobalForm
          fields={AddDealear}
          handleSubmit={handleSubmit}
          buttontext="Add Dealer"
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="my-3">
        <div className="flex flex-row gap-3 ">
          {['Individual', 'Company', 'Dealer'].map((type) => (
            <button
              key={type}
              onClick={() => setSubscriberType(type)}
              className={`rounded-xl font-bold px-10 py-2 ${
                subscriberType === type
                  ? '  text-[#D9E821]'
                  : 'text-[#000] '
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mt-3 border-b-2 border-[#D9E821]"></div>
      </div>

      <div className="w-full">
        {renderFormFields()}

        {/* Add First Vehicle section */}
        {subscriberType !== 'Dealer' && (
          <>
            <div className="border-b-2 border-[#D9E821] my-4">
              <h2 className="font-semibold text-[#000] py-3">
                Add First Vehicle
              </h2>
            </div>
            <GlobalForm
              fields={vehicleFields(devicetypeDetails, DealerRecord)}
              handleSubmit={handleSubmit}
              buttontext="Submit and Add"
            />
          </>
        )}
      </div>
    </>
  );
};

export default AddSubscribe;
