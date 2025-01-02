
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExPDevices, updateMany } from '../../../api/Device';
import { AppDispatch } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { updateDevice } from '../../../store/subscriber';

function ExpiryList() {
  const dispatch = useDispatch<AppDispatch>();
  const devices = useSelector((state: any) => state.subscriber.ExPDevices);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [renewalDate, setRenewalDate] = useState<string>('');
  const [nextBillingCycle, setNextBillingCycle] = useState<string>('');
  const navigate = useNavigate();

  const getrecords = () => {
    const payload: any = {
      ownerid: localStorage.getItem('ownerid'),
    };
    dispatch(getExPDevices(payload));
  };

  useEffect(() => {
    getrecords();
  }, [dispatch]);

  const handleCheckboxChange = (deviceId: string) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSubmit = async () => {
    const payload: any = {
      deviceId: selectedDevices,
      subscriptionexp: nextBillingCycle,
      subscriptiostart: renewalDate,
    };
    await dispatch(updateMany(payload));
    getrecords();
    setSelectedDevices([]);
    await dispatch(updateDevice(payload));
  };

  const getStatusMessage = (subscriptionExp: string) => {
    const currentDate = new Date();
    const expDate = new Date(subscriptionExp);
    if (subscriptionExp) {
      if (expDate < currentDate) {
        return 'Expired';
      } else {
        const options: any = { month: 'short', year: 'numeric', day: 'numeric' }; // Short month name
        return `Expiring on ${expDate.toLocaleDateString(undefined, options)}`;
      }
    } else {
      return '';
    }
  };
  

  return (
    <div className="bg-[#fff] min-h-[85vh]">
      <div className="flex justify-between gap-1 w-full my-4 text-normal font-semibold text-white">
        <div className="flex justify-between gap-1 w-full p-4 text-xl font-semibold text-white bg-[#000] rounded-lg">
          <h1 className="text-[#D9E821]">Devices List</h1>
        </div>
      </div>

      <div className="mx-5 my-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className='col-span-2'>
          <div className="text-[#000] text-lg font-normal mb-4">
            Select Devices for Renewal
          </div>
          <div className="container mx-auto">
            {devices && devices.length > 0 ? (
              <ul className="flex  flex-col flex-wrap gap-4">
                {devices.map((device: any) => (
              <li key={device.deviceId} className="flex items-center w-full sm:w-auto">
              <input
                type="checkbox"
                id={device.deviceId}
                checked={selectedDevices.includes(device.deviceId)}
                onChange={() => handleCheckboxChange(device.deviceId)}
                className="mr-2 cursor-pointer"
              />
              <label
                htmlFor={device.deviceId}
                className={`flex-1 flex justify-between cursor-pointer text-[#000] font-bold text-sm ${
                  getStatusMessage(device.subscriptionexp) === 'Expired' ? 'text-[#949495]' : ''
                }`}
              >
                <span>
                  {device.deviceId} - 
                </span>
                <span className="cursor-pointer font-medium text-[#949495]">
                  {getStatusMessage(device.subscriptionexp)}
                </span>
              </label>
            </li>
            
                ))}
              </ul>
            ) : (
              <p className="text-[#949495]">No devices available</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <p className="text-[#000] text-lg mb-1">Renewal Date</p>
          <p className="text-[#949495] text-sm">Payment made on</p>
          <input
            type="date"
            value={renewalDate}
            onChange={(e) => setRenewalDate(e.target.value)}
            className="bg-[#F1F2F4] text-[#949495] text-normal w-full py-2 px-4 my-2 rounded-lg"
          />
        </div>

        <div>
          <p className="text-[#000] text-lg mb-1">Next Billing Cycle</p>
          <p className="text-[#949495] text-sm">Next expiration date</p>
          <input
            type="date"
            value={nextBillingCycle}
            onChange={(e) => setNextBillingCycle(e.target.value)}
            className="bg-[#F1F2F4] text-[#949495] text-normal w-full py-2 px-4 my-2 rounded-lg"
          />
        </div>

        <div className="flex items-center ">
          <button
            onClick={handleSubmit}
            className="bg-[#000] text-[#D9E821] w-full sm:w-40 h-10 rounded-2xl"
          >
            Update Renewal
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpiryList;