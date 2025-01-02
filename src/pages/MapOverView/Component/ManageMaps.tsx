import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { getmapDetails, searchuser, setblank } from '../../../api/Map';
// import { setZomm } from '../../../store/manageMap';
import { setZomm } from '../../../store/manageMap';
import Select from 'react-select';

const ManageMaps = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [ownerid, setownerid] = useState<string | null>(null);
  const [deviceId,setDeviceId]=useState(null)
  const searchdata = useSelector((state: any) => state.map.searchusers) || [];
  const searchDevices = useSelector((state: any) => state.map.devicesList) || [];
  const maprecords = useSelector((state: any) => state.map.AllmapDetails);

const [selectedOption,setselectedOption]=useState(null)
const [setlectedDevice,setSelectedDevice]=useState(null)
  useEffect(() => {
    const payload: any = [];
    dispatch(setblank(payload)); // Clear previous data on mount
    const payload2: any = { search: '' };
    dispatch(searchuser(payload2)); // Fetch initial search data
  }, [dispatch]);

  // Fetch all maps
  const getAllmaps = useCallback(async () => {
    try {
      const payload: any = {};
      if (ownerid) {
        Object.assign(payload, { ownerId: ownerid });
      }
      if(deviceId){
        Object.assign(payload, { deviceId: deviceId });
      }
      await dispatch(getmapDetails(payload)); // Fetch map details based on ownerId
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, ownerid,deviceId]);
  // Handle ownerId change from the dropdown
  const handleStatusChange = (val: any) => {
    setselectedOption(val)
    setownerid(val.value); // Update ownerid based on dropdown selection
    setDeviceId(null)
    setSelectedDevice(null)
  };

  const handleShowAllClick = async () => {
    setownerid(null); // Clear ownerid before fetching all maps
    setDeviceId(null)
    setselectedOption(null)
    setSelectedDevice(null)

    await getAllmaps(); // Fetch all maps
  };

  const showonmap = async() => {
    await getAllmaps(); // Fetch and show maps based on ownerId
    await dispatch(setZomm(true))
    console.log(maprecords,"maprecordsmaprecords")
 
  };

  // Interval setup to call `getAllmaps` every 5 seconds
  useEffect(() => {
    const newInterval = setInterval(() => {
      getAllmaps();
    }, 5 * 1000);

    return () => {
      clearInterval(newInterval); // Cleanup interval on unmount
    };
  }, [getAllmaps]);

  useEffect(()=>{
    getAllmaps();
  },[])
  const statusOptions = searchdata.map((val: any) => ({
    label: val.Name, // Display Name in the dropdown
    value: val.userID, // Use userID as the value
  }));
const deviceoption=searchDevices.map((val:any)=>({
  label: val.imei,
  value: val._id, 
}))

const handleStatusChangeDevice=(val: any)=>{
  setDeviceId(val.label)
  setSelectedDevice(val)
  setownerid(null)
  setselectedOption(null)
}
const [disabled,setDisabled]=useState(false)
useEffect(() => {
  if (deviceId == null && ownerid == null) {
    setDisabled(true); // Disable button if either value is null
  } else {
    setDisabled(false); // Enable button if both values are non-null
  }

//  if(maprecords.length==0){
//   alert("alert")
//  }
}, [deviceId, ownerid]);
  return (
    <>
      {/* <div className="text-2xl font-semibold text-[#000]">Map Overview</div> */}

      <div className="grid grid-cols-[60.25%_auto_auto] gap-10 my-2">
        <div className='flex w-full gap-2'>
        <div  className='w-full'>
        <Select
            options={statusOptions} // Dropdown options
            value={selectedOption}
            onChange={handleStatusChange} // Handle selection
            // styles={{
            //   control: (provided) => ({
            //     ...provided,
            //     minHeight: '38px',
            //   }),
            // }}
                 placeholder="Search Subscriber"
          />
        </div>
        <div className='w-full'>
        <Select
            options={deviceoption} // Dropdown options
            onChange={handleStatusChangeDevice} // Handle selection
            value={setlectedDevice}
            placeholder="Search IMEI No"
            // styles={{
            //   control: (provided) => ({
            //     ...provided,
            //     minHeight: '38px',
            //   }),
            // }}
          />
        </div>
        </div>
        <div onClick={showonmap}>
  <button
    type="submit"
    className={`h-[40px] py-1 px-5 w-full rounded-2xl font-medium ${
      disabled
        ? ' text-[#fff] cursor-not-allowed bg-gray-400'  // Disabled state color
        : 'bg-[#000] text-[#D9E821] '   // Active state color
    }`}
    disabled={disabled}
  >
    Show on Map
  </button>
</div>

        <div onClick={handleShowAllClick}>
          <button
            type="submit"
            className="h-[40px] py-1 px-5 w-full rounded-2xl bg-[#000] text-[#D9E821] font-medium "
          >
            Show All
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageMaps;

