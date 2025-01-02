import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { singleSubscribers } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setSearchType } from '../../store/subscriber';

interface Subscriber {
  _id: string;
  id: string;
  Name: string;
  subscribeType: string;
  emailAddress: string;
  phone: string;
  city: string;
  createdAt: string;
  userDevices: any[];
}

interface TableOneProps {
  type: string;
  Subscriber: Subscriber[];
}

const TableOne: React.FC<TableOneProps> = ({ type, Subscriber }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Subscriber | '';
    direction: 'asc' | 'desc';
  }>({
    key: '',
    direction: 'asc',
  });

  const viewDetails = (user: any) => {
    navigate(`/view-subscriber/${user._id}`);
    dispatch(singleSubscribers(user));
  };

  const moveviewall = () => {
    dispatch(setSearchType(type));
    navigate('/subscribers');
  };

  // Sorting function
  const sortedSubscribers = [...Subscriber].sort((a, b) => {
    if (sortConfig.key) {
      const isAsc = sortConfig.direction === 'asc';
      if (a[sortConfig.key] < b[sortConfig.key]) return isAsc ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return isAsc ? 1 : -1;
      return 0;
    }
    return 0;
  });

  // Handle column header click
  const handleSort = (key: keyof Subscriber) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className="flex justify-between setredius gap-1 w-full p-4 bg-[#000]  text-xl font-semibold text-white">
        <div className="flex gap-1 ">
          <h1 className="text-[#D9E821]">Latest Subscribers</h1>
          <span>({type})</span>
        </div>
        <div onClick={moveviewall} className="cursor-pointer">
          View All
        </div>
      </div>

      <div className="">
        <table className="min-w-full table-auto">
          <thead className="bg-[#F0F4FD] text-gray-700 tableradius">
            <tr className="bg-gray-2 dark:bg-meta-4 font-semibold text-base">
            <th
                className="p-2 text-center xl:p-1 cursor-pointer"
               
              >
                No#{' '}
              </th>
              <th
                className="p-2 text-center xl:p-1 cursor-pointer"
                onClick={() => handleSort('Name')}
              >
                Name{' '}
                {sortConfig.key === 'Name' ? (
                  sortConfig.direction === 'asc' ? (
                    '↑'
                  ) : (
                    '↓'
                  )
                ) : (
                  ''
                )}
              </th>
              <th
                className="p-2 text-center xl:p-1 cursor-pointer"
                onClick={() => handleSort('emailAddress')}
              >
                Registered Email{' '}
                {sortConfig.key === 'emailAddress' ? (
                  sortConfig.direction === 'asc' ? (
                    '↑'
                  ) : (
                    '↓'
                  )
                ) : (
                  ''
                )}
              </th>
              <th
                className="p-2 text-center xl:p-1 cursor-pointer"
                onClick={() => handleSort('phone')}
              >
                Registered Mobile{' '}
                {sortConfig.key === 'phone' ? (
                  sortConfig.direction === 'asc' ? (
                    '↑'
                  ) : (
                    '↓'
                  )
                ) : (
                  ''
                )}
              </th>
              <th
                className="p-2 text-center xl:p-1 cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                Reg. Date{' '}
                {sortConfig.key === 'createdAt' ? (
                  sortConfig.direction === 'asc' ? (
                    '↑'
                  ) : (
                    '↓'
                  )
                ) : (
                  ''
                )}
              </th>
              <th className="p-2 text-center xl:p-1">City / Location</th>
              <th className="p-2 text-center xl:p-1">No. of Device</th>
              <th className="p-2 text-center xl:p-1">Manage</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubscribers.length > 0 ? (
              sortedSubscribers.map((user, key) => (
                <tr
                  key={user._id}
                  className={`text-black text-[15px] font-medium border-b border-stroke ${
                    key === sortedSubscribers.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                >
                  <td className="p-2 text-center xl:p-1">{key + 1}</td>
                  <td className="p-2 text-center xl:p-1">{user.Name}</td>
                  <td className="p-2 text-center xl:p-1">
                    {user.emailAddress.length > 20
                      ? `${user.emailAddress.slice(0, 20)}...`
                      : user.emailAddress}
                  </td>
                  <td className="p-2 text-center xl:p-1">{user.phone}</td>
                  <td className="p-2.5 xl:p-1 text-center mcenter">
                    <p className="p-2 text-left xl:p-1 mcenter">
                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short', // Displays abbreviated month (e.g., "Oct")
    year: 'numeric',
  })}
                    </p>
                  </td>
                  <td className="p-2 text-center xl:p-1">{user.city}</td>
                  <td className="p-2 text-center xl:p-1">{user.userDevices.length}</td>
                  <td
                    className=" p-2 mcenter sm:table-cell xl:p-1 cursor-pointer  "
                    onClick={() => viewDetails(user)}
                  >
                    <FaEye style={{ fontSize: '24px' }} className="text-[#02B754]" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableOne;
