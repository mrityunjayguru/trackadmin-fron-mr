import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { editFaQList } from '../../../../api/FaQList';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../common/Breadcrumb';
interface FormData {
  title: string;
  topic: string;
  priority: string;
  description: string;
  status: 'Active' | 'InActive';
}

const EditFaQlist: React.FC = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const singlfawlist = useSelector((state: any) => state.FaqList.singleFaqList);
  const topics = useSelector((state: any) => state.FaQPriority.AllFFaQPriorityt); // Assuming topics come from a Redux state
console.log(singlfawlist,"topicstopics")
  // State for the form fields
  const [formData, setFormData] = useState<FormData>({
    title: '',
    topic: '',
    priority: '',
    description: '',
    status: 'Active', // Default value
  });

  // State for validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    topic?: string;
    priority?: string;
    description?: string;
  }>({});

  // Prepopulate form data when the selected FAQ is available
  useEffect(() => {
    if (singlfawlist) {
      setFormData({
        title: singlfawlist.title,
        topic: singlfawlist.topic?._id || "", // Assuming the topic is an object with an _id
        priority: singlfawlist.priority,
        description: singlfawlist.description,
        status: singlfawlist.status,
      });
    }
  }, [singlfawlist]);

  const validateForm = () => {
    const newErrors: { title?: string; topic?: string; priority?: string; description?: string } = {};
    if (!formData.title) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.topic) {
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
        topicId: formData.topic,      // _id of the selected topic
        priority: formData.priority,
        description: formData.description,
        status: formData.status,
      };

      if (singlfawlist) {
        // If record exists, update it
        await dispatch(editFaQList({ ...payload, _id: singlfawlist._id }));
        navigate("/manage/FAQs")
      }

      // Reset errors (no form reset as it's an edit form)
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  return (
 <>
    <div className=''><Breadcrumb/></div>

<div className="w-full">
  <div className="flex justify-between gap-1 mt-5 w-full p-4 bg-[#000] setredius text-xl font-semibold text-white">
    <div className="flex gap-1">
      <h1 className="text-[#D9E821]">Edit FAQ </h1>
    </div>
  </div>
  <div className="my-5 py-10 px-2 ">
    <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Title Input */}
      <div className="mb-2">
        <label className="mb-1 block text-black text-sm font-medium dark:text-white">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full rounded-2xl bginput border-none bg-transparent py-3 px-5 text-black text-sm font-medium ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && <p className="text-red-600 text-xs">{errors.title}</p>}
      </div>

      {/* Topic Dropdown */}
      <div className="mb-2">
        <label className="mb-1 block text-black text-sm font-medium dark:text-white">Topic</label>
        <select
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className={`w-full rounded-2xl bginput border-none bg-transparent py-3 px-5 text-black text-sm font-medium ${
            errors.topic ? 'border-red-500' : ''
          }`}
        >
          <option value="">Select Topic</option>
          {topics && topics.map((topic: any) => (
            <option key={topic._id} value={topic._id}>
              {topic.title}
            </option>
          ))}
        </select>
        {errors.topic && <p className="text-red-600 text-xs">{errors.topic}</p>}
      </div>

      {/* Priority Input */}
      <div className="mb-2">
        <label className="mb-1 block text-black text-sm font-medium dark:text-white">Priority</label>
        <input
          type="Number"
          name="priority"
          placeholder="Enter Priority"
          value={formData.priority}
          onChange={handleChange}
          className={`w-full rounded-2xl bginput border-none bg-transparent py-3 px-5 text-black text-sm font-medium ${
            errors.priority ? 'border-red-500' : ''
          }`}
        />
        {errors.priority && <p className="text-red-600 text-xs">{errors.priority}</p>}
      </div>

      {/* Description Input */}
  

      {/* Status Select */}
      <div className="mb-2">
        <label className="mb-1 block text-black text-sm font-medium dark:text-white">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-2xl bginput border-none bg-transparent py-3 px-5 text-black text-sm font-medium"
        >
          <option value="Active">Active</option>
          <option value="InActive">InActive</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="mb-1 block text-black text-sm font-medium dark:text-white">Description</label>
        <textarea
          name="description"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
          className={`h-20 w-full rounded-2xl bginput border-none bg-transparent py-3 px-5 text-black text-sm font-medium ${
            errors.description ? 'border-red-500' : ''
          }`}
        />
        {errors.description && <p className="text-red-600 text-xs">{errors.description}</p>}
      </div>
      {/* Submit Button */}
    
    </div>
    <div className="px-4 flex gap-5">
        <button
          onClick={handleSubmit}
          className="h-[40px] py-1 px-5 w-40 rounded-2xl bg-[#000] text-[#D9E821] font-medium "
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
 </>
  );
};

export default EditFaQlist;
