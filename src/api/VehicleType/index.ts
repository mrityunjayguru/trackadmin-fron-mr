import { createAsyncThunk } from '@reduxjs/toolkit';
import { setvehicleType,singlevehicles } from '../../store/VehicleTypes';
import APIName from '../endPoints';
import { vehicleRepo } from './vehicleRepo';
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
export const fetchVehicleType = createAsyncThunk<boolean, Payload>(
  APIName.VehicleTypes,
  async (payload, thunkAPI) => {
    try {
      const data = await vehicleRepo.fetchVehicleTypes(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setvehicleType(data.data.data));
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

export const singlevehicle = createAsyncThunk<boolean, Payload>(
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singlevehicles(payload));
    } catch (err) {
      console.error(err);
    }
    return false;
  },
);

export const editvehicle = createAsyncThunk<boolean, Payload>(
  APIName.updatevehicle,
  async (payload, thunkAPI) => {
    try {
      const data = await vehicleRepo.updatevehicle(payload);
      if (data.status === 200) {
        GetMessage('success', 'Records Updated');
        thunkAPI.dispatch(singlevehicle(data.data.data));
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
  },
);

export const AddVehicleType = createAsyncThunk<boolean, Payload>(
  APIName.createVehicle,
  async (payload) => {
    try {
      const data = await vehicleRepo.createVehicleType(payload);
      if (data.status === 200) {
        GetMessage('success', 'Vehicle Added');
        // thunkAPI.dispatch(singlevehicle(data.data.data));
        return true;
      }
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
