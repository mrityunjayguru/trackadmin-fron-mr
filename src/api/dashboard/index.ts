import { createAsyncThunk } from '@reduxjs/toolkit';
import { setdashboard } from '../../store/Dashboard';
import APIName from '../endPoints';
import { Dashboard } from './dashboard';
import Swal from 'sweetalert2';

interface Payload {
  // Define your payload structure here, for example:
  someField: string; // replace this with actual fields
}
const GetMessage = (type: any, messga: string) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const GetDashboard = createAsyncThunk<boolean, Payload>(
  APIName.VehicleTypes,
  async (payload, thunkAPI) => {
    try {
      const data = await Dashboard.Dashboards(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setdashboard(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")
      }
    }
    return false;
  },
);


