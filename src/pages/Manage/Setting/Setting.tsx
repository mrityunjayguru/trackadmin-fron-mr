import  { useEffect, useState } from 'react';
import HandleSetting from './Component/HandleSetting';
import { useSelector, useDispatch } from 'react-redux';
import { getsetting } from '../../../api/setting';
import { AppDispatch } from '../../../store/store';
import Breadcrumb from '../../../common/Breadcrumb';
function Setting() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state.setting.Allsetting); // Access the settings data from Redux
  const [setting, setSetting] = useState<any[]>([]);

  // Load settings from Redux store into local state
  useEffect(() => {
    if (data && data.length > 0) {
      setSetting(data);
    }
    console.log(setting, "settingsetting");
  }, [data]);

  // Dispatch to fetch settings initially
  useEffect(() => {
    const payload: any = {};
    dispatch(getsetting(payload));
  }, [dispatch]);

  return (
    <div>
      <div className=""><Breadcrumb/></div>

      {/* Pass settings data dynamically to each HandleSetting component */}
      {setting.length > 0 ? (
        <>
          <HandleSetting text="Settings Screen AD 1" data={setting[0]} />  {/* If settings exist, pass them */}
          <HandleSetting text="Settings Screen AD 2" data={setting[1]} />
        </>
      ) : (
        <>
          <HandleSetting text="Settings Screen AD 1" data={null} />  {/* If no settings, pass null */}
          <HandleSetting text="Settings Screen AD 2" data={null} />
        </>
      )}
    </div>
  );
}

export default Setting;
