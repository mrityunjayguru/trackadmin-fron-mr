import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAllFFaQPriorityt, singleFFaQPriorityt } from '../../store/FaQPriority';
import APIName from '../endPoints';
import { userRepo } from './FaQPriorityRepo';
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
export const GetFaQPrioritys = createAsyncThunk<boolean, Payload>(
  APIName.getFaQList,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.GetFaQPriority(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllFFaQPriorityt(data.data.data));
        return true;
      }
    } catch (err:any) {
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

export const singleFaQPriorityLis = createAsyncThunk<boolean, Payload>(
  APIName.getFaQList,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singleFFaQPriorityt(payload));
    } catch (err:any) {
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

export const editFaQPriorityList = createAsyncThunk<boolean, Payload>(
  APIName.getFaQList,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.updateFaQPriority(payload);
      if (data.status === 200) {
        GetMessage('success', 'success');
        thunkAPI.dispatch(singleFFaQPriorityt(data.data.data));
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
    }
    return false;
  },
);

export const addFaQPriorityList = createAsyncThunk<boolean, Payload>(
  APIName.createFaQList,
  async (payload) => {
    try {
      const data = await userRepo.addFaQPriority(payload);
      if (data.status === 200) {
        GetMessage('success', 'Success');
        // thunkAPI.dispatch(singleFaQList(data.data.data));
        return true;
      }
    } catch (err: any) {
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
    }
    return false;
  },
);

