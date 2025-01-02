import React, { useState, useEffect } from 'react';
import {
  AddVehicleType,
  editvehicle,
  singlevehicle,
  fetchVehicleType,
} from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import Breadcrumb from '../../../../common/Breadcrumb';
import Swal from 'sweetalert2';
interface FormData {
  vehicleTypeName: string;
  file: File | null;
}

const ManageVehicle: React.FC = () => {
  const singlevehicles = useSelector(
    (state: any) => state.vehicletype.singlevehicles,
  );
  const dispatch = useDispatch<AppDispatch>();
const [status,setStatus]=useState<any>(false)
  // State for the form fields
  const [formData, setFormData] = useState<FormData>({
    vehicleTypeName: '',
    file: null,
  });

  // State for the image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImage,setCurrentImage]=useState<string | null>(null);

  // State for validation errors
  const [errors, setErrors] = useState<{
    vehicleTypeName?: string;
    file?: string;
  }>({});

  useEffect(() => {
    if (singlevehicles) {
      setCurrentImage(null)
      setFormData({
        vehicleTypeName: singlevehicles.vehicleTypeName || '',
        file: null,
      });
      setImagePreview(singlevehicles.icons ? `${singlevehicles.icons}` : null);
    }
    setStatus(singlevehicles?.status)
  }, [singlevehicles]);

  const validateForm = () => {
    const newErrors: { vehicleTypeName?: string; file?: string } = {};
    if (!formData.vehicleTypeName) {
      newErrors.vehicleTypeName = 'Vehicle type name is required.';
    }
    if (!formData.file && !imagePreview) {
      newErrors.file = 'File is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (singlevehicles._id) {
        const payload: any = {
          _id: singlevehicles._id,
          vehicleTypeName: formData.vehicleTypeName,
          file: formData.file ? formData.file : singlevehicles.icons,
          status:Boolean(status)
        };
        await dispatch(editvehicle(payload));
        const payload4: any = {};
        dispatch(singlevehicle(payload4));
      await  dispatch(fetchVehicleType(payload4));

      } else {
        const payload: any = {
          vehicleTypeName: formData.vehicleTypeName,
          file: formData.file,
          status:Boolean(status)

        };
      await  dispatch(AddVehicleType(payload));
        const payload1: any = {};
      await  dispatch(fetchVehicleType(payload1));
      }

      setFormData({ vehicleTypeName: '', file: null });
      setImagePreview(null);
      setErrors({});
    }
  };
  const GetMessage = (type: any, messga: string) => {
    Swal.fire({
      icon: type,
      title: messga,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'file' ? files![0] : value,
    }));
  
  };
  
  
  const handlecancle = () => {
    const payload: any = {};
    dispatch(singlevehicle(payload));
  };
  const handlefilechanges=(e:any)=>{
    const { name, value, files } = e.target;

    if (name === 'file' && files && files.length > 0) {
      const file = files[0];
  
      // Check image dimensions
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width > 50 && height > 50) {
          // If image dimensions are greater than 40px, show an alert
          return GetMessage("warning",'Image dimensions are larger than 40x40px');
        } else {
          // Proceed with setting image preview if dimensions are acceptable
          setImagePreview(null);
          setCurrentImage(URL.createObjectURL(file));
          setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'file' ? files![0] : value,
          }));
        }
      };
  
      // Create an object URL for the image to load it and check its dimensions
      img.src = URL.createObjectURL(file);
    }
  }
  // const getVehicleType = async () => {
  //   try {
  //     const payload: any = {};
  //     dispatch(fetchVehicleType(payload)); // Dispatch fetchVehicleType action
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <div className="w-full">
      <h1 className=""><Breadcrumb/></h1>
      <div className=" rounded-2xl flex justify-between gap-1 mt-5 w-full p-4 text-xl font-semibold text-white bg-[#000]">
        <div className="flex gap-1">
          <h1 className="text-[#D9E821]">Vehicle Type Add</h1>
        </div>
      </div>
      <div className="my-5 ">
        <div className="px-4 py-2 grid grid-cols-1 gap-6">
          <div className="mb-2">
            <label className="mb-1 block text-black text-sm font-medium dark:text-white">
              Enter Vehicle Type Name
            </label>
            <input
              type="text"
              name="vehicleTypeName"
              placeholder="Enter Vehicle Type Name"
              value={formData.vehicleTypeName}
              onChange={handleChange}
              className={`w-59 rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                errors.vehicleTypeName ? 'border-red-500' : ''
              }`}
            />
            {errors.vehicleTypeName && (
              <p className="text-red-600 text-xs">{errors.vehicleTypeName}</p>
            )}
          </div>
          <div className="mb-2 flex">
  <label className="mb-1 block text-[#000] text-[14px] font-normal dark:text-white mr-4">
    Status:
  </label>
  <div className=" items-center w-10">
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={status}
        onChange={() => setStatus(!status)} // Toggle the status state
        className="sr-only peer"
      />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#D9E821] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#000] peer-focus:outline-none peer-focus:ring-0"></div>


    </label>
  </div>
</div>

          <div className="mb-2 flex items-center gap-3">
            <label className="flex flex-col items-center cursor-pointer">
              <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                <span className="text-xl">📤</span>
              </div>
              <span className="text-xs text-center">Upload Icon</span>
              <span className="text-xs text-center text-[8px]">
                Size: 40px x 40px
              </span>

              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handlefilechanges}
                className="hidden"
              />
            </label>
            <span className="text-sm">
              {formData.file ? formData.file.name : 'No file chosen'}
            </span>
            {errors.file && (
              <p className="text-red-600 text-xs">{errors.file}</p>
            )}
          </div>

          {imagePreview && (
            <div className="mb-4">
              <h2 className="text-black text-sm font-medium">Image Preview:</h2>
              <img
                src={`${import.meta.env.VITE_APP_Image_Url}${imagePreview}`}
                alt="Icon Preview"
                className="h-10 w-10 rounded-full"
              />
            </div>
          )}
      {currentImage && (
            <div className="mb-4">
              <h2 className="text-black text-sm font-medium">Image Preview:</h2>
              <img
                src={`${currentImage}`}
                alt="Icon Preview"
                className="h-10 w-10 rounded-full"
              />
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-[#D9E821] font-medium "
            >
              Submit
            </button>
            <button
              onClick={handlecancle}
              className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-red-500 font-medium "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default ManageVehicle;
