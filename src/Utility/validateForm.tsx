export const validateForm = (formData: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};

  const patterns: { [key: string]: RegExp } = {
    emailAddress: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // emailAddress pattern
    phone: /^[0-9]{10}$/, // Mobile pattern (10 digits)
    Name: /^[A-Za-z ]{2,}$/, // Name pattern (letters and spaces, minimum 2 characters)
    password: /^.{4,}$/, // Password pattern (minimum 4 characters)
    pincode:/^[0-9]{6}$/
  };

  const rules: {
    [key: string]: {
      required: boolean;
      pattern?: RegExp;
      errorMessage: string;
    };
  } = {
    Name: {
      required: true,
      pattern: patterns.Name,
      errorMessage: 'User Name must contain only letters and spaces.',
    },
    emailAddress: {
      required: true,
      pattern: patterns.emailAddress,
      errorMessage: 'Please enter a valid email address.',
    },
    address: {
      required: true,
      errorMessage: '',
    },
    phone: {
      required: true,
      pattern: patterns.phone,
      errorMessage: 'Please enter a valid mobile number (10 digits).',
    },
    password: {
      required: true,
      pattern: patterns.password,
      errorMessage: 'Password must be at least 4 characters long.',
    },
    confirmPassword: {
      required: true,
      pattern: patterns.password,
      errorMessage: 'Confirm Password must be at least 4 characters long.',
    },
    gender: {
      required: true,
      errorMessage: '',
    },
    dob: {
      required: true,
      errorMessage: 'Date of Birth is required and age must be at least 18.',
    },
    idno: {
      required: true,
      errorMessage: '',
    },
    idDocument: {
      required: true,
      errorMessage: '',
    },
    deviceSimNumber: {
      required: true,
      errorMessage: '',
    },
    operator: {
      required: true,
      errorMessage: '',
    },
    imei: {
      required: true,
      errorMessage: '',
    },
    dealerCode: {
      required: true,
      errorMessage: '',
    },
    vehicleCategory: {
      required: true,
      errorMessage: '',
    },
    deviceStatus: {
      required: true,
      errorMessage: '',
    },
    deviceId: {
      required: true,
      errorMessage: '',
    },
    status: {
      required: true,
      errorMessage: '',
    },
    deviceType: {
      required: true,
      errorMessage: '',
    },
    state:{
      required: true,
      errorMessage: '',
    },
    city:{
      required: true,
      errorMessage: '',
    },
    pinCode:{
      required: true,
      pattern: patterns.pincode,
      errorMessage: 'Please Enter Valid Pincode',
    }
  };

  // Iterate over form fields to validate
  Object.keys(formData).forEach((field) => {
    const value = formData[field];
    const rule = rules[field];

    // Check if the field is required and empty
    if (rule?.required && (!value || value.trim() === '')) {
      errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required.`;
    } else if (rule?.pattern && value && !rule?.pattern.test(value)) {
      errors[field] = rule.errorMessage; // If the field doesn't match the pattern
    }
    if (field === 'confirmPassword' && formData.password !== value) {
      errors[field] = 'Passwords do not match.';
    }
    // Special case for age validation
    if (field === 'dob' && value) {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDifference = today.getMonth() - dob.getMonth();
      const dayDifference = today.getDate() - dob.getDate();

      // Adjust age calculation if today's month/day is before DOB month/day
      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
      }

      if (age < 18) {
        errors[field] = 'Age must be at least 18.';
      }
    }
   
  });

  return errors; // Return the errors object
};
