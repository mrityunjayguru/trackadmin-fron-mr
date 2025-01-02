import { FaEye, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  GetFaQPrioritys,
  singleFaQPriorityLis,
} from '../../../../api/FaQPriorityList';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const ManageFaq = () => {
  const navigate = useNavigate();
  const [filter,setfilter]=useState("")

  const dispatch = useDispatch<AppDispatch>();

  const records = useSelector(
    (state: any) => state.FaQPriority.AllFFaQPriorityt,
  );

  const getRecords = async () => {
    try {
      const payload: any = {};
      await dispatch(GetFaQPrioritys(payload)); // Await the async dispatch
    } catch (err) {
      console.error('Failed to fetch records:', err); // Add error logging for easier debugging
    }
  };

  useEffect(() => {
    getRecords();
  }, []); // Dependency array is empty to ensure it runs only once
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const viewDetails = (records: any) => {
    // if (loginUser.permissions.FAQTopics?.Update == true) {
      let payload: any = records;
      dispatch(singleFaQPriorityLis(payload));
      navigate('/manage/edit-Topic-List');
    // }
  };

  const fun = (e: any) => {
    const payload: any = {
      search: e.target.value,
    };
    dispatch(GetFaQPrioritys(payload));
  };

  const betterfunction = (fun: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout | null;
    return function (...args: any[]) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fun(...args);
      }, delay);
    };
  };

  const debouncedSearch = betterfunction(fun, 1000);
  useEffect(()=>{
const payload:any={}
if(filter)
  Object.assign(payload,{status:filter})
     dispatch(GetFaQPrioritys(payload)); // Await the async dispatch

  },[filter])
  const handleStatusChange = (e: any) => {
    setfilter(e.value);
  };
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ];
  return (
    <>
      <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
        <div className="col-span-2 relative w-full">
          <input
            onChange={debouncedSearch}
            className="px-10 border border-gray-300 w-full py-2 rounded-2xl focus:border-gray-300 focus:outline-none"

            placeholder="Search"
            type="text"
          />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

        </div>
        <div className="col-span-1 text-center">
  <Select
    options={statusOptions}
    placeholder="Select Filter"
    isSearchable={false}
    onChange={handleStatusChange}
    value={statusOptions.find(option => option.value === filter)} // Set the current value
    styles={{
      control: (provided: any) => ({
        ...provided,
        minHeight: '38px',
        backgroundColor: '#000', // Set background color to black
        borderRadius: '9999px', // Fully rounded border (pill shape)
        border: 'none', // Remove any default borders
        paddingTop: '2px',
        paddingBottom: '2px',
        display: 'flex',
        justifyContent: 'center', // Centers content horizontally
        alignItems: 'center', // Centers content vertically
      }),
      placeholder: (provided: any) => ({
        ...provided,
         // Set placeholder color to #D9E821
        textAlign: 'center', // Center the placeholder text
      }),
      option: (provided: any, state: { isSelected: any }) => ({
        ...provided,
        color: '#000', // Set option text color to black

        textAlign: 'center', // Center the option text
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: '#D9E821', // Set the color of the selected value
        textAlign: 'center', // Center the selected value
      }),
    }}
  />
</div>
      </div>
      <div className="rounded-sm xl:pb-1">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#F0F4FD] text-gray-700">
            <tr className=" font-semibold text-base">
            <th className="p-1  xsm:text-base">No#</th>

              <th className="p-1  xsm:text-base">Title</th>
              <th className="p-1  xsm:text-base text-center">Priority</th>
              <th className="p-1  xsm:text-base text-center">Status</th>
              <th className="p-1  xsm:text-base text-center hidden sm:table-cell">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {records && records.length > 0 ? (
              records.map((faq: any, id: number) => (
                <tr
                key={faq._id}
                className={`text-center text-[14px] font-medium ${
                  id % 2 === 0 ? 'dark:bg-meta-6' : ''
                } border-b border-[#EFEFEF] ${faq.status === "InActive" ? 'text-[#949495]' : 'text-[#000000]'}`}
              >
                   <td className="p-1  dark:text-white">
                    {id+1}
                  </td>
                  <td className="p-1  dark:text-white">
                    {faq.title}
                  </td>
                  <td className="p-1  dark:text-white text-center">
                    {faq.priority}
                  </td>
                  <td className="p-1 text-center">
                    <span
                      className={`text-${
                        faq.status === 'Active' ? 'green' : 'red'
                      }-500`}
                    >
                      {faq.status}
                    </span>
                  </td>
                  <td className="p-1 mcenter text-center hidden sm:table-cell">
                    <FaEye
                      style={{
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#02B754',
                      }}
                      onClick={() => viewDetails(faq)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-1 text-center text-black dark:text-white"
                >
                  No FAQs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageFaq;
