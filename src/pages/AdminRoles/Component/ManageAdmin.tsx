import { useEffect, useState } from "react";
import { AddNewAdmin } from "../../../api/Admin";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { Permission } from "../../../layout/Permision";
import { useNavigate } from "react-router";
import Breadcrumb from "../../../common/Breadcrumb";
const ManageAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  
  // Initial state for the form fields
  const initialFormData = {
    fullName: '',
    phoneNumber: '',
    status: 'Active',
    newPassword: '',
    profile:null,
    confirmPassword: '',
    permissions: {
      addSubscribers: false,
      viewSubscribers: false,
      editSubscribers: false,
    },
  };

  // State for the form fields
  const [formData, setFormData] = useState(initialFormData);

  // State for validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    newPassword: '',
    confirmPassword: '',
    profile:"",
  });

  // Validation function
  const validateForm = () => {
    const { fullName, phoneNumber, newPassword, confirmPassword } = formData;
    let valid = true;
    const newErrors = { fullName: '', phoneNumber: '', newPassword: '', confirmPassword: '',profile:""};

    // Check if each field meets the requirements
    if (fullName.length < 4) {
      newErrors.fullName = 'Full Name must be at least 4 characters long';
      valid = false;
    }
    if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
      valid = false;
    }
    if (newPassword.length < 4) {
      newErrors.newPassword = 'Password must be at least 4 characters long';
      valid = false;
    }
    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
if(profile=='' || null){
  newErrors.profile = 'Profile is required';

}
    setErrors(newErrors);
    return valid;
  };

  const resetFormData = () => {
    setFormData(initialFormData); // Reset form data to initial state
    setErrors({ fullName: '', phoneNumber: '', newPassword: '', confirmPassword: '',profile:'' }); // Reset errors
  };
  const [permissions, setPermissions] = useState<any>({});
  const [preivew,setPreview]=useState<any>(null)
  const [profile,setprofile]=useState<any>(null)
  const handleSubmit = async(e: any) => {

    e.preventDefault();
    if (validateForm()) {
      const uniqueNumber = [...new Set(Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)))].join('');
      const payload: any = {
        username: formData.fullName,
        phone: formData.phoneNumber,
        password: formData.newPassword,
        role: "Admin",
        status: formData.status === "Active" ? true : false,
        uniqueID: `Admin${uniqueNumber}`,
        permissions:permissions,
        profile,
      };
    let responce=await  dispatch(AddNewAdmin(payload));
    if(responce.payload==true){
      navigate("/Admin-Roles")
    }
      // resetFormData(); // Reset form after submission
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setprofile(file)
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message for the respective field if input is valid
    if (name === "fullName" && value.length >= 4) {
      setErrors((prevErrors) => ({ ...prevErrors, fullName: '' }));
    }
    if (name === "phoneNumber" && value.length === 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
    }
    if (name === "newPassword" && value.length >= 4) {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: '' }));
    }
    if (name === "confirmPassword" && value === formData.newPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
    }
  };

  const handleinputchange = (e: any) => {
    const { name, checked } = e.target;
    let split: string[] = name.split("-");
    let updatedPermissions = { ...permissions };
    if (checked) {
      if (!updatedPermissions[split[0]]) {
        updatedPermissions[split[0]] = {}; 
      }
      updatedPermissions[split[0]][split[1]] = true; 
    } else {
      if (updatedPermissions[split[0]]) {
        updatedPermissions[split[0]][split[1]] = false; 
      }
    }
    setPermissions(updatedPermissions);
  
  };
const navigate=useNavigate()
useEffect(()=>{
if(loginUser.role!="SuperAdmin"){
  navigate("/")
}
},[])
  return (
    <div className="w-full">
      <div className="rounded-xl py-2 w-full flex items-center gap-28 px-3">
        <div>
          <h1 className="text-[#000] font-semibold text-xl">
<Breadcrumb/>
          </h1>
        </div>
      </div>

      <div className="my-5 ">
        <form className="my-10" onSubmit={handleSubmit}>
          <div className="px-4 py-2 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Full Name Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.fullName && <p className="text-red-500 text-[12px]">{errors.fullName}</p>}
            </div>

            {/* Phone Number Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Mobile"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.phoneNumber && <p className="text-red-500 text-[12px]">{errors.phoneNumber}</p>}
            </div>

            {/* Status Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option> {/* Fixed typo from "InaAtive" */}
              </select>
            </div>

            {/* New Password Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="**********"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.newPassword && <p className="text-red-500 text-[12px]">{errors.newPassword}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="**********"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.confirmPassword && <p className="text-red-500 text-[12px]">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">Upload Profile</label>
              <input
                type="file"
                name="profile"
                placeholder="**********"
           
                onChange={handleFileChange}
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.profile && <p className="text-red-500 text-[12px]">{errors.profile}</p>}
            </div>
          </div>
     <div className="">
      <div>
        <h2 className="text-black text-sm font-semibold px-4 ">Permission</h2>
      </div>
      <div className="px-4 py-2 grid grid-cols-4 gap-6 sm:grid-cols-5">
        {Permission.map((val:any, index:number) => {
          return (
            <div key={index}>
              <h1 className="py-2 text-black text-sm font-medium">{val.name}</h1>
              {val.Permission.map((perm:any, subIndex:number) => {
                return (
                  <div className=" flex w-full py-1" key={subIndex}>
                    <label className="mb-1 block w-1/2  text-sm font-medium dark:text-white">
                      {perm}
                    </label>
                    <input
                      type="checkbox"
                      name={`${val.name}-${perm}`} // unique name based on permission type
                      id={`${val.name}-${perm}`} // add unique ID for accessibility
                      className="w-1/2  rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                   onChange={handleinputchange}
                   />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      </div>
      <div className="my-5 flex gap-5 mx-3">
              {/* <label className="mb-1 block text-black text-sm font-medium dark:text-white">Confirm Password</label> */}
              <button
                type="submit"
                className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-[#D9E821] font-medium "
              >
                Submit
              </button>
              <button onClick={()=>navigate("/Admin-Roles")}
                type="button"
                className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-red-500 font-medium "
              >
                Cancel
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ManageAdmin;
