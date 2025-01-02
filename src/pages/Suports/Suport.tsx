import Suporttable from './component/Suporttable';
import { useDispatch } from 'react-redux';
import { getAllSuport } from '../../api/suport';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../store/store';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import Pagination from '../../common/Loader/Pagination';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
function Suport() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [loading, setLoading] = useState(false); // Loading state
  const [filter, setFilter] = useState(''); // State for filter
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  const total = useSelector(
    (state: any) => state.suport?.Allsuport?.totalCount,
  );
  const getsuports = async () => {
    setLoading(true); // Set loading state to true
    const payload: any = {
      search: searchTerm,
      filter,
    };
    const offset = (currentPage - 1) * itemsPerPage;
    if (offset) Object.assign(payload, { offset: offset });
    await dispatch(getAllSuport(payload));
    setLoading(false); // Set loading state to false
  };

  // Fetch support data whenever searchTerm or filter changes
  useEffect(() => {
    getsuports();
  }, [searchTerm, filter]); // Trigger fetching whenever searchTerm or filter changes

  const fun = (e: any) => {
    setSearchTerm(e.target.value); // Update search term state
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

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const handleStatusChange = (selectedOption: any) => {
    setSearchTerm('');
    setFilter(selectedOption.value);
  };
  useEffect(() => {
    getsuports();
  }, [currentPage]);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  useEffect(() => {
    if (
      loginUser.permissions.Support?.View != true &&
      loginUser.role != 'SuperAdmin'
    ) {
      navigate('/');
    }
  }, []);
  const [handleno, setHandleNo] = useState<any>({
    currentPage: 1,
    itemsPerPage: 10,
  });
  useEffect(() => {
    setHandleNo({ currentPage, itemsPerPage });
  }, [currentPage, itemsPerPage]);

  return (
    <>
      {/* <div className="rounded-2xl flex justify-between gap-1 w-full p-4 bg-black text-xl font-semibold text-white">
        <h1 className="text-[#D9E821] cursor-pointer">Support</h1>
      </div> */}

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
        <div className="rounded-3xl px-3 text-xl">
  <Select
    options={statusOptions}
    placeholder="Filters"
    isSearchable={false}
    onChange={handleStatusChange}
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
        color: '#D9E821', // Set placeholder color to #D9E821
        textAlign: 'center', // Center the placeholder text
      }),
      option: (provided: any, state: { isSelected: any, isFocused: boolean }) => ({
        ...provided,
        color: '#000', // Set option text color to black
        textAlign: 'center', // Center the option text
        // backgroundColor: state.isFocused ? '#D9E821' : 'transparent', // Change background color on hover
        cursor: 'pointer', // Show pointer cursor on hover
        ':hover': {
          backgroundColor: 'rgb(240 244 253)', // Set the hover background color
          color: '#000', // Option text color on hover
        },
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

      {loading ? (
        <div className="text-center my-4">Loading...</div> // Show loading message
      ) : (
        <div>
          <Suporttable handleSnNo={handleno} />
          <Pagination
            totalCount={total}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}

export default Suport;
