import { useState, useEffect } from "react";
import { AddNewAdmin, updateAdmin } from "../../../api/Admin"; // Assume UpdateAdmin is defined
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const ViewAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const singleadmin = useSelector((state: any) => state.adminRole.singleAdmin);

  // Initial state for the form fields
  const initialFormData = {
    fullName: '',
    phoneNumber: '',
    status: 'Active',
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
  });

  // Populate form data with existing admin data when in edit mode
  useEffect(() => {
    if (singleadmin) {
      setFormData({
        fullName: singleadmin.Name || '',
        phoneNumber: singleadmin.phone || '',
        status: singleadmin.status ? 'Active' : 'Inactive',
        permissions: singleadmin.permissions || {
          addSubscribers: false,
          viewSubscribers: false,
          editSubscribers: false,
        },
      });
    }
  }, [singleadmin]);

  // Validation function
  const validateForm = () => {
    const { fullName, phoneNumber } = formData;
    let valid = true;
    const newErrors = { fullName: '', phoneNumber: '' };

    // Check if each field meets the requirements
    if (fullName.length < 4) {
      newErrors.fullName = 'Full Name must be at least 4 characters long';
      valid = false;
    }
    if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const resetFormData = () => {
    setFormData(initialFormData); // Reset form data to initial state
    setErrors({ fullName: '', phoneNumber: '' }); // Reset errors
  };
const navigate=useNavigate()
  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate('/Edit-Admin');
    return
    if (validateForm()) {
      const payload: any = {
        Name: formData.fullName,
        phone: formData.phoneNumber,
        status: formData.status === "Active" ? true : false,
        permissions: formData.permissions,
      };

      if (singleadmin) {
        // If editing, update the admin
        dispatch(updateAdmin({ ...payload, _id: singleadmin._id }));
      } else {
        // If adding, create a new admin
        const uniqueNumber = [...new Set(Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)))].join('');
        payload.uniqueID = `Admin${uniqueNumber}`;
        dispatch(AddNewAdmin(payload));
      }

      resetFormData(); // Reset form after submission
    }
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
  };

  const handlePermissionChange = (e: any) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="w-full">
      <div className="rounded-xl py-2 w-full flex items-center gap-28 px-3">
        <div>
          <h1 className="text-[#000] font-semibold text-xl">
            {singleadmin ? "Edit Admin Role" : "Add Admin Role"}
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
                disabled
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
                disabled
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
                disabled
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div className="px-4 py-2 grid grid-cols-1 gap-6 sm:grid-cols-1">
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">Permissions</label>
              <div className="flex flex-col">
                <label className="flex items-center text-black text-sm font-medium outline-none cursor-pointer">
                  <input
                    type="checkbox"
                    name="addSubscribers"
                    checked={formData.permissions.addSubscribers}
                    onChange={handlePermissionChange}
                    className="mr-2 cursor-pointer"
                    disabled
                  />
                  Add Subscribers
                </label>
                <label className="cursor-pointer flex items-center text-black text-sm font-medium outline-none">
                  <input
                    type="checkbox"
                    name="viewSubscribers"
                    checked={formData.permissions.viewSubscribers}
                    onChange={handlePermissionChange}
                    className="mr-2 cursor-pointer"
                    disabled
                  />
                  View Subscribers
                </label>
                <label className="cursor-pointer flex items-center text-black text-sm font-medium outline-none">
                  <input
                    type="checkbox"
                    name="editSubscribers"
                    checked={formData.permissions.editSubscribers}
                    onChange={handlePermissionChange}
                    className="mr-2 cursor-pointer"
                    disabled
                  />
                  Edit Subscribers
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-2">
              <button type="submit" className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-[#D9E821] font-medium ">
                {singleadmin ? "Edit Role" : "Add Role"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewAdmin;
