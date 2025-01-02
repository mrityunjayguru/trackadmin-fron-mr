import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePickerOne from '../../../../components/Forms/DatePicker/DatePickerOne';

const AddUser = () => {
  const formik = useFormik({
    initialValues: {
      uniqueUserId: '',
      password: '',
      companyName: '',
      phoneNumber: '',
      email: '',
      address: '',
      state: '',
      city: '',
      pinCode: '',
      companyId: '',
      gender: '',
      dob: '',
      file: null,
    },
    validationSchema: Yup.object({
      uniqueUserId: Yup.string().required('Unique User ID is required'),
      password: Yup.string().required('Password is required'),
      companyName: Yup.string().required('Company Name/User Name is required'),
      phoneNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
      address: Yup.string().required('Address is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      pinCode: Yup.string().required('Pin Code is required'),
      companyId: Yup.string().required('Company ID is required'),
      gender: Yup.string().when('type', {
        is: false,
        then: Yup.string().required('Gender is required'),
      }),
      dob: Yup.date().when('type', {
        is: false,
        then: Yup.date().required('Date of Birth is required'),
      }),
      file: Yup.mixed().required('File is required'),
    }),
    onSubmit: (values) => {
      console.log('Form data', values);
      // Add your submit logic here
    },
  });

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="">
          {/* Contact Form */}
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              {/* Two-column grid for Unique User ID and Password */}
              <div className="px-4 py-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {/* Unique User ID Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    Unique User ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter unique user ID"
                    {...formik.getFieldProps('uniqueUserId')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.uniqueUserId && formik.errors.uniqueUserId ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.uniqueUserId && formik.errors.uniqueUserId ? (
                    <div className="text-red-500 text-sm">{formik.errors.uniqueUserId}</div>
                  ) : null}
                </div>

                {/* Password Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...formik.getFieldProps('password')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>

              {/* Three-column grid for remaining fields */}
              <div className="px-4 py-2 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {/* Company Name / User Name Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    {type ? 'Company Name' : 'User Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={type ? 'Enter company name' : 'Enter user name'}
                    {...formik.getFieldProps('companyName')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.companyName && formik.errors.companyName ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.companyName && formik.errors.companyName ? (
                    <div className="text-red-500 text-sm">{formik.errors.companyName}</div>
                  ) : null}
                </div>

                {/* Phone Number Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    {...formik.getFieldProps('phoneNumber')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                  ) : null}
                </div>

                {/* Email Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    {...formik.getFieldProps('email')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  ) : null}
                </div>

                {/* Address Field */}
                <div className="mb-2 col-span-3">
                  <label className="mb-1 block text-black dark:text-white">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter street address"
                    {...formik.getFieldProps('address')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.address && formik.errors.address ? 'border-red-500' : ''
                    }`}
                  ></textarea>
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-500 text-sm">{formik.errors.address}</div>
                  ) : null}
                </div>

                {/* Country Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    Country
                  </label>
                  <input
                    type="text"
                    defaultValue="India"
                    className="w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary"
                    readOnly
                  />
                </div>

                {/* State Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    {...formik.getFieldProps('state')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.state && formik.errors.state ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-red-500 text-sm">{formik.errors.state}</div>
                  ) : null}
                </div>

                {/* City Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    {...formik.getFieldProps('city')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.city && formik.errors.city ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-red-500 text-sm">{formik.errors.city}</div>
                  ) : null}
                </div>

                {/* Pin Code Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your pin code"
                    {...formik.getFieldProps('pinCode')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.pinCode && formik.errors.pinCode ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.pinCode && formik.errors.pinCode ? (
                    <div className="text-red-500 text-sm">{formik.errors.pinCode}</div>
                  ) : null}
                </div>

                {/* Company ID Field */}
                <div className="mb-2">
                  <label className="mb-1 block text-black dark:text-white">
                    Company ID
                  </label>
                  <input
                    type="text"
                    placeholder="Select ID (e.g., 12345 67890)"
                    {...formik.getFieldProps('companyId')}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.companyId && formik.errors.companyId ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.companyId && formik.errors.companyId ? (
                    <div className="text-red-500 text-sm">{formik.errors.companyId}</div>
                  ) : null}
                </div>

                {/* Gender Field (Visible only if type is Company) */}
                {!type && (
                  <div className="mb-2">
                    <label className="mb-1 block text-black dark:text-white">
                      Gender
                    </label>
                    <select
                      {...formik.getFieldProps('gender')}
                      className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                        formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                    ) : null}
                  </div>
                )}

                {/* Date of Birth Field (Visible only if type is Company) */}
                {!type && (
                  <div className="mb-2">
                    <DatePickerOne
                      value={formik.values.dob}
                      onChange={(date) => formik.setFieldValue('dob', date)}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.dob && formik.errors.dob ? (
                      <div className="text-red-500 text-sm">{formik.errors.dob}</div>
                    ) : null}
                  </div>
                )}

                {/* Upload ID Field */}
                <div className="mb-2 col-span-3">
                  <label className="mb-1 block text-black dark:text-white">
                    Upload ID
                  </label>
                  <input
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue('file', event.currentTarget.files[0]);
                    }}
                    className={`w-full rounded-2xl bg-[#F1F2F4] border-none py-3 px-5 text-black outline-none transition focus:border-primary ${
                      formik.touched.file && formik.errors.file ? 'border-red-500' : ''
                    }`}
                  />
                  {formik.touched.file && formik.errors.file ? (
                    <div className="text-red-500 text-sm">{formik.errors.file}</div>
                  ) : null}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-[200px] flex justify-center rounded bg-[#000] text-[#D9E821] p-3 font-medium hover:bg-opacity-90 col-span-3"
                >
                  Add Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
