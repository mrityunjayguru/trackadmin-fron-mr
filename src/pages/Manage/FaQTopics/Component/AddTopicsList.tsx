import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addFaQPriorityList } from '../../../../api/FaQPriorityList';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../common/Breadcrumb';

interface FormData {
  title: string;
  priority: string;
  status: 'Active' | 'InActive';
}

const AddTopicsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
const navigate=useNavigate()
  // State for the form fields
  const [formData, setFormData] = useState<FormData>({
    title: '',
    priority: '',
    status: 'Active', // Default value
  });

  // State for validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    topic?: string;
    priority?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { title?: string; topic?: string; priority?: string } = {};
    if (!formData.title) {
      newErrors.title = 'Title is required.';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const Navigate=useNavigate()
  const handleSubmit = async () => {
    if (validateForm()) {
      const payload: any = {
        title: formData.title,
        priority: formData.priority,
        status: formData.status,
      };

      await dispatch(addFaQPriorityList(payload));
Navigate("/manage/FAQ-Topics")
      // Reset the form
      setFormData({
        title: '',
        priority: '',
        status: 'Active',
      });
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the current input and clear the error if valid
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined, // Clear error for this field
      }));
    }
  };

  return (
    <div className="w-full">
        <div className=''><Breadcrumb/></div>

      {/* <h1 className="text-black text-lg font-bold">Add Vehicle Type</h1> */}
      <div className="flex justify-between gap-1 w-full mt-5 p-4 bg-[#000] setredius text-xl font-semibold text-white">
        <div className="flex gap-1">
          <h1 className="text-[#D9E821] py-2 px-2">Add Topic</h1>
        </div>
      </div>
      <div className="my-5 py-10 px-2 ">
        <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-2">
            <label className="mb-1 block text-black text-sm font-medium dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white ${
                errors.title ? 'border-red-500' : ''
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-xs">{errors.title}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="mb-1 block text-black text-sm font-medium dark:text-white">
              Priority
            </label>
            <input
              type="Number"
              name="priority"
              placeholder="Enter Priority"
              value={formData.priority}
              onChange={handleChange}
              className={`w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white ${
                errors.priority ? 'border-red-500' : ''
              }`}
            />
            {errors.priority && (
              <p className="text-red-600 text-xs">{errors.priority}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="mb-1 block text-black text-sm font-medium dark:text-white">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>

          <div className="flex justify-center items-center mt-1 gap-5">
            <button
              onClick={handleSubmit}
              className="h-[40px] py-1  px-5 w-40 rounded-2xl bg-[#000] text-[#D9E821] font-medium "
            >
              Submit
            </button>
            <button
              onClick={()=>navigate("/manage/FAQ-Topics")}
              className="h-[40px] py-1  px-5 w-40 rounded-2xl bg-[#000] text-red-500  font-medium "
            >
           Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTopicsList;
