import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllaboutus,singleaboutus } from "../../store/aboutus";
import APIName from "../endPoints";
import { userRepo } from "./aboytUsRepo";
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
export const getAboutusRecord = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.getAboutusRecord(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllaboutus(data.data.data));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  }
);

export const singleSubscribers = createAsyncThunk<boolean, Payload>(
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singleaboutus(payload));      
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
      const data = await userRepo.updatedevices(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        thunkAPI.dispatch(singleaboutus(data.data.data));
        return true;
      }
    } catch (err) {
      GetMessage("error","Something went wrong")
      console.error(err);
    }
    return false;
  }
);

export const createAboutus = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload) => {
    try {
      const data = await userRepo.createAboutus(payload);
      if (data.status === 200) {
        GetMessage("success","success")
        // thunkAPI.dispatch(singleSubscriber(data.data.data));
        return true;
      }
    } catch (err:any) {
      GetMessage("error","something went wrong")
    
    }
    return false;
  }
);
export const manageSingleDevices = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(singleaboutus(payload));
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
        GetMessage("success","success")
        thunkAPI.dispatch(singleaboutus(data.data.data));
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