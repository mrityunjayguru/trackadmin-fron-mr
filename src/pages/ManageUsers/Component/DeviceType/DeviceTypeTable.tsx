import React, { useEffect, useState } from 'react';
import CommonHeader from '../../../../common/CommonHeader';
import { getDeviceType, singleDeviceType } from '../../../../api/DeviceType';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { FaEye } from 'react-icons/fa';
import Pagination from '../../../../common/Loader/Pagination'; // Assuming you have a Pagination component
import { useNavigate } from 'react-router-dom';
import SearchAndFilter from '../../../../common/SearchAndFilter';
const DeviceTypeTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  // Define status options
  const statusOptions = [
    { value: "", label: "All" },
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" }
  ];
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye.deviceType,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [total, setTotal] = useState(0); // Assuming you have total count info

  // Fetching device types
  const getDeviceTypes = async () => {
    try {
      const payload: any = {
        offset: (currentPage - 1) * itemsPerPage,
      };
      Object.assign(payload,{search:searchQuery})
      Object.assign(payload,{status:filter})

      const response: any = await dispatch(getDeviceType(payload));
      setTotal(response?.totalCount); // Set the total count for pagination
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDeviceTypes();
  }, [currentPage,searchQuery,filter]);

  const propsData = {
    title: 'List Of All DeviceType',
    button: 'Add New',
    redirect: 'deviceType',
  };
  const handleSingleType = (val: any) => {
    dispatch(singleDeviceType(val));
    navigate('/EditDeviceType');
  };
  const handleSearchChange = (value: string) => {
    console.log(value,"valuevaluevaluevalue")
    setSearchQuery(value); // Update the search query
  };

  // Handle status change
  const handleStatusChange = (selectedOption: any) => {
    console.log(selectedOption.value,"valuevalue")
    setFilter(selectedOption.value); // Update the selected filter
  };
  return (
    <>
      <CommonHeader propsData={propsData} />
      <SearchAndFilter
        statusOptions={statusOptions} // Pass the options here
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <div className="overflow-y-auto rounded-sm xl:pb-1 my-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F0F4FD] text-gray-700 font-semibold text-base">
            <tr>
              <th scope="col" className="p-1 text-center">
                No#
              </th>
              <th scope="col" className="p-1 text-center">
                Device Type
              </th>
              <th scope="col" className="p-1 text-center">
                Status
              </th>
              <th scope="col" className="p-1 text-center">
                Created At
              </th>
              <th scope="col" className="p-1 text-center">
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devicetypeDetails?.map((deviceType: any, key: number) => (
              <tr
                key={key}
                className={` border-[#EFEFEF] text-center text-[15px] font-medium dark:border-strokedark${
                  deviceType.status=='InActive' ? 'text-[#949495]' : 'text-[#000000]'
                }`}
              >
                <td className="p-1 border-b border-[#EFEFEF] dark:border-strokedark">
                  {(currentPage - 1) * itemsPerPage + key + 1}
                </td>
                <td className="p-1 border-b border-[#EFEFEF] dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {deviceType.deviceType}
                  </p>
                </td>
                <td className="p-1 border-b border-[#EFEFEF] dark:border-strokedark">
                <p className={` dark:text-white ${deviceType.status === 'InActive' ? 'text-red-500' : 'text-black'}`}>
                    {deviceType.status || 'none'}
                  </p>
                </td>
                <td className="p-1 text-center border-b border-[#EFEFEF] dark:border-strokedark">
                  {new Date(deviceType.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="p-1 text-center hidden sm:table-cell border-b border-[#EFEFEF] dark:border-strokedark">
                  <p
                    className="text-[#02B754] cursor-pointer flex justify-center items-center"
                    onClick={() => handleSingleType(deviceType)}
                  >
                    <FaEye style={{ fontSize: '24px' }} />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalCount={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default DeviceTypeTable;
