import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllsetting,singlesetting,singleDevices } from "../../store/setting";
import APIName from "../endPoints";
import { userRepo } from "./setting";
import Swal from "sweetalert2";

interface Payload {
  // Define your payload structure here, for example:
  someField: string; // replace this with actual fields
}
const GetMessage = (type:any, messga:string) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const getsetting = createAsyncThunk<boolean, Payload>(
  APIName.getsetting,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.getsetting(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllsetting(data.data.data));
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
  }
);

export const singleSubscribers = createAsyncThunk<boolean, Payload>(
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singlesetting(payload));

      
    } catch (err) {
      console.error(err);
    }
    return false;
  }
);

export const editSubscriber = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.createsetting(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        thunkAPI.dispatch(singlesetting(data.data.data));
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
  }
);

export const createsetting = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload) => {
    try {
      const data = await userRepo.createsetting(payload);
      if (data.status === 200) {
        GetMessage("success","success")
        // thunkAPI.dispatch(singleSubscriber(data.data.data));
        return true;
      }
    } catch (err:any) {
     
      if(err.status==500){
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
    }
    return false;
  }
);
export const manageSingleDevices = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(singleDevices(payload));
        return true;
    } catch (err:any) {
     
    }
    return false;
  }
);


export const updateDevices = createAsyncThunk<boolean, Payload>(
  APIName.updateDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.updatedevices(payload);
      if (data.status === 200) {
        GetMessage("success","Devices Updated")
        thunkAPI.dispatch(singleDevices(data.data.data));
        return true;
      }
    } catch (err:any) {
     
      if(err.status==500){
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
    }
    return false;
  }
);