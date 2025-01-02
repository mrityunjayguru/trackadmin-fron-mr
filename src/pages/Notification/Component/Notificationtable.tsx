// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch } from '../../../store/store';
// import { getNotification } from '../../../api/Noification';
// import { FaEye } from 'react-icons/fa';
// import Modal from './Modal'; // Import your Modal component

// const Notificationtable = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const records = useSelector(
//     (state: any) => state.notification.AllNotification,
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedNotification, setSelectedNotification] = useState<any>(null);

//   useEffect(() => {
//     const payload: any = {};
//     dispatch(getNotification(payload));
//   }, [dispatch]);

//   const handleOpenModal = (notification: any) => {
//     setSelectedNotification(notification);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedNotification(null);
//   };

//   return (
//     <div className="">
//       <div className="setredius py-4 px-4 bg-[#000000] texty font-normal text-xl md:px-6 xl:px-7.5">
//         <h4 className="text-xl font-semibold texty dark:text-white">
//           Announcement History
//         </h4>
//       </div>

//       <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//         <div className="col-span-3 flex items-center">
//           <p className="font-medium">Title</p>
//         </div>
//         <div className="col-span-2 hidden items-center sm:flex">
//           <p className="font-medium">User</p>
//         </div>
//         <div className="col-span-2 flex items-center">
//           <p className="font-medium">Created At</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">View</p>
//         </div>
//       </div>

//       {records && records.length > 0 ? (
//         records.map((notification: any) => (
//           <div
//             className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//             key={notification._id}
//           >
//             <div className="col-span-3 flex items-center">
//               <p className="text-sm text-black dark:text-white">
//                 {notification.title}
//               </p>
//             </div>
//             {notification.sendTo === 'Selected' ? (
//               <div className="col-span-2 hidden items-center sm:flex">
//                 {notification.result.map((val: any, i: number) => (
//                   <p key={i} className="text-sm text-black dark:text-white">
//                     {val.name},
//                   </p>
//                 ))}
//               </div>
//             ) : (
//               <div className="col-span-2 hidden items-center sm:flex">
//                 <p className="text-sm text-black dark:text-white">
//                   {notification.sendTo}
//                 </p>
//               </div>
//             )}

//             <div className="col-span-2 flex items-center">
//               <p className="text-sm text-black dark:text-white">
//                 {new Date(notification.createdAt).toLocaleString()}
//               </p>
//             </div>
//             <div
//               className="col-span-1 flex items-center cursor-pointer"
//               onClick={() => handleOpenModal(notification)}
//             >
//               <p className="text-xl text-black dark:text-white">
//                 <FaEye />
//               </p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-black dark:text-white">No notifications available</p>
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         notification={selectedNotification}
//       />
//     </div>
//   );
// };

// export default Notificationtable;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { getNotification } from '../../../api/Noification';
import { FaEye } from 'react-icons/fa';
import Modal from './Modal'; // Import your Modal component
import Pagination from '../../../common/Loader/Pagination';
import { formatDateToDDMMMYYYYwithTime } from '../../../common/ManageDate';
const Notificationtable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector(
    (state: any) => state.notification.AllNotification?.records || [],
  ) || [];
  const total:any = useSelector(
    (state: any) => state.notification.AllNotification?.totalcount,
  ) ;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  useEffect(() => {
    const payload: any = {};
    dispatch(getNotification(payload));
  }, [dispatch]);

  const handleOpenModal = (notification: any) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };
  useEffect(()=>{
    const offset = (currentPage - 1) * itemsPerPage;
    const payload:any={
      offset:offset
    }
    dispatch(getNotification(payload));
  },[currentPage])
  return (
    <div className="rounded-sm ">
      <div className="setredius py-4 px-4 bg-[#000000] texty font-normal text-xl md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold texty dark:text-white">
          Announcement History
        </h4>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y ">
          <thead className="bg-[#F0F4FD] text-gray-700">
            <tr className="font-semibold text-base">
              <th
                scope="col"
                className="p-1 text-center    tracking-wider"
              >
                No#
              </th>
              <th
                scope="col"
                className="p-1 text-center    tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="p-1 text-center    tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="p-1 text-center    tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="p-1 text-center    tracking-wider"
              >
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records && records.length > 0 ? (
              records.map((notification: any, i: any) => (
                <tr
                  key={notification._id}
                  className="text-black text-[15px] font-medium text-center border-b border-stroke dark:border-strokedark
"
                >
                  <td className="p-1 text-center whitespace-nowrap text-sm text-black dark:text-white">
                    {currentPage > 1
                      ? (currentPage - 1) * itemsPerPage + i + 1
                      : i + 1}
                  </td>
                  <td className="p-1 text-center whitespace-nowrap text-sm text-black dark:text-white">
                    {notification.title.slice(0, 50)}
                  </td>
                  <td className="p-1 text-center whitespace-nowrap text-sm text-black dark:text-white">
                    {notification.sendTo === 'Selected' ? (
                      <>
                        {notification.result
                          .slice(0, 5)
                          .map((val: any, i: number) => (
                            <span key={i}>
                              {val.name}
                              {i < 4 && i < notification.result.length - 1
                                ? ', '
                                : ''}
                            </span>
                          ))}
                        {notification.result.length > 5 && <span>...</span>}
                      </>
                    ) : (
                      notification.sendTo
                    )}
                  </td>

                  <td className="p-1 text-center whitespace-nowrap text-sm text-black dark:text-white">
                  {formatDateToDDMMMYYYYwithTime(notification.createdAt)}

                  </td>
                  <td className="p-1   text-center whitespace-nowrap text-sm flex justify-center">
                    <FaEye
                      className="text-xl text-[#02B754] dark:text-white cursor-pointer"
                      onClick={() => handleOpenModal(notification)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-1 whitespace-nowrap text-center text-sm text-black dark:text-white"
                >
                  No notifications available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        notification={selectedNotification}
      />

      <Pagination
        totalCount={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Notificationtable;
