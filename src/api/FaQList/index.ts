import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAllFaqList, singleFaqList } from '../../store/FaQList';
import APIName from '../endPoints';
import { userRepo } from './FaQListRepo';
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
export const GetFaQLisy = createAsyncThunk<boolean, Payload>(
  APIName.getFaQList,
  async (payload, thunkAPI) => {
    try {
      const data:any = await userRepo.GetFaQLisy(payload);
      if (data.status === 200) {
        const payload={
          result:data.data.data,
          count:data.data.totalCount
        }
        thunkAPI.dispatch(setAllFaqList(payload));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  },
);

export const singleFaQLis = createAsyncThunk<boolean, Payload>(
  APIName.getFaQList,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singleFaqList(payload));
    } catch (err) {
      console.error(err);
    }
    return false;
  },
);

export const editFaQList = createAsyncThunk<boolean, Payload>(
  APIName.getFaQList,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.updateFaQList(payload);
      if (data.status === 200) {
        GetMessage('success', 'Records Updated');
        thunkAPI.dispatch(singleFaqList(data.data.data));
        return true;
      }
    } catch (err:any) {

      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }if(err.status==500){
        GetMessage("warning", "something went wrong");
      }
      console.error(err);
    }
    return false;
  },
);

export const addFaQList = createAsyncThunk<boolean, Payload>(
  APIName.createFaQList,
  async (payload) => {
    try {
      const data = await userRepo.addFaQList(payload);
      if (data.status === 200) {
        GetMessage('success', 'Success');
        // thunkAPI.dispatch(singleFaQList(data.data.data));
        return true;
      }
    } catch (err: any) {
      if(err.status==400){
        GetMessage("warning", "Priority AllReady Exists");
      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);
export const manageSingleFaQList = createAsyncThunk<boolean, Payload>(
  APIName.createFaQList,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singleFaqList(payload));
      return true;
    } catch (err: any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  },
);
