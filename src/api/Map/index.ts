import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAllmapDetails,
  searchusers,
  setSearchDevices,
} from '../../store/manageMap';
import APIName from '../endPoints';
import { mapRepo } from './mapRepo';
import Swal from 'sweetalert2';
interface Payload {
  someField: string; // replace this with actual fields
}
const GetMessage = (type: any, messga: any) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const getmapDetails = createAsyncThunk<boolean, Payload>(
  APIName.getmanageMap,
  async (payload, thunkAPI) => {
    try {
      const data = await mapRepo.getmanageMap(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllmapDetails(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem('token');
        GetMessage('warning', 'Unauthorized');
        window.location.href = '/auth/signin';
      } else {
        GetMessage('warning', 'something went wrong');
      }
    }
    return false;
  },
);

export const searchuser = createAsyncThunk<boolean, Payload>(
  APIName.searchuser,
  async (payload, thunkAPI) => {
    try {
      const data = await mapRepo.searchuser(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(searchusers(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem('token');
        GetMessage('warning', 'Unauthorized');
        window.location.href = '/auth/signin';
      } else {
        GetMessage('warning', 'something went wrong');
      }
    }
    return false;
  },
);
export const searchDevices = createAsyncThunk<boolean, Payload>(
  APIName.searchDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await mapRepo.searchDevices(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setSearchDevices(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem('token');
        GetMessage('warning', 'Unauthorized');
        window.location.href = '/auth/signin';
      } else {
        GetMessage('warning', 'something went wrong');
      }
    }
    return false;
  },
);

export const handlemapSocketData = createAsyncThunk<boolean, Payload>(
  APIName.searchDevices,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setSearchDevices(payload));
      return true;
    } catch (err: any) {}
    return false;
  },
);

export const setblank = createAsyncThunk<boolean, Payload>(
  APIName.searchuser,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAllmapDetails(payload));
      return true;
    } catch (err: any) {}
    return false;
  },
);
