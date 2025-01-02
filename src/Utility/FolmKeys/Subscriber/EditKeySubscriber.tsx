import { formattedStates } from '../State';
import { useState, useEffect } from 'react';

const GetEncPassword = async (password: any) => {
  // Wait for decryption and return the decrypted password
  const decryptedPassword = await decrypt(password);
  return decryptedPassword;
};

export const EditKeySubscriber = (SingleSubscriber: any) => {
  const [decryptedPassword, setDecryptedPassword] = useState<string>('');

  useEffect(() => {
    // If password exists, decrypt it and set state
    if (SingleSubscriber?.password) {
      GetEncPassword(SingleSubscriber?.password).then((decrypted) => {
        setDecryptedPassword(decrypted);
      });
    }
  }, [SingleSubscriber?.password]); // Trigger effect when password changes

  return [
    {
      label: 'Full Name *',
      name: 'Name',
      type: 'text',
      placeholder: 'Enter Name',
      value: SingleSubscriber?.Name || '',
      disables: true,
    },
    {
      label: 'Email ID/User ID *',
      name: 'emailAddress',
      type: 'email',
      placeholder: 'Enter Email ID',
      value: SingleSubscriber?.emailAddress || '',
      disables: true,
    },
    {
      label: 'Mobile Number *',
      name: 'phone',
      type: 'text',
      placeholder: 'Enter Mobile',
      icon: null,
      value: SingleSubscriber?.phone || '',
      disables: true,
    },
    {
      label: 'Password *',
      name: 'password',
      type: 'password',
      placeholder: 'Enter Password',
      value: decryptedPassword || '', // Use decrypted password
      disables: true,
    },
    {
      label: 'Confirm Password *',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Enter Password Again',
      value: decryptedPassword || '', // Use decrypted password
      disables: true,
    },
    {
      label: 'Status *',
      name: 'status',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'Inactive'],
      value: SingleSubscriber?.status ? 'Active' : 'Inactive',
      disables: true,
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      placeholder: 'Select Gender',
      options: ['Male', 'Female', 'Other'],
      value: SingleSubscriber?.gender || '',
      disables: true,
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'date',
      placeholder: 'Enter DOB',
      value: SingleSubscriber?.dob ? new Date(SingleSubscriber.dob).toISOString().split('T')[0] : '',
      disables: true,
    },
    {
      label: 'Permanent Address *',
      name: 'address',
      type: 'text',
      placeholder: 'Enter Address',
      value: SingleSubscriber?.address || '',
      disables: true,
    },
    {
      label: 'Country',
      name: 'country',
      type: 'select',
      placeholder: 'India',
      options: ['India'],
      disabled: true,
      value: SingleSubscriber?.country || 'India',
      disables: true,
    },
    {
      label: 'State',
      name: 'state',
      type: 'select',
      placeholder: 'Choose State',
      options: formattedStates,
      disabled: true,
      value: SingleSubscriber?.state || '',
      disables: true,
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'Enter City',
      value: SingleSubscriber?.city || '',
      disables: true,
    },
    {
      label: 'Pincode',
      name: 'pinCode',
      type: 'text',
      placeholder: 'Enter Pincode',
      value: SingleSubscriber?.pinCode || '',
      disables: true,
    },
    {
      label: 'Identity Document *',
      name: 'idDocument',
      type: 'select',
      placeholder: 'Select ID Card',
      options: ['Aadhar Card', 'PAN Card', 'Driving License'],
      value: SingleSubscriber?.idDocument || '',
      disables: true,
    },
    {
      label: 'ID Number *',
      name: 'idno',
      type: 'text',
      placeholder: 'Enter ID No.',
      value: SingleSubscriber?.idno || '',
      disables: true,
    },
    {
      label: 'Upload Document *',
      name: 'Document',
      type: 'file',
      placeholder: 'Upload',
      value: SingleSubscriber?.Document || '',
      disables: false,
    },
  ];
};

import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const SECRET_KEY = 'TRACKROUTE_PRO-encryption-key'; // Use a secure key and store it safely

// Encrypt function
export const encrypt = (text: string): string => {
  const encrypted = AES.encrypt(text, SECRET_KEY).toString();
  return encrypted;
};

// Decrypt function
export const decrypt = (text: string): Promise<string> => {
  const decrypted = AES.decrypt(text, SECRET_KEY).toString(Utf8);
  console.log(decrypted, "decrypted");
  return Promise.resolve(decrypted); // Ensure it's a promise
};
