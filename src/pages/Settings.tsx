import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createmanageSetting,
  getmanageSetting,
  updatemanageSetting,
} from '../api/managesetting';
import { AppDispatch } from '../store/store';

// Define the shape of the errors object
interface Errors {
  mobileSupport?: string;
  supportEmail?: string;
  emailTitle?: string;
  catalogueLink?: string;
  websiteLink?: string;
  websiteLabel?: string;
  privacyLink?: string;
  logo?: string;
}

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector(
    (state: any) => state.managesetting.AllmanageSettingt,
  ); // Fetch records from the Redux store

  const [mobileSupport, setMobileSupport] = useState<string>('');
  const [supportEmail, setSupportEmail] = useState<string>('');
  const [emailTitle, setEmailTitle] = useState<string>('');
  const [catalogueLink, setCatalogueLink] = useState<string>('');
  const [websiteLink, setWebsiteLink] = useState<string>('');
  const [websiteLabel, setWebsiteLabel] = useState<string>('');
  const [privacyLink, setPrivacyLink] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [local,setlocal]=useState("")

  // Fetch existing settings data
  const getData = () => {
    try {
      const payload: any = {};
      dispatch(getmanageSetting(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);
const [dbpreivew,setdbpreivew]=useState("")
  // Set form fields from existing data if records are available
  useEffect(() => {
    if (records && records.length > 0) {
      const existingRecord = records[0];
      setMobileSupport(existingRecord.mobileSupport || '');
      setSupportEmail(existingRecord.supportEmail || '');
      setEmailTitle(existingRecord.emailTitle || '');
      setCatalogueLink(existingRecord.catalogueLink || '');
      setWebsiteLink(existingRecord.websiteLink || '');
      setWebsiteLabel(existingRecord.websiteLabel || '');
      setPrivacyLink(existingRecord.privacyLink || '');
      setLogo(existingRecord.logo || '')
      setPreviewUrl(existingRecord.logo || '')
      setdbpreivew(existingRecord.applogo || '')
    }
  }, [records]);

  // Handle file upload and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setlocal('')
        setPreviewUrl(null)
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLogo(file);
      const preview = URL.createObjectURL(file);
      setlocal(preview);
    }
  };
  const [applogo,setapplogo]=useState(null)
  const [applogopreview,setapplogoPreivew]=useState(null)
const handleFileChange2=(e: React.ChangeEvent<HTMLInputElement>)=>{
  setapplogo(null)
  if (e.target.files && e.target.files.length > 0) {
    const file:any = e.target.files[0];
    setapplogo(file);
    const preview:any = URL.createObjectURL(file);
    setapplogoPreivew(preview);
  }
}
  // Form validation logic
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    const mobilePattern = /^[0-9]{10}$/; // Mobile number should be 10 digits
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern

    if (!mobilePattern.test(mobileSupport))
      newErrors.mobileSupport = 'Mobile number must be 10 digits.';

    if (!emailPattern.test(supportEmail))
      newErrors.supportEmail = 'Invalid email format.';
    if (!emailPattern)
      newErrors.emailTitle = 'Email Title is required.';
    if (!catalogueLink) newErrors.catalogueLink = 'Catalogue link is required.';
    if (!websiteLink) newErrors.websiteLink = 'Website link is required.';
    if (!websiteLabel) newErrors.websiteLabel = 'Website label is required.';
    if (!privacyLink) newErrors.privacyLink = 'Privacy link is required.';
    if (!logo) newErrors.logo = 'Logo is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('mobileSupport', mobileSupport);
    formData.append('supportEmail', supportEmail);
    formData.append('emailTitle', emailTitle);
    formData.append('catalogueLink', catalogueLink);
    formData.append('websiteLink', websiteLink);
    formData.append('websiteLabel', websiteLabel);
    formData.append('privacyLink', privacyLink);
    if (logo) formData.append('logo', logo);
    if (applogo) formData.append('applogo', applogo);

    

    try {
      let payload: any;
      if (records.length > 0) {
        const _id = records[0]._id;
        formData.append('_id', _id);
        payload = formData;
        await dispatch(updatemanageSetting(payload));
      } else {
        await dispatch(createmanageSetting(payload));
      }
      await getData();
      setlocal("")
      setapplogoPreivew(null)
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };
const handlemanageimage=()=>{
  if( records && records.length>0){
    const existingRecord = records[0];
    setPreviewUrl(existingRecord.logo || '')
    setLogo(existingRecord.logo || '')
  }
  setlocal("")
}
  return (
    <div className="p-6 bg-white rounded-lg ">
      <h2 className="text-xl text-[#000] font-bold mb-4">Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/** Render input field and error message helper */}
        {[
          {
            label: 'Support Mobile',
            type: 'Number',
            value: mobileSupport,
            setter: setMobileSupport,
            errorKey: 'mobileSupport',
            placeholder: 'Enter mobile number',
            index:1,
          },
          {
            label: 'Support Email',
            type: 'email',
            value: supportEmail,
            setter: setSupportEmail,
            errorKey: 'supportEmail',
            placeholder: 'Enter support email',
         

          },
          {
            label: 'Email Title',
            type: 'text',
            value: emailTitle,
            setter: setEmailTitle,
            errorKey: 'Email Title',
            placeholder: 'Email Title',
       

          },
          {
            label: 'Catalogue Link',
            type: 'url',
            value: catalogueLink,
            setter: setCatalogueLink,
            errorKey: 'catalogueLink',
            placeholder: 'Paste catalogue link',
            title:"App Profile Page"
          },
          {
            label: 'Website Link',
            type: 'url',
            value: websiteLink,
            setter: setWebsiteLink,
            errorKey: 'websiteLink',
            placeholder: 'Paste website link',
            title:"App Profile Page"

          },
          {
            label: 'Website Label',
            type: 'text',
            value: websiteLabel,
            setter: setWebsiteLabel,
            errorKey: 'websiteLabel',
            placeholder: 'Enter website label',
            style:"text-xl ksljdskdhsk",
            title:"App Profile Page"

          },
          {
            label: 'Privacy Link',
            type: 'url',
            value: privacyLink,
            setter: setPrivacyLink,
            errorKey: 'privacyLink',
            placeholder: 'Paste privacy link',
            title:"App Profile Page"

          },
        ].map(({ label, type, value, setter, errorKey, placeholder,title },i) => (
          <div key={label} className={`flex flex-row items-center  mb-4  ${i==0 || i==2 || i==6?'pb-[30px]':''}`}>
            <label className="text-base font-medium text-[#000] w-[12%]">
              {label} <br />
              <span className='text-sm text-[#949495]'>{title}</span>
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className={`rounded-2xl bginput border-none py-3 px-5 w-[410px] text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary ${
                errors[errorKey as keyof Errors] ? 'border-red-500' : ''
              }`}
              placeholder={placeholder}
              required
            />
          
            {errors[errorKey as keyof Errors] && (
              <span className="text-red-500 text-xs">
                {errors[errorKey as keyof Errors]}
              </span>
            )}
          </div>
        ))}

        {/* Logo Upload */}
        <div className="">
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-[#000]">App Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`text-gray-500 border-none rounded-2xl py-3 px-5 ${
                errors.logo ? 'border-red-500' : ''
              }`}
            />
            {errors.logo && (
              <span className="text-red-500 text-xs">{errors.logo}</span>
            )}
          </div>

          {/* Logo Preview */}

          {local && (
            <div className="mb-4 ">
              <div
                className="relative text-2xl right-0 cursor-pointer"
                onClick={handlemanageimage}
              >
                *
              </div>
              <img
                src={`${local}`}
                alt="Logo Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          {previewUrl && (
            <div className="mb-4">
              <img
                src={`${import.meta.env.VITE_APP_Image_Url}${previewUrl}`}
                alt="Logo Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-[#000]">App Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange2}
              className={`text-gray-500 border-none rounded-2xl py-3 px-5 ${
                errors.logo ? 'border-red-500' : ''
              }`}
            />
            {errors.logo && (
              <span className="text-red-500 text-xs">{errors.logo}</span>
            )}
          </div>
          {dbpreivew && (
            <div className="mb-4">
              <img
                src={`${import.meta.env.VITE_APP_Image_Url}${dbpreivew}`}
                alt="Logo Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          {applogopreview && (
            <div className="mb-4">
              <img
                src={`${applogopreview}`}
                alt="Logo Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>
        {/* Submit Button */}
        <div className="rounded-2xl">
          <button
            type="submit"
            className="h-[40px] px-10 rounded-2xl bg-[#000] text-[#D9E821] font-normal "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
