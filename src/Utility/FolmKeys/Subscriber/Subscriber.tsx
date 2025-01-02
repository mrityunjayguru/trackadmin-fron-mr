import { formattedStates } from '../State';

export const AddSubscriberKey = [
  {
    label: 'Full Name *',
    name: 'Name',
    type: 'text',
    placeholder: 'Enter Name',
    value: '', // Dummy value
  },
  {
    label: 'Email ID/User ID *',
    name: 'emailAddress',
    type: 'email',
    placeholder: 'Enter Email ID',
    value: '', // Dummy value
  },
  {
    label: 'Mobile Number *',
    name: 'phone',
    type: 'text',
    placeholder: 'Enter Mobile',
    icon: null, // No icon specified, leave as null or add one if needed
    value: '', // Dummy value
  },
  {
    label: 'Password *',
    name: 'password',
    type: "password",
    placeholder: 'Enter Password',
    value: '', // Dummy value
  },
  {
    label: 'Confirm Password *',
    name: 'confirmPassword',
    type: "password",
    placeholder: 'Enter Password Again',
    value: '', // Dummy value
  },
  {
    label: 'Status *',
    name: 'status',
    type: 'select',
    placeholder: 'Choose Status',
    options: ['Active', 'Inactive'], // Example options for status
    value: '', // Dummy value
  },
  {
    label: 'Gender',
    name: 'gender',
    type: 'select',
    placeholder: 'Select Gender',
    options: ['Male', 'Female', 'Other'], // Example options for gender
    value: '', // Dummy value
  },
  {
    label: 'Date of Birth',
    name: 'dob',
    type: 'date',
    placeholder: 'Enter DOB',
    value: '', // Dummy value
  },
  {
    label: 'Permanent Address *',
    name: 'address',
    type: 'text',
    placeholder: 'Enter Address',
    value: '', // Dummy value
  },
  {
    label: 'Country',
    name: 'country',
    type: 'select',
    placeholder: 'India', // Default country
    options: ['India'], // Example options for country
    disabled: true,
    value: 'India', // Dummy value
  },
  {
    label: 'State',
    name: 'state',
    type: 'select',
    placeholder: 'Choose State',
    options: formattedStates, // Example options for country
    disabled: true,
    value: '', // Dummy value (Make sure 'Maharashtra' exists in formattedStates)
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    placeholder: 'Enter City',
    disabled: false,
    value: '', // Dummy value
  },
  {
    label: 'Pincode',
    name: 'pinCode',
    type: 'text',
    placeholder: 'Enter Pincode',
    disabled: false,
    value: '', // Dummy value
  },
  {
    label: 'Identity Document *',
    name: 'idDocument',
    type: 'select',
    placeholder: 'Select ID Card',
    options: ['Aadhar Card', 'PAN Card', 'Driving License'], // Example options
    value: '', // Dummy value
  },
  {
    label: 'ID Number *',
    name: 'idno',
    type: 'text',
    placeholder: 'Enter ID No.',
    value: '', // Dummy value
  },
  {
    label: 'Upload Document *',
    name: 'Document',
    type: 'file',
    placeholder: 'Upload',
    value: '', // Dummy value (you can add a sample file path if necessary)
  },
];
