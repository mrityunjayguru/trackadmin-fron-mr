import CommonHeader from '../../../../common/CommonHeader';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { DevicesType } from '../../../../Utility/FolmKeys/DeviceType/DevicesType';
import { addDeviceType } from '../../../../api/DeviceType';
import { AppDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function AddDeviceType() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (payload: any) => {
    try {
      dispatch(addDeviceType(payload));
      navigate('/manage/ManageDevice');
    } catch (err) {
      console.log(err);
    }
  };
  const propsData = {
    title: 'Add Device Type',
    button: '',
    redirect: '',
  };
  return (
    <>
      <CommonHeader propsData={propsData} />

      <div className="my-5">
        <GlobalForm
          fields={DevicesType}
          handleSubmit={handleSubmit}
          buttontext="Add Type"
        />
      </div>
    </>
  );
}

export default AddDeviceType;
