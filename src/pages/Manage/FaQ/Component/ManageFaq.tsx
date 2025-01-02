import { FaEye, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GetFaQLisy, singleFaQLis } from '../../../../api/FaQList';
import { AppDispatch } from '../../../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetFaQPrioritys } from '../../../../api/FaQPriorityList';
import Pagination from '../../../../common/Loader/Pagination';
import Select from 'react-select';

const ManageFaq = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  // if (loginUser.permissions.FAQTopics?.Update == true) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter,setfilter]=useState("")

  const viewDetails = (faq: any) => {
    // if (loginUser.permissions.FAQ?.Update == true) {
    let payload: any = faq;
    dispatch(singleFaQLis(payload));

    navigate('/Manage/Edit-FAQs');
    // }
  };
  const itemsPerPage = 10; // Adjust this value as needed

  const getfaqlist = async () => {
    const payload: any = {};
    dispatch(dispatch(GetFaQLisy(payload)));
    dispatch(GetFaQPrioritys(payload));
  };

  useEffect(() => {
    getfaqlist();
  }, []);

  const FaQList = useSelector((state: any) => state.FaqList.AllFaqList);
  const totalCount = useSelector((state: any) => state.FaqList?.AllFaqList?.count);

  const fun = (e: any) => {
    const payload: any = {
      search: e.target.value,
    };
    dispatch(GetFaQLisy(payload));
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
    const offset = (currentPage - 1) * itemsPerPage;
    const payload:any={
      offset:offset
    }
    if(filter){
      Object.assign(payload,{status:filter})
    }
    if(filter==""){
      payload.offset=0
    }
    dispatch(GetFaQLisy(payload));
  },[currentPage])
  useEffect(()=>{
    const payload:any={}
    if(filter){
      Object.assign(payload,{status:filter})
    }
    if(filter==""){
      payload.offset=0
    }
    dispatch(GetFaQLisy(payload));
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
      <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1 ">
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
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#F0F4FD] text-gray-700">
            <tr className="font-semibold text-base text-center">
              <th className="p-1  xsm:text-base">No#</th>
              <th className="p-1  xsm:text-base">Title</th>
              <th className="p-1  xsm:text-base">Topic</th>
              <th className="p-1  xsm:text-base text-center">Priority</th>
              <th className="p-1  xsm:text-base text-center">Status</th>
              <th className="p-1  xsm:text-base text-center hidden sm:table-cell">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {FaQList && FaQList?.result?.length > 0 ? (
              FaQList?.result?.map((faq: any, i: number) => (
                <tr
                  key={faq._id}
                  className={`text-center text-[14px] font-medium ${
                    i % 2 === 0 ? 'dark:bg-meta-6' : ''
                  } border-b border-[#EFEFEF] ${
                    faq.status === 'InActive'
                      ? 'text-[#949495]'
                      : 'text-[#000000]'
                  }`}
                >
                  {/* Table row content */}

                  {/* Table row content */}

                  <td className="p-1  dark:text-white">    {currentPage > 1
                      ? (currentPage - 1) * itemsPerPage + i + 1
                      : i + 1}</td>
                  <td className="p-1  dark:text-white">{faq.title}</td>
                  <td className="p-1  dark:text-white">{faq.topic.title}</td>
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
                  <td className="p-1 text-center hidden sm:table-cell mcenter">
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
                  colSpan={6}
                  className="p-1 text-center text-black dark:text-white"
                >
                  No FAQs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      </div>
    </>
  );
};

export default ManageFaq;
