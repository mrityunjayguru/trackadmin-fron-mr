import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllNotification } from "../../store/Notification";
import APIName from "../endPoints";
import { notificationRepo } from "./notificationRepo";
import Swal from "sweetalert2";
// import ManageNotification from "../../pages/Notification/Component/ManageNotification";
 
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
const handlenotificationsend=async()=>{
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action will send notification the user.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!"
  });
  return result
}
export const getNotification = createAsyncThunk<boolean, Payload>(
  APIName.getNotification,
  async (payload, thunkAPI) => {
    try {
      const data = await notificationRepo.getNotification(payload);
      if (data.status === 200) {
        const payload={
          records:data.data.data,
          totalcount:data.data.totalCount
        }
        thunkAPI.dispatch(setAllNotification(payload));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
     
    }
    return false;
  }
);

export const createNotification = createAsyncThunk<boolean, Payload>(
  APIName.createNotification,
  async (payload) => {
    try {
const isSedn=await handlenotificationsend()
if(isSedn.isConfirmed==false){
return false
}
      const data = await notificationRepo.createNotification(payload);
      if (data.status === 200) {
        GetMessage("success","success")
        // thunkAPI.dispatch(searchusers(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")

      }
    }
    return false;
  }
);


export const sendPushNotifications = createAsyncThunk<boolean, Payload>(
  APIName.sendPushNotification,
  async (payload) => {
    try {
      const data = await notificationRepo.sendPushNotification(payload);
      if (data.status === 200) {
   
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")

      }
    
    }
    return false;
  }
);








