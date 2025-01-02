import { useNavigate } from 'react-router-dom';
import { FaEye, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { singleSubscribers, Getsubscribers } from '../../../../api/users';
import { AppDispatch } from '../../../../store/store';
import Pagination from '../../../../common/Loader/Pagination';
import { useRef } from 'react';
import { setSearchType } from '../../../../store/subscriber';
import Select from 'react-select';

// Define the shape of a subscriber object
interface Subscriber {
  _id: string;
  Name: string;
  emailAddress: string;
  phone: string;
  city: string;
  subscribeType: string;
  userDevices: [];
  createdAt: string;
  id: string;
  device: string; // Assuming device is a string representing the device type
}

// Define the state structure for your Redux store

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [subscriber, setSubscriber] = useState<Subscriber[]>([]);
  const [filter, setfilter] = useState();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  const data = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  // console.log(data,"datadatadata")
  const total: any = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.totalCount,
  );
  const filterType: any = useSelector(
    (state: any) => state.subscriber?.subscribeType,
  );
  useEffect(() => {
    setfilter(filterType);
  }, [filterType]);

  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  useEffect(() => {
    if (data) {
      setSubscriber(data);
    }
  }, [data]);

  const viewDetails = (user: Subscriber) => {
    navigate(`/view-subscriber/${user._id}`);
    const payload: any = user;
    dispatch(singleSubscribers(payload));
  };

  const GetsubscribersAll = () => {
    const payload: any = {
      search,
      offset: (currentPage - 1) * itemsPerPage,
    };
    if (filter) Object.assign(payload, { filter: filter });
    dispatch(Getsubscribers(payload));
  };

  // Debounce function
  const useDebounce = (func: (...args: any[]) => void, delay: number) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    return (...args: any[]) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetch = useDebounce(GetsubscribersAll, 1000);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  // Effect to fetch subscribers when search term or current page changes
  useEffect(() => {
    debouncedFetch();
  }, [search, currentPage, filter]);
  const handleStatusChange = (e: any) => {

    dispatch(setSearchType(''));
    setfilter(e.value);
  };
  const isMounted = useRef(false);
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      if (isMounted.current) {
        console.log('Component unmounted');
      }
    };
  }, []);
  useEffect(() => {
    // Set to true after the first render
    isMounted.current = true;
  }, []);
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Company', label: 'Company' },
    { value: 'Individual', label: 'Individuals' },
    { value: 'Dealer', label: 'Dealers' }

    
  ];
  return (
    <>
      <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
        <div className="col-span-2 relative w-full">
          <input
       className="px-10 border border-gray-300 w-full py-2 rounded-2xl focus:border-gray-300 focus:outline-none"

            placeholder="Search"
            type="text"
            onChange={handleSearchChange}
          />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

        </div>
        <div className="col-span-1 text-center">
  <Select
    options={statusOptions}
    placeholder="Filter by Account Type"
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

      <div className=" overflow-y-auto rounded-sm  xl:pb-1">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-[#F0F4FD] text-gray-700 font-semibold text-base">
            <tr>
              <th scope="col" className="p-1 text-center">
                No#
              </th>
              <th scope="col" className="p-1 text-center">
                Name
              </th>
              <th scope="col" className="p-1 text-center">
                Type
              </th>
              <th scope="col" className="p-1    text-center">
                Email
              </th>
              <th scope="col" className="p-1    text-center">
                Phone
              </th>
              <th scope="col" className="p-1    text-center">
                Reg. Date
              </th>
              <th
                scope="col"
                className="p-1    text-center text-nowrap sm:table-cell"
              >
                City / Location
              </th>
              <th
                scope="col"
                className="p-1    text-center hidden sm:table-cell"
              >
                Device
              </th>
              <th
                scope="col"
                className="p-1    text-center hidden sm:table-cell"
              >
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {subscriber.map((user, key) => (
    <tr
      key={key}
      className="text-black border-b border-[#D9E821] text-center text-[15px] font-medium dark:border-strokedark"
    >
      <td className="p-1 border-b border-[#D9E821] dark:border-strokedark">
        <p className="text-black dark:text-white">
          {currentPage > 1
            ? (currentPage - 1) * itemsPerPage + key + 1
            : key + 1}
        </p>
      </td>
      <td className="p-1 border-b border-[#D9E821] dark:border-strokedark">
        <p className="text-black dark:text-white">{user.Name}</p>
      </td>
      <td className="p-1 border-b border-[#D9E821] dark:border-strokedark">
        <p className="text-black dark:text-white">
          {user.subscribeType || 'none'}
        </p>
      </td>
      <td className="p-1 text-center border-b border-[#D9E821] dark:border-strokedark">
        <p className="text-black dark:text-white">
          {user.emailAddress.length > 20
            ? `${user.emailAddress.slice(0, 20)}...`
            : user.emailAddress}
        </p>
      </td>
      <td className="p-1 text-center border-b border-[#D9E821] dark:border-strokedark">
        <p className="text-black dark:text-white">{user.phone}</p>
      </td>
      <td className="p-1 text-center border-b border-[#D9E821] dark:border-strokedark">
        {new Date(user.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </td>
      <td className="p-1 text-center hidden sm:table-cell border-b border-[#D9E821] dark:border-strokedark">
        <p className="text-black dark:text-white">{user.city}</p>
      </td>
      <td className="p-1 text-center hidden sm:table-cell border-b border-[#D9E821] dark:border-strokedark">
        <p className="text-meta-5">{user.userDevices.length}</p>
      </td>
      <td className="p-1 text-center hidden sm:table-cell border-b border-[#D9E821] dark:border-strokedark">
        <p
          className="text-[#D9E821] cursor-pointer flex justify-center items-center"
          onClick={() => viewDetails(user)}
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

export default UserTable;
