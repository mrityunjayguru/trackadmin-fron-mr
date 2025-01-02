import { FaEye } from 'react-icons/fa';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from '../../../components/ModalSettings';
import { updateSuport, getAllSuport } from '../../../api/suport';
import { AppDispatch } from '../../../store/store';
import { formatDateToDDMMMYYYY, formatDateToDDMMMYYYYwithDate } from '../../../common/ManageDate';
// import Pagination from '../../../common/Loader/Pagination';
interface HandleSnNo {
  currentPage: number;
  itemsPerPage: number;
}

interface SuportTableProps {
  handleSnNo: HandleSnNo;
}
const Suporttable = ({ handleSnNo }: SuportTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  // const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [Suportdetails, setSuportdetails] = useState<any>(null); // State to hold selected notification data
  const suportdata = useSelector((state: any) => state.suport?.Allsuport?.records);
  // const total = useSelector((state: any) => state.suport?.Allsuport?.totalCount);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Rejected', label: 'Rejected' },
  ];
  
  useEffect(() => {
  }, [handleSnNo]);
  const viewDetails = (subscriber: any) => {
    const suportData = {
      title: subscriber.suport, // Use subject from subscriber
      description: subscriber.description, // Use description
      createdAt: subscriber.createdAt, // Set creation time
      emailAddress: subscriber.userdata.emailAddress, // Set email
      name: subscriber.userdata.Name, // Set user name
    };
    setSuportdetails(suportData);
    setIsModalOpen(true); // Open the modal
  };
const [disabled,setdisabled]=useState(false)
  const handleStatusChange = async (selectedOption: any, subscriberId: any) => {
    const payload: any = {
      status: selectedOption.value,
      _id: subscriberId,
    };
    try {
      await dispatch(updateSuport(payload));
      await dispatch(getAllSuport(payload));
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };
useEffect(()=>{
  if (
    loginUser.permissions.Support?.Update != true &&
    loginUser.role != 'SuperAdmin'
  ){
    setdisabled(true)
   
  }
},[])
  return (
    <>
      <div className="rounded-sm  xl:pb-1 overflow-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#F0F4FD] text-gray-700">
            <tr>
              <th className="px-1 py-0.5">No#</th>
              <th className="px-1 py-0.5">Date</th>
              <th className="px-1 py-0.5">Name</th>
              <th className="px-1 py-0.5">Email</th>

              <th className="px-1 py-0.5">Subject</th>
              <th className="px-1 py-0.5">Detail</th>
              <th className="px-1 py-0.5">Status</th>
              <th className="px-1 py-0.5">Manage</th>
            </tr>
          </thead>
          <tbody>
  {suportdata && suportdata.length > 0 ? (
    suportdata.map((subscriber: any, i: number) => (
      <tr
        key={subscriber.id} // Use subscriber.id for unique key
        className={`border-b border-stroke dark:border-strokedark  text-[14px] font-medium ${
          subscriber.status === 'Resolved' ? 'text-[#949495]' : 'text-black'
        }`}
      >
        <td className="px-1 py-0.5 text-center">
          {handleSnNo?.currentPage > 1
            ? (handleSnNo?.currentPage - 1) * handleSnNo?.itemsPerPage + i + 1
            : i + 1}
        </td>
        <td className="px-1  py-0.5 text-center">
          {formatDateToDDMMMYYYY(subscriber.updatedAt)}
        </td>
        <td className="px-1 py-0.5 text-center">
          {subscriber.userdata.Name}
        </td>
        <td className="px-1 py-0.5 text-center">
  {subscriber.userdata.emailAddress.length > 15
    ? `${subscriber.userdata.emailAddress.slice(0, 15)}...`
    : subscriber.userdata.emailAddress}
</td>

        <td className="px-1 py-0.5 text-center">
          {subscriber.suport.length > 15
            ? `${subscriber.suport.slice(0, 15)}...`
            : subscriber.suport}
        </td>
        <td className="px-1 py-0.5 text-center">
          {subscriber.description.length > 15
            ? `${subscriber.description.slice(0, 15)}...`
            : subscriber.description}
        </td>
        <td className="px-1 py-0.5 text-center">
        <Select
  key={subscriber.status}  // Force re-render when status changes
  isSearchable={false}
  options={statusOptions}
  defaultValue={statusOptions.find(
    (option) => option.value === subscriber.status
  )}
  onChange={(selectedOption) =>
    handleStatusChange(selectedOption, subscriber._id)
  }
  styles={{
    control: (provided) => ({
      ...provided,
      width: '100%',
      minHeight: '38px',
      textOverflow: 'ellipsis',
      overflow: 'visible',
      whiteSpace: 'normal',
      backgroundColor: subscriber.status === 'Resolved' ? '#f5f5f5' : '#fff',
      color: subscriber.status === 'Resolved' ? 'gray' : '#000',
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%',
      maxHeight: '300px',
      overflowY: 'auto',
    }),
    option: (provided) => ({
      ...provided,
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      overflow: 'visible',
    }),
  }}
/>

        </td>
        <td className="px-1 py-0.5 flex justify-center text-center">
          <FaEye
            className="text-[#02B754]"
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => viewDetails(subscriber)} // Open modal on click
          />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="px-1 py-0.5 text-center">
        No support data available.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {/* Render Modal when isModalOpen is true */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          suportdetail={Suportdetails} // Pass selected notification data to the modal
        />
      )}
    </>
  );
};

export default Suporttable;
