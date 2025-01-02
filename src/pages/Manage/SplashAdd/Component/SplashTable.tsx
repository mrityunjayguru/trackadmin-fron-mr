// import { json, useigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { getSplash } from '../../../../api/Splash';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { manageSinglesplash } from '../../../../api/Splash';
import { AppDispatch } from '../../../../store/store';
import { formatDateToDDMMMYYYYwithTime } from '../../../../common/ManageDate';
// Define the type for the splash object
interface SplashItem {
  No: string;
  image: string;
  hyperLink: string;
  status: string;
  createdAt: string;
}

interface RootState {
  splash: {
    Allsplash: SplashItem[];
  };
}

function SplashTable() {
  //   const navigate = useNavigate();
  const [splash, setSplash] = useState<SplashItem[]>([]); // Use SplashItem[] for state type
  const data = useSelector((state: RootState) => state.splash.Allsplash); // Use RootState for global state type
const [search,setSearch]=useState("")
  useEffect(() => {
    if (data) {
      setSplash(data);
    }
  }, [data]);

  const dispatch = useDispatch<AppDispatch>();

  const getSplashs = async () => {
    const payload: any = {
      search:search
    };
    
    await dispatch(getSplash(payload));
  };

  const handleManageClick = (device: any) => {
    dispatch(manageSinglesplash(device));
  };

  const useDebounce = (func: (...args: any[]) => void, delay: number) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    return (...args: any[]) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetch = useDebounce(getSplashs, 1000);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  // Effect to fetch subscribers when search term or current page changes
  useEffect(() => {
    debouncedFetch();
  }, [search]);
  const getDates=(mydate:any)=>{
    const day = mydate.getFullYear(); // Correct method name
    const month = mydate.getMonth() + 1; // Add 1 to correct the month
    const date = mydate.getDate(); // Get the date
    return `${date}/${month}/${day}`
  }
  return (
    <>
      <div className="flex justify-between gap-1 w-full p-4 text-xl font-semibold text-white bg-[#000] setredius   ">
        <div className="flex gap-1">
          <h1 className="text-[#D9E821]">Splash Records</h1>
        </div>
      </div>

      {/* <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
        <div className="col-span-2">
          <input
            className="w-full py-2 border border-gray-300 px-2 rounded-2xl"
            placeholder="Search"
            type="text"
            onChange={handleSearchChange}
          />
        </div>
        <div className="bg-[#000] rounded-3xl px-3 py-2 text-[#D9E821] text-xl items-center text-center cursor-pointer">
          Filters
        </div>
      </div> */}

      <div className="rounded-sm  xl:pb-1">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#F0F4FD] text-gray-700">
            <tr className=" font-semibold text-base text-center">
              <th className="p-2 sm:text-base">No#</th>
              <th className="p-2 sm:text-base">Image</th>
              <th className="p-2 sm:text-base">Hyperlink</th>
              <th className="p-2 sm:text-base">Created At</th>
              <th className="p-2 sm:text-base">Status</th>
              <th className="p-2 sm:text-base">Manage</th>
            </tr>
          </thead>
          <tbody>
            {splash.map((device, i) => (
              <tr
                key={i}
                className={`border-b text-center border-stroke dark:border-strokedark ${
                  i % 2 === 0 ? 'bg-gray-50 dark:bg-meta-6' : ''
                }`}
              >
                <td className="p-1 text-black dark:text-white">{i + 1}</td>
                <td className="p-1 flex justify-center">
                  <img
                    src={`${import.meta.env.VITE_APP_Image_Url}${device.image}`}
                    alt="Splash"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="p-1">
                  <a
                    href={device.hyperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {device.hyperLink.slice(0, 15)}...
                  </a>
                </td>
                <td className="p-1 text-black dark:text-white">
                {formatDateToDDMMMYYYYwithTime(device.createdAt)}
                </td>
                <td className="p-1">
                  <span
                    className={`text-${
                      device.status === 'Active' ? 'green' : 'red'
                    }-500`}
                  >
                    {device.status}
                  </span>
                </td>
                <td className="p-1 text-[#02B754] cursor-pointe flex justify-center">
                  <FaEye className='text-[#02B754]'
                    style={{ fontSize: '24px' }}
                    onClick={() => handleManageClick(device)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SplashTable;
