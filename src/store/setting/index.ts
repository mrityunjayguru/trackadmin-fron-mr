import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  Allsetting: any; // Store login user data
  userTableData: any; // Store user table data
  singlesetting:any
  singleDevice:any
  groupsetting:any
}

// Initial state for the slice
const initialState: UserDataState = {
  Allsetting: null,
  userTableData: null,
  singlesetting:null,
  singleDevice:null,
  groupsetting:null
};

// Create the user data slice
export const settingSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAllsetting: (state, action: PayloadAction<any>) => {
      state.Allsetting = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singlesetting: (state, action: PayloadAction<any>) => {
        state.singlesetting = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      groupsetting: (state, action: PayloadAction<any>) => {
        state.groupsetting = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.Allsetting = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setAllsetting,singlesetting, clearUserData,singleDevices,groupsetting } = settingSlice.actions;

// Export reducer
export default settingSlice.reducer;
