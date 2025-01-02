import { createAboutus, updateDevices } from '../../../../api/AboutUs'; // Make sure to import the update function
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../../../../store/store';
import { getAboutusRecord } from '../../../../api/AboutUs';

function ManageAbout() {
  const dispatch = useDispatch<AppDispatch>();
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');
  const getrecords = useSelector((state: any) => state.aboutus.Allaboutus);

  // Function to fetch existing About Us records
  const getaboutus = () => {
    try {
      const payload: any = {};
      dispatch(getAboutusRecord(payload));
    } catch (err) {
      console.error('Error fetching About Us records:', err);
    }
  };

  useEffect(() => {
    getaboutus();
  }, []);

  // Populate the textarea if records exist
  useEffect(() => {
    if ( getrecords && getrecords.length > 0) {
      setDescription(getrecords[0].description || ''); // Fill the description with the existing record
    }
  }, [getrecords]);

  // Validate the input
  const validateInput = () => {
    if (!description.trim()) {
      setError('Description is required.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateInput()) {
      const payload: any = { description };

      if (getrecords.length > 0) {
        // If record exists, update the existing record
        const recordId = getrecords[0]._id; // Assuming _id is the identifier
        dispatch(updateDevices({ _id: recordId, ...payload }))
          .then((result) => {
            getaboutus();
            if (result.meta.requestStatus === 'fulfilled') {
              console.log('About Us updated successfully');
              setDescription(''); // Clear the textarea on successful update
            } else {
              console.error('Failed to update About Us');
            }
          })
          .catch((err) => {
            console.error('Error updating About Us:', err);
          });
      } else {
        // If no record exists, create a new one
        dispatch(createAboutus(payload))
          .then((result) => {
            getaboutus();
            if (result.meta.requestStatus === 'fulfilled') {
              console.log('About Us created successfully');
              setDescription(''); // Clear the textarea on successful creation
            } else {
              console.error('Failed to create About Us');
            }
          })
          .catch((err) => {
            console.error('Error creating About Us:', err);
          });
      }
    }
  };

  return (
    <div className="px-2 py-5">
      <form onSubmit={handleSubmit} className="mb-4 w-1/2">
        <textarea
          name="description"
          placeholder="Enter Description"
          required
          value={description}
          onChange={handleChange}
          className="w-full h-64 rounded-2xl bginput border-none bg-transparent py-3 px-5 text-black text-sm font-medium outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          rows={4}
        />
        {error && <p className="text-red-600 text-xs">{error}</p>}{' '}
        {/* Display error message */}
        <div className="rounded-2xl mt-4">
          <button
            type="submit"
            className="h-[40px] px-5 rounded-2xl bg-[#000] text-[#D9E821] font-normal "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageAbout;
