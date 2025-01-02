import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoginUserData, setUserTableData } from "../../store/Auth";
import APIName from "../endPoints";
import { AuthRepo } from "./authRepo";
import Swal from "sweetalert2";

interface Payload {
  email?: string; // Add optional fields for email and password
  password?: string;
  someField?: string; // Replace this with actual fields as necessary
}

export const adminLogin = createAsyncThunk<boolean, Payload>(
  APIName.login,
  async (payload, thunkAPI) => {
    const npayload = {
      phone: payload.email,
      password: payload.password,
    };

    try {
      const data = await AuthRepo.adminLogin(npayload);
      if (data.status === 200) {
        localStorage.setItem("token", data.data.token);
        thunkAPI.dispatch(setLoginUserData(data.data.data));
        showMessage("success", "Successfully logged in");
        return true; // Return true on successful login
      }
    } catch (err: any) {
      console.error(err); // Log the error for debugging
      if (err.response?.status === 403) {
        showMessage("error", "Invalid Credentials");
      } else if (err.response?.status === 400) {
        showMessage("error",err.response?.data.message);
      }
    }
    return false; // Return false on failure
  }
);

export const registerUser = createAsyncThunk<boolean, Payload>(
  APIName.register,
  async (payload, thunkAPI) => {
    try {
      const data = await AuthRepo.register(payload);
      if (data.status === 200) {
        localStorage.setItem("token", data.data.user.token);
        thunkAPI.dispatch(setLoginUserData(data.data.user));
        showMessage("success", "Successfully registered");
        return true;
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 409) {
        showMessage("error", "User already exists");
      } else if (err.response?.status === 401) {
        showMessage("error", "Unauthorized");
      }
    }
    return false;
  }
);

export const adminRegister = createAsyncThunk<boolean, Payload>(
  APIName.getBillboard,
  async (payload, thunkAPI) => {
    try {
      const response = await AuthRepo.adminRegister(payload);
      if (
        response.data.Responsecode === 100 &&
        response.data.message === "GET Data Successfully"
      ) {
        thunkAPI.dispatch(setUserTableData(response.data.data)); // Update this line based on your implementation
        return true;
      }
    } catch (err: any) {
      console.error(err);
    }
    return false;
  }
);

export const updateProfile = createAsyncThunk<boolean, Payload>(
  APIName.updateprofile,
  async (payload, thunkAPI) => {
    try {
      const response = await AuthRepo.updateProfile(payload);
      if (response.status === 200) {
        thunkAPI.dispatch(setLoginUserData(response.data.data));
        // thunkAPI.dispatch(setUserTableData(response.data.user)); // Ensure you're using the correct action
        return true;
      }
    } catch (err: any) {
      console.error(err);
    }
    return false;
  }
);

export const allUsers = createAsyncThunk<boolean, Payload>(
  APIName.alluser,
  async (payload, thunkAPI) => {
    try {
      const response = await AuthRepo.allUsers(payload);
      if (response.status === 200) {
        thunkAPI.dispatch(setUserTableData(response.data.user)); // Ensure you're using the correct action
        return true;
      }
    } catch (err: any) {
      console.error(err);
    }
    return false;
  }
);

const showMessage = (type: "success" | "error", message: string) => {
  Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};
