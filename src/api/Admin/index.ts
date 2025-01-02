import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAdmin,setSingleAdmin } from '../../store/Admin';
import APIName from '../endPoints';
import { AdminRepo } from './AdminRepo';
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
export const AddNewAdmin = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload)=> {
    try {
      const data = await AdminRepo.AddAdmin(payload);
      if (data.status === 200) {
        GetMessage("success", "success")
        // thunkAPI.dispatch(setdashboard(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 400) {
        // console.error(err.response.data.message);

        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
      if(err.status==400){
        GetMessage("warning", "Mobile No Already Exists");
      }
      else{
        GetMessage("error","something went wrong")

      }
    }
    return false;
  },
);


export const AllAdmin = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload, thunkAPI) => {
    try {
      const data = await AdminRepo.AllAdmin(payload);
      if (data.status === 200) {
        const payload={
          records:data.data.data,
          totalcount:data.data.totalCount
        }
        thunkAPI.dispatch(setAdmin(payload));
        return true;
      }
    } catch (err: any) {
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
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


export const singleAdmin = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload, thunkAPI) => {
    try {
      // const data = await AdminRepo.AllAdmin(payload);
  
        thunkAPI.dispatch(setSingleAdmin(payload));
        return true;
    } catch (err: any) {
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
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

export const updateAdmin = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload) => {
    try {
      const data = await AdminRepo.updateAdmin(payload);
      if (data.status === 200) {
        GetMessage("success", "success")
      }
        return true;
    } catch (err: any) {
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")

      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
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


