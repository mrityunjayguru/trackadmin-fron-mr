import React, { useEffect, useState } from 'react';
import { searchuser } from '../../../api/Map';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
// import { createNotification } from '../../../api/Notification';
import {
  createNotification,
  sendPushNotifications,
  getNotification
} from '../../../api/Noification';
import Select from 'react-select';
import Swal from "sweetalert2";

const ManageNotification: React.FC = () => {
  const searchdata = useSelector((state: any) => state.map.searchusers);
  
  const [selectedUsers, setSelectedUsers] = useState<
    { userID: string; Name: string }[]
  >([]);
  const [selectedValues, setSelectedValues] = useState([]);
const [users,setuser]=useState([])
  const [sendToAll, setSendToAll] = useState<boolean>(false);
  const [urgency, setUrgency] = useState<string>(''); // Set urgency as needed
  const [emailTitle, setEmailTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [options,setoptions]=useState([])
  const [errors, setErrors] = useState<{
    selectedUsers?: string;
    urgency?: string;
    emailTitle?: string;
    message?: string;
  }>({});

  const dispatch = useDispatch<AppDispatch>();
  const getusers=()=>{
    if( searchdata && searchdata.length>0){
      const options: any = searchdata.map((val: any) => ({
        label: val.Name,
        value: val.userID,
      }));
      setoptions(options)
    }
  }
useEffect(()=>{
 getusers()
},[searchdata])
 

  // Reset form fields after submission
  const resetForm = () => {
    setSelectedUsers([]);
    setSendToAll(false);
    setUrgency('');
    setEmailTitle('');
    setMessage('');
    setErrors({});
    setSelectedValues([])
    setuser([])
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  
    e.preventDefault();
    const newErrors: {
      selectedUsers?: string;
      urgency?: string;
      emailTitle?: string;
      message?: string;
    } = {};

    // Validate form
    if (!sendToAll && selectedUsers.length === 0)
      if (!urgency) newErrors.urgency = 'Urgency is required.';
    if (!emailTitle) newErrors.emailTitle = 'Title is required.';
    if (!message) newErrors.message = 'Message is required.';

    setErrors(newErrors);

    // If no errors, proceed with notification creation
    if (Object.keys(newErrors).length === 0) {
      const payload: any = {
        urgency,
        title: emailTitle,
        message,
      };
 
     let newuser = users.map((val: any) => ({ user: val.value }));

      Object.assign(payload, { users: newuser });
      Object.assign(payload, { sendTo:selectedOption });
      if(selectedOption=="Selected"){
        if(newuser.length==0){
        return  GetMessage("warning","Please Select User")
        }
      }
      dispatch(createNotification(payload))
        .then((response: any) => {
          if(response.payload==true){
            let payload: any = {};
            dispatch(sendPushNotifications(payload));
            dispatch(getNotification(payload))
          }
          resetForm(); // Reset form on successful submission
        })
        .catch((error: any) => {
          console.error('Error creating notification:', error);
        });
    }
  };

  useEffect(() => {
    const payload: any = { search: '' };
    dispatch(searchuser(payload));
  }, []);
const handlechange=(selected:any)=>{
  setuser([])
setSelectedValues(selected.value)
  setuser(selected)
}
// const selectedall=()=>{
//   setSendToAll(!sendToAll)
//   setuser([])
//   setSelectedValues([])
// }
  const [selectedOption, setSelectedOption] = useState('Selected');

  const handleFuelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    if(event.target.value=='All'){
   setuser([])
  setSelectedValues([])
    }
  };
  const GetMessage = (type:any, messga:any) => {
    Swal.fire({
      icon: type,
      title: messga,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  return (
    <>
      <div className="text-xl font-semibold text-black"></div>
      <div className="setredius py-4 px-4 bg-[#000000] texty font-normal text-xl md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold texty dark:text-white">Send Announcement</h4>
      </div>
      <div className="bg-white">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 py-5 px-5 max-w-2xl mx-auto"
        >
          {/* Select User */}
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:gap-3 items-center">
              <label className="w-full md:w-[30%] text-sm font-medium text-black">
                Select Users
              </label>
              <div className="relative w-full">
                <Select
                  isMulti
                  name="urgency"
                  options={options}
                  value={selectedValues} // Bind the selected values here
                  onChange={handlechange} 
                  isDisabled={selectedOption=='All'}
                  
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <div className="mb-2 w-1/2">
              <div  className='flex'>
                <label className=" cursor-pointer">
                <span className="ml-2 text-sm">Selected</span>
                  <input
                    type="radio"
                    name="Selected"
                    value="Selected"
                    onChange={handleFuelChange}
                    checked={selectedOption=== 'Selected'}
                    className="cursor-pointer setbluebutton ml-4"
                  />
                
                </label>
                <label className=" ml-6 cursor-pointer">
                <span className="ml-2 text-sm">Send To All</span>
                  <input
                    type="radio"
                    name="All"
                    value="All"
                    onChange={handleFuelChange}
                    checked={selectedOption === 'All'}
                    className="cursor-pointer text-sm setbluebutton ml-4"
                  />
                 
                </label>
              </div>
            </div>
            </div>
            {errors.selectedUsers && (
              <span className="text-red-500 text-sm">
                {errors.selectedUsers}
              </span>
            )}
           
          </div>

          {/* Clear Search Button */}
         

          {/* Urgency */}
          {/* Urgency */}
          <div className="flex gap-1 flex-wrap">
            <label className="w-full md:w-[16%] text-sm font-medium text-black">
              Urgency
            </label>
            {[
              '#02B754',
              '#000000',
              '#F5AD01',
              '#D9D9D9',
              '#FE5513',
              '#D9D9D6',
            ].map((color, index) => (
              <div       className={`input-group ${index+1 ==3 || index+1 ==5 ? 'pl-7' : ''}`} key={index}>
                {/* {index+1} */}
                <label>
                  <input
                    className="cursor-pointer"
                    name="urgency"
                    type="radio"
                    value={color}
                    checked={urgency === color}
                    onChange={() => setUrgency(color)}
                    style={{
                      appearance: 'none',
                      width: '33px',
                      height: '33px',
                      borderRadius: '50%',
                      backgroundClip: 'content-box',
                      border: `2px solid ${
                        urgency === color ? color : 'rgba(255,252,229,1)'
                      }`, // Conditional border
                      backgroundColor: color,
                      padding: urgency === color ? '4px' : '0',
                    }}
                  />
                </label>
              </div>
            ))}
            {errors.urgency && (
              <span className="text-red-500 text-sm">{errors.urgency}</span>
            )}
          </div>

          {/* Title */}
          <div className="flex items-center mb-4">
            <label className="w-full md:w-[20%] text-sm font-medium text-black">
              Title
            </label>
            <input
              type="text"
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
              placeholder="Enter Title"
              className={`w-full rounded-2xl bg-gray-100 border-none py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary ${
                errors.emailTitle ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.emailTitle && (
              <span className="text-red-500 text-sm">{errors.emailTitle}</span>
            )}
          </div>

          {/* Message */}
          <div className="flex items-center mb-4">
            <label className="w-full md:w-[20%] text-sm font-medium text-black">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here"
              className={`w-full rounded-2xl bg-gray-100 border-none py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary ${
                errors.message ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="rounded-2xl">
            <button
              type="submit"
              className="h-[40px] w-full md:w-auto px-10 rounded-2xl bg-[#000] text-[#D9E821] font-normal "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageNotification;
