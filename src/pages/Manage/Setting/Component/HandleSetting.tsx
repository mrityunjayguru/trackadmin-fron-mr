import React, { useState, useEffect } from 'react';
import { createsetting } from '../../../../api/setting';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import Breadcrumb from '../../../../common/Breadcrumb';
interface TextProps {
  text: string;
  data: any;  // Receive data for existing setting
}

function HandleSetting({ text, data }: TextProps) {
  const [status, setStatus] = useState('Active');
  const [file, setFile] = useState<File | null>(null);
  const [hyperlink, setHyperlink] = useState('');
  const [errors, setErrors] = useState<{ file?: string; hyperlink?: string }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);  // Image preview state
  const dispatch = useDispatch<AppDispatch>();

  // Load existing data into the form if available
  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setHyperlink(data.hyperLink);
      setImagePreview(data.image ? `${import.meta.env.VITE_APP_Image_Url}${data.image}` : null);
    }
  }, [data]);

  // Custom validation function
  const validateForm = () => {
    let isValid = true;
    const validationErrors: { file?: string; hyperlink?: string } = {};

    if (!file && !data) {
      validationErrors.file = 'Image is required.';
      isValid = false;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!hyperlink || !urlPattern.test(hyperlink)) {
      validationErrors.hyperlink = 'Please enter a valid URL.';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Handle file change and set preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);  // Set the selected file

      // Generate a preview URL using FileReader
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);  // Set the preview image URL
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle status toggle
  const handleToggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === 'Active' ? 'InActive' : 'Active'));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        status: status,
        image: file?file:data.image,
        hyperLink: hyperlink,
      };

      if (data && data._id) {
        let payload:any={...formData, _id: data._id }
        // Update the existing setting
        dispatch(createsetting(payload));
      } else {
        let payload:any={...formData, _id: data._id }
        // Create a new setting
        dispatch(createsetting(payload));
      }

    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-20 grid-cols-2 my-4">
          <div>
            <div className=" rounded-2xl flex justify-between gap-1 w-full p-4 text-xl font-semibold text-white bg-[#000]">
              <div className="flex gap-1">
                <h1 className="text-[#D9E821]">{text}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 bg-[#fff] py-5 px-5 my-5 sm:grid-cols-1">
              {/* Status Field with Toggle */}
              <div className="mb-2 flex items-center">
                <label className="w-1/3 mb-1 block text-[#000] text-[14px] font-normal dark:text-white mr-4">
                  Activate:
                </label>
                <div className="w-full items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={status === 'Active'}
                      onChange={handleToggleStatus}
                      className="sr-only peer"
                    />
                   <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#D9E821] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#000] peer-focus:outline-none peer-focus:ring-0"></div>

                  </label>
                </div>
              </div>

              {/* Upload Image Field */}
              <div className="mb-2 flex w-full">
                <label className="flex-end w-1/3 mb-1 items-center block text-[#000] text-[14px] font-normal dark:text-white">
                  Upload Image
                </label>
                <input
                  type="file"
                  placeholder="Browse Image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex justify-center items-center w-full rounded-2xl bginput border-none border-stroke bg-transparent py-3 px-5 text-[#000] text-[14px] font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                 
                />
                {errors.file && <p className="text-red-500">{errors.file}</p>}
              </div>

              {/* Hyperlink Field */}
              <div className="mb-2 flex">
                <label className="items-center w-1/3 mb-1 block text-[#000] text-[14px] font-normal dark:text-white">
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
                {errors.hyperlink && <p className="text-red-500">{errors.hyperlink}</p>}
              </div>

              <div className="mb-2 flex items-center justify-center">
                <button
                  type="submit"
                  className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-[#D9E821] font-normal "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Image Preview Section */}
          <div className="w-60 h-90">
            {imagePreview ? (
              <img
                src={imagePreview}  // Display new image if file is selected, or previously saved image if exists
                alt="Image Preview"
                className="rounded-lg w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://s3-alpha-sig.figma.com/img/f3ce/ef7b/be1e9c4b5d425514d10b59630d988ad0?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Py19E3yLFmmaWYMonGU~t7KEFw6TTKd2Hmo39kIMCWtL3ve-~T7Paq0soeRTMhJduT1EdRHooXV1upDKwNJE-1O5EQkrlQQT8H6oDx8T-uGLTy6Xty-kOytTkmFB~qy~IUs2-1AaSfa2-37MXCPlCMonusnE9HKLiEoB5TFwoQRbFDNRyDAE9CwkH~F9w02OSrLvE8DmrSoPMDcriwh~gx71F7mh8Uf0LfGGfR8xOeVsSwHPOPRKIVJgQ3PLR8aFoT1vIhUpqBmEtutS2dbo1JqLpHu3iva8FDinWnaTJ1kD9tbta2NLsrY2Ywml1TYisRqgdf8kx7lpCLCbRzLMdg__"
                alt="Default Image"
                className="rounded-lg w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default HandleSetting;
