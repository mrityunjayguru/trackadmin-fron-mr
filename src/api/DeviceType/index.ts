import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDeviceType,setsingleDeviceType} from "../../store/deviceType";
import APIName from "../endPoints";
import { deviceTypeRepo } from "./deviceTypeRepo";
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
export const addDeviceType = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await deviceTypeRepo.addDeviceType(payload);
      if (data.status === 200) {
        GetMessage("success","Records created")
       
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
      console.error(err);
    }
    return false;
  }
);



export const getDeviceType = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await deviceTypeRepo.getDeviceType(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setDeviceType(data.data.data));
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
      console.error(err);
    }
    return false;
  }
);

export const singleDeviceType = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload,thunkAPI) => {
    try {
        thunkAPI.dispatch(setsingleDeviceType(payload));
        return true;
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
      if(err.status==400){
        console.error(err.response.data.message);
          GetMessage("error",err.response.data.message)
        }
      else{
        GetMessage("error","something went wrong")

      }
    
    }
    return false;
  }
);


export const updateDeviceType = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await deviceTypeRepo.updateDeviceType(payload);
      if (data.status === 200) {
        GetMessage("success","Records updated")
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
      console.error(err);
    }
    return false;
  }
)