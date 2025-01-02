import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllsplash,singlesplash } from "../../store/splash";
import APIName from "../endPoints";
import { userRepo } from "./splashAd";
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
export const getSplash = createAsyncThunk<boolean, Payload>(
  APIName.getsplash,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.getSplash(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllsplash(data.data.data));
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
      thunkAPI.dispatch(singlesplash(payload));

      
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
      const data = await userRepo.createSplash(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        thunkAPI.dispatch(singlesplash(data.data.data));
        return true;
      }
    } catch (err) {
      GetMessage("error","Something went wrong")
      console.error(err);
    }
    return false;
  }
);

export const createSplash = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload) => {
    try {
      const data = await userRepo.createSplash(payload);
      if (data.status === 200) {
        GetMessage("success","splash Created")
        // thunkAPI.dispatch(singleSubscriber(data.data.data));
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
export const manageSinglesplash = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(singlesplash(payload));
        return true;
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


export const updatesplash = createAsyncThunk<boolean, Payload>(
  APIName.updateSplash,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.updatedevices(payload);
      if (data.status === 200) {
        GetMessage("success","splash Updated")
        thunkAPI.dispatch(singlesplash(data.data.data));
        let val=[]
        val.push(data.data.data)
        thunkAPI.dispatch(setAllsplash(val));
        return true;
      }
    } catch (err:any) {
     
      if(err.status==500){
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
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