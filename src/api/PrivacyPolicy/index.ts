import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllprivacyandPolicy } from "../../store/PrivacyandPolicy";
import APIName from "../endPoints";
import { PrivacyPolicyRepo } from "./PrivacyPolicyRepo";
import Swal from "sweetalert2";

interface Payload {
  // Define your payload structure here, for example:
  someField: string; // replace this with actual fields
}
const GetMessage = (type:any, messga:any) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const getPrivacyPolicy = createAsyncThunk<boolean, Payload>(
  APIName.getPrivacyPolicy,
  async (payload, thunkAPI) => {
    try {
      const data = await PrivacyPolicyRepo.getPrivacyPolicy(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllprivacyandPolicy(data.data.data));
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
      thunkAPI.dispatch(getPrivacyPolicy(payload));

      
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

export const updatePrivacyandPolicy = createAsyncThunk<boolean, Payload>(
  APIName.updatePrivacyPolicy,
  async (payload) => {
    try {
      const data = await PrivacyPolicyRepo.updatePrivacyPolicy(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        // thunkAPI.dispatch(getPrivacyPolicy(data.data.data));
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

export const createPrivacyPolicy = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload) => {
    try {
      const data = await PrivacyPolicyRepo.createPrivacyPolicy(payload);
      if (data.status === 200) {
        GetMessage("success","success")
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
        thunkAPI.dispatch(getPrivacyPolicy(payload));
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
      const data = await PrivacyPolicyRepo.updatePrivacyPolicy(payload);
      if (data.status === 200) {
        GetMessage("success","Devices Updated")
        thunkAPI.dispatch(getPrivacyPolicy(data.data.data));
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