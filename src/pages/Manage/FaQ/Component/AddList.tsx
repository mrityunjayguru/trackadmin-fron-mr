import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addFaQList } from '../../../../api/FaQList';
import { Navigate, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../common/Breadcrumb';
interface FormData {
  title: string;
  topic: string;
  priority: string;
  status: 'Active' | 'InActive';
  description: string;
  topicId: string; // For storing the selected topic's _id
}

const AddList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: any) => state.FaQPriority.AllFFaQPriorityt);
const navigate=useNavigate()
  // State for the form fields
  const [formData, setFormData] = useState<FormData>({
    title: '',
    topic: '',
    priority: '',
    status: 'Active', // Default value
    description: '',
    topicId: '', // To store selected topic's _id
  });

  // State for validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    topic?: string;
    priority?: string;
    description?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { title?: string; topic?: string; priority?: string; description?: string } = {};
    if (!formData.title) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.topicId) {
      newErrors.topic = 'Topic is required.';
    }
    if (!formData.priority) {
      newErrors.priority = 'Priority is required.';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const payload: any = {
        title: formData.title,
        topicId: formData.topicId,
        priority: formData.priority,
        status: formData.status,
        description: formData.description, // Include description in payload
      };

      await dispatch(addFaQList(payload));
      navigate("/manage/FAQs")
      // Reset the form
      setFormData({
        title: '',
        topic: '',
        priority: '',
        status: 'Active',
        description: '',
        topicId: '',
      });
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
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

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    const selectedRecord = records.find((record: any) => record._id === selectedOption);

    // Update topic and topicId in form data
    setFormData((prevData) => ({
      ...prevData,
      topic: selectedRecord ? selectedRecord.title : '',
      topicId: selectedOption, // Store the _id
    }));
  };

  return (
    <div className="w-full">
    <div className=''><Breadcrumb/></div>

      <div className="flex justify-between gap-1 w-full mt-5 p-4 bg-[#000] setredius text-xl font-semibold text-white">
        <div className="flex gap-1">
          <h1 className="text-[#D9E821]">Add FAQ</h1>
        </div>
      </div>
      <div className="my-5 py-10 px-2 rounded-sm  ">
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
              Topic
            </label>
            <select
              name="topicId"
              value={formData.topicId}
              onChange={handleTopicChange}
              className={`w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white ${
                errors.topic ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select Topic</option>
              {records.map((record: any) => (
                <option key={record._id} value={record._id}>
                  {record.title}
                </option>
              ))}
            </select>
            {errors.topic && (
              <p className="text-red-600 text-xs">{errors.topic}</p>
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
          <div className="mb-2">
            <label className="mb-1 block text-black text-sm font-medium dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && (
              <p className="text-red-600 text-xs">{errors.description}</p>
            )}
          </div>
         
        </div>
        <div className="flex gap-5">
            <button
              onClick={handleSubmit}
              className="h-[40px] py-1  px-5 w-40 rounded-2xl bg-[#000] text-[#D9E821] font-medium "
            >
              Submit
            </button>
            <button
              onClick={()=>navigate("/manage/FAQs")}
              className="h-[40px] py-1  px-5 w-40 rounded-2xl bg-[#000] text-red-500  font-medium "
            >
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
};

export default AddList;
