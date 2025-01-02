import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllSubscriber,singleSubscriber,groupSubscriber } from "../../store/subscriber";
import APIName from "../endPoints";
import { userRepo } from "./userRepo";
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
export const Getsubscribers = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data:any = await userRepo.Getsubscribers(payload);
   
      if (data.status === 200) {
        const payload={
          records:data.data.data,
          totalCount:data.data.totalCount
        }
        thunkAPI.dispatch(setAllSubscriber(payload));
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
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singleSubscriber(payload));
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

export const editSubscriber = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.updateSubscriber(payload);
      if (data.status === 200) {
        GetMessage("success","Updated")
        thunkAPI.dispatch(singleSubscriber(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==400){
        GetMessage("warning", err.response.data.message);
      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
      if(err.status==500){
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);

export const AddSubscriber = createAsyncThunk<boolean, Payload>(
  APIName.addNewSubscriber,
  async (payload) => {
    try {
      const data = await userRepo.addNewSubscriber(payload);
      if (data.status === 200) {
        GetMessage("success","success")
        // thunkAPI.dispatch(singleSubscriber(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status===400){
      console.log(err,"errerr")
        GetMessage("warning",err.response.data.message);
      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  }
);


export const GroupSubscriber = createAsyncThunk<boolean, Payload>(
  APIName.groupSubesciber,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.groupSubscriber(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(groupSubscriber(data.data.data));
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