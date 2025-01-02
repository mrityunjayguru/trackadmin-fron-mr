import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  loginUserData: any; // Store login user data
  userTableData: any; // Store user table data
}

// Initial state for the slice
const initialState: UserDataState = {
  loginUserData: null,
  userTableData: null,
};

// Create the user data slice
export const authDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoginUserData: (state, action: PayloadAction<any>) => {
        console.log(action.payload,"payloadpayload")
      state.loginUserData = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    clearUserData: (state) => {
      state.loginUserData = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },
  },
});

// Export actions
export const { setLoginUserData, setUserTableData, clearUserData } = authDataSlice.actions;

// Export reducer
export default authDataSlice.reducer;
