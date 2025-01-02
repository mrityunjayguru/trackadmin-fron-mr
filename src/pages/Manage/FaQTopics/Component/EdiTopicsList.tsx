import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { editFaQPriorityList } from '../../../../api/FaQPriorityList';
import Breadcrumb from '../../../../common/Breadcrumb';

interface FormData {
  title: string;
  priority: string;
  status: 'Active' | 'InActive';
}

const EdiTopicsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const singlfawlist = useSelector((state: any) => state.FaQPriority.singleFFaQPriorityt);
  // State for the form fields without 'topic'
  const [formData, setFormData] = useState<FormData>({
    title: '',
    priority: '',
    status: 'Active', // Default value
  });

  // State for validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    priority?: string;
  }>({});

  useEffect(() => {
    if (singlfawlist) {
      // Populate the form with existing data if it exists
      setFormData({
        title: singlfawlist.title,
        priority: singlfawlist.priority,
        status: singlfawlist.status,
      });
    }
  }, [singlfawlist]);

  const validateForm = () => {
    const newErrors: { title?: string; priority?: string } = {};
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

      if (singlfawlist) {
        // If record exists, update it
        await dispatch(editFaQPriorityList({ ...payload, _id: singlfawlist._id }));
      } else {
        // If no record, add it
        await dispatch(editFaQPriorityList(payload));
      }
      Navigate("/manage/FAQ-Topics")
      // Reset the form
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <>
    <div className=''><Breadcrumb/></div>

<div className="w-full">
  <div className="flex justify-between gap-1 mt-5 w-full p-4 bg-[#000] setredius text-xl font-semibold text-white">
    <div className="flex gap-1">
      <h1 className="text-[#D9E821] py-2 px-2">Edit List</h1>
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
          className="h-[40px] py-1 px-5 w-40 rounded-2xl bg-[#000] text-[#D9E821] font-medium hover:bg-opacity-90"
        >
          Submit
        </button>
        <button
              onClick={()=>Navigate("/manage/FAQ-Topics")}
              className="h-[40px] py-1  px-5 w-40 rounded-2xl bg-[#000] text-red-500  font-medium hover:bg-opacity-90"
            >
              Cancel
            </button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default EdiTopicsList;
