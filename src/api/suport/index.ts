import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAllsuport
} from '../../store/suport';
import APIName from '../endPoints';
import { userRepo } from './suportRepo';
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
export const getAllSuport = createAsyncThunk<boolean, Payload>(
  APIName.getsupoer,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.getsupoer(payload);
      if (data.status === 200) {
        const payload={
          records:data.data.data,
          totalCount:data.data.totalCount
        }
        thunkAPI.dispatch(setAllsuport(payload));
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

export const updateSuport = createAsyncThunk<boolean, Payload>(
  APIName.updateSuport,
  async (payload) => {
    try {
      const data = await userRepo.updateSuport(payload);
      if (data.status === 200) {
        GetMessage('success', 'success');
        // thunkAPI.dispatch(singleDevices(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage('error', err.response.data.message);
      }
    }
    return false;
  },
);
