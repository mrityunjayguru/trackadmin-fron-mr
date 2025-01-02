import React, { useEffect, useState } from 'react';
import { createSplash, updatesplash, getSplash, manageSinglesplash } from '../../../../api/Splash'; // Ensure to import updateSplash
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import Breadcrumb from '../../../../common/Breadcrumb';
function ManageSplash() {
  const [status, setStatus] = useState('Active'); // State for status
  const [file, setFile] = useState<File | null>(null); // State for uploaded file
  const [hyperlink, setHyperlink] = useState(''); // State for hyperlink
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
const [selectPreivew,setSelectPreivew]=useState<any>(null)
  const singlesplash = useSelector((state: any) => state.splash.singlesplash);
  const data = useSelector((state: any) => state.splash.Allsplash); // Use RootState for global state type

  useEffect(()=>{
if(data?.length>0){
  setStatus(data[0].status);
  setHyperlink(data[0].hyperLink);
  setImagePreview(data[0].image); // Assuming the image URL is stored here
}
  },[data])
  const dispatch = useDispatch<AppDispatch>();
  const getSplashs = async () => {
    const payload: any = {};
    await dispatch(getSplash(payload));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // Set the selected file
      setImagePreview(null)
      // setImagePreview(URL.createObjectURL(selectedFile)); // Create a preview URL
      setSelectPreivew(URL.createObjectURL(selectedFile))
    }
  };

  const createrecord =async () => {
    if (!hyperlink) return; // Prevent submission if hyperlink is not set

    const formData = new FormData();
    formData.append('status', status);
    if (file) {
      formData.append('image', file);
    }
    formData.append('hyperLink', hyperlink);
    if(data[0]?._id){
      formData.append('_id', data[0]?._id);
    }

    if (data[0]?._id) {
      // If singlesplash exists, call the update API
      let payload:any=formData
      await dispatch(updatesplash(payload));
      await getSplashs()
      setSelectPreivew(null)
    } else {
      let payload:any=formData
      // If it doesn't exist, call the create API
    await  dispatch(createSplash(payload));
    await   getSplashs()
    setSelectPreivew(null)
    // await  getSplashs()
    }
    // Reset the form after submission
    // resetForm();
  };
useEffect(()=>{
     getSplashs()
},[])
  return (
    <>
      <div className=""><Breadcrumb/></div>
      <div className="grid gap-20 grid-cols-2 my-4">
        <div>
          <div className=" rounded-2xl flex justify-between gap-1 w-full p-4 text-xl font-semibold text-white bg-[#000] ">
            <div className="flex gap-1">
              <h1 className="text-[#D9E821]">Splash Screen AD</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 bg-[#fff] py-5 px-5 my-5 sm:grid-cols-1">
            {/* Status Field with Radio Buttons */}
            <div className="mb-2 flex items-center">
              <label className="w-1/3 mb-1 block text-[#000] text-[14px] font-normal dark:text-white mr-4">
                Activate:
              </label>
              <div className="w-full items-center">
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={status === 'Active'}
      onChange={() =>
        setStatus(status === 'Active' ? 'InActive' : 'Active')
      }
      className="sr-only peer"
    />
    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#D9E821] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#000] peer-focus:outline-none peer-focus:ring-0"></div>
  </label>
</div>

            </div>

            {/* Custom Upload Image Field */}
            <div className="mb-2 flex w-full">
      <label className="flex-end w-1/3 mb-1 block text-[#000] text-[14px] font-normal dark:text-white">
        Upload Image
      </label>
      <div className="flex items-center flex-col w-full handleinputfile">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex justify-center items-center w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-[#000] text-[14px] font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required
        />
        {/* <span className="text-sm text-gray-600 mt-1">
          {file ? file.name : "No file chosen"}
        </span> */}
      </div>
    </div>

            {/* Hyperlink Field */}
            <div className="mb-2 flex">
              <label className="w-1/3 items-center mb-1 block text-[#000] text-[14px] font-normal dark:text-white">
                Hyperlink
              </label>
              <input
                type="url"
                value={hyperlink}
                onChange={(e) => setHyperlink(e.target.value)}
                placeholder="Enter hyperlink"
                className="w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-[#000] text-[14px] font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="mb-2 gap-2 flex items-center justify-center">
              <button
                type="button"
                onClick={createrecord}
                className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-[#D9E821] font-normal "
              >
                Submit
              </button>
              {/* <button
                type="button"
                onClick={handleCancel}
                className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-red-500  font-normal "
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>

        {/* Image Preview */}
        <div className="w-60 h-90">
          {imagePreview ? (
            <img
              src={`${import.meta.env.VITE_APP_Image_Url}${imagePreview}`}
              alt="Selected Preview"
              className="rounded-lg w-full h-full object-cover"
            />
          ) : (
            null
          )}

          {selectPreivew?(  <img
              src={`${selectPreivew}`}
              alt="Selected Preview"
              className="rounded-lg w-full h-full object-cover"
            />):(null)}
        </div>
      </div>
    </>
  );
}

export default ManageSplash;
