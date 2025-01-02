import CommonHeader from '../../../../common/CommonHeader';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { updateDeviceType } from '../../../../api/DeviceType';
import { AppDispatch } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { editDeviceTypeKeys } from '../../../../Utility/FolmKeys/DeviceType/editDeviceTypeKeys';
import { useNavigate } from 'react-router-dom';

function EditDeviceType() {
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const editDeviceType = useSelector(
    (state: any) => state?.DeviceTye.singleDeviceType,
  );
  const handleSubmit = (val: any) => {
    try {
        const payload:any={
            ...val,
            _id:editDeviceType._id
        }

      dispatch(updateDeviceType(payload));
      navigate("/manage/ManageDevice")
    } catch (err) {
      console.log(err);
    }
  };
  const propsData = {
    title: 'Edit Device Type',
    button: '',
    redirect: '',
  };
  return (
    <>
      <CommonHeader propsData={propsData} />

      <div className="my-5">
        <GlobalForm
          fields={editDeviceTypeKeys(editDeviceType)}
          handleSubmit={handleSubmit}
          buttontext="Submit"
        />
      </div>
    </>
  );
}

export default EditDeviceType;
