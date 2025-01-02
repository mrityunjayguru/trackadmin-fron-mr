// import { useNavigate } from 'react-router-dom';
// import { FaEye } from 'react-icons/fa';
// import { AllAdmin, singleAdmin } from '../../../api/Admin';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch } from '../../../store/store';
// import { useEffect } from 'react';

// function AdminRoleTable() {

//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const AdminData = useSelector((state: any) => state.adminRole.Admin);
//   const manageDevice = (user: any) => {
//     let payload: any = user;
//     dispatch(singleAdmin(payload));
//     navigate('/Edit-Admin');
//   };
//   const getAdmin = async () => {
//     try {
//       let payload: any = {};
//       dispatch(AllAdmin(payload));
//     } catch (err) {}
//   };
//   useEffect(() => {
//     getAdmin();
//   }, []);
//   const fun = (e:any) => {
//   const payload:any={
//     search:e.target.value
//   }
//     dispatch(AllAdmin(payload));
//     // dispatch(Getsubscribers(payload))
//   };
  
//   const betterfunction = (fun: (...args: any[]) => void, delay: number) => {
//     let timer: NodeJS.Timeout | null;
//     return function (...args: any[]) {
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(() => {
//         fun(...args);
//       }, delay);
//     };
//   };
  
//   const debouncedSearch = betterfunction(fun, 1000);
//   return (
//     <>
//       <div className="flex setredius justify-between gap-1 w-full p-4 bg-black text-xl font-semibold text-white">
//         <div className="flex gap-1">
//           <h1 className="text-[#D9E821]">Admin List</h1>
//         </div>
//         <div
//           className="cursor-pointer"
//           onClick={() => navigate('/Manage-Admin')}
//         >
//           Add New +
//         </div>
//       </div>

//       <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
//         <div className="col-span-2">
//           <input onChange={debouncedSearch}
//             className="w-full px-10 py-3 rounded-2xl"
//             placeholder="Search"
//             type="text"
//           />
//         </div>
//         <div className="bg-black rounded-3xl px-3 py-2 text-[#D9E821] text-xl items-center text-center cursor-pointer">
//           Filters
//         </div>
//       </div>

//       <div className=" xl:pb-1">
//         <div className="flex flex-col">
//           <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
//             <div className="p-1 xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 No#
//               </h5>
//             </div>
//             <div className="p-1 xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Name
//               </h5>
//             </div>
//             <div className="p-1 xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Mobile
//               </h5>
//             </div>
//             <div className="p-1 xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Created
//               </h5>
//             </div>
//             <div className="p-1 xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Status
//               </h5>
//             </div>
//             <div className="p-1 xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Manage
//               </h5>
//             </div>
//           </div>

//           {AdminData && AdminData.length > 0 ? (
//   AdminData.map((user: any, i: number) => (
//     <div
//       className="grid grid-cols-6 border-b border-stroke dark:border-strokedark"
//       key={i}
//     >
//       <div className="flex p-1 xl:p-5">
//         <p className="text-black dark:text-white">{i + 1}</p>
//       </div>
//       <div className="flex p-1 xl:p-5">
//         <p className="text-black dark:text-white">{user.Name}</p>
//       </div>
//       <div className="flex p-1 xl:p-5">
//         <p className="text-black dark:text-white">{user.phone}</p>
//       </div>
//       <div className="flex p-1 xl:p-5">
//         <p className="text-black dark:text-white">
//           {new Date(user.createdAt).toLocaleDateString()}
//         </p>
//       </div>
//       <div className="flex p-1 xl:p-5">
//         <p
//           className={`text-${
//             user.status ? 'green' : 'red'
//           }-500 dark:text-white`}
//         >
//           {user.status ? 'Active' : 'InActive'}
//         </p>
//       </div>
//       <div onClick={() => manageDevice(user)} className="flex p-1 xl:p-5">
//         <p className="text-[#02B754] cursor-pointer">
//           <FaEye style={{ fontSize: '24px' }} />
//         </p>
//       </div>
//     </div>
//   ))
// ) : (
//   <p className="text-black dark:text-white">No admin data available</p>
// )}




//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminRoleTable;

import { useNavigate } from 'react-router-dom';
import { FaEye, FaSearch } from 'react-icons/fa';
import { AllAdmin, singleAdmin } from '../../../api/Admin';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { AppDispatch } from '../../../store/store';
import { useEffect,useState } from 'react';
import Pagination from '../../../common/Loader/Pagination';
import { formatDateToDDMMMYYYYwithTime } from '../../../common/ManageDate';
function AdminRoleTable() {
  // const [totalCount, setTotalCount] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const AdminData = useSelector((state: any) => state.adminRole.Admin?.records);
  const total = useSelector((state: any) => state.adminRole.Admin?.totalcount);
  const [filter,setfilter]=useState("")


  const manageDevice = (user: any) => {
    let payload: any = user;
    dispatch(singleAdmin(payload));
    navigate('/Admin-Roles/Edit-Admin-Roles');
  };

  const getAdmin = async () => {
    try {
      let payload: any = {};
      dispatch(AllAdmin(payload));
    } catch (err) {}
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const handleSearch = (e: any) => {
    const payload: any = { search: e.target.value };
    dispatch(AllAdmin(payload));
  };

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout | null;
    return function (...args: any[]) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(handleSearch, 1000);

  useEffect(()=>{
    const offset = (currentPage - 1) * itemsPerPage;
    const payload:any={
      offset:offset
    }
  
    dispatch(AllAdmin(payload));
  },[currentPage])
  useEffect(()=>{
    const payload:any={}
    if(filter){
      Object.assign(payload,{filter:filter})
    }
    
    if(filter==""){
      setCurrentPage(1)
      payload.offset=0
    }
    dispatch(AllAdmin(payload));
  },[filter])
  const handleStatusChange = (e: any) => {
    setfilter(e.value);
  };
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActives' }
  ];
  useEffect(()=>{

  },[filter])
  return (
    <>
      <div className="grid grid-cols-3 gap-4 my-2 py-1">
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

      <div className="rounded-sm  xl:pb-1">
        <table className="w-full table-auto text-left">
          <thead className="bg-[#F0F4FD] text-gray-700">
            <tr className="grid grid-cols-6 gap-4 font-semibold text-center text-base">
              <th className="p-1">No#</th>
              <th className="p-1">Name</th>
              <th className="p-1">Mobile</th>
              <th className="p-1">Created</th>
              <th className="p-1">Status</th>
              <th className="p-1">Manage</th>
            </tr>
          </thead>
          <tbody>
            {AdminData && AdminData.length > 0 ? (
              AdminData.map((user: any, i: number) => (
                <tr
                key={user._id}
                className={`grid grid-cols-6 gap-4 text-center border-b border-stroke text-[15px] font-medium ${
                  user.status==false ? 'text-[#949495]' : 'text-[#000000]'
                }`}
              >
              
                  <td className="p-1">
                    {currentPage > 1
                      ? (currentPage - 1) * itemsPerPage + i + 1
                      : i + 1}
                  </td>
                  <td className="p-1">{user.Name}</td>
                  <td className="p-1">{user.phone}</td>
                  <td className="p-1">
                    {formatDateToDDMMMYYYYwithTime(user.createdAt)}
                  </td>
                  <td className="p-1">
                    <span
                      className={`text-${user.status ? 'green' : 'red'}-500`}
                    >
                      {user.status ? 'Active' : 'InActive'}
                    </span>
                  </td>
                  <td
                    className="p-1 cursor-pointer flex justify-center"
                    onClick={() => manageDevice(user)}
                  >
                    <FaEye style={{ fontSize: '24px', color: '#02B754' }} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-1 text-center" colSpan={6}>
                  No admin data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalCount={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default AdminRoleTable;
