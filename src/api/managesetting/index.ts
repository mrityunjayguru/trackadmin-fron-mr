import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllmanageSettingt } from "../../store/manageSetting";
import APIName from "../endPoints";
import { manageSettingRepo } from "./managesettingRepo";
import Swal from "sweetalert2";

interface Payload {
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
export const getmanageSetting = createAsyncThunk<boolean, Payload>(
  APIName.getmanageSetting,
  async (payload, thunkAPI) => {
    try {
      const data = await manageSettingRepo.getmanageSetting(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllmanageSettingt(data.data.data));
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
      thunkAPI.dispatch(getmanageSetting(payload));

      
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

export const createmanageSetting = createAsyncThunk<boolean, Payload>(
  APIName.createmanageSetting,
  async (payload) => {
    try {
      const data = await manageSettingRepo.createmanageSetting(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        // thunkAPI.dispatch(getmanageSetting(data.data.data));
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

export const updatemanageSetting = createAsyncThunk<boolean, Payload>(
  APIName.updatemanageSetting,
  async (payload) => {
    try {
      const data = await manageSettingRepo.updatemanageSetting(payload);
      if (data.status === 200) {
        GetMessage("success","success")
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






