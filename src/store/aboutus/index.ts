import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  Allaboutus: any; // Store login user data
  userTableData: any; // Store user table data
  singleaboutus:any
  singleDevice:any
  groupaboutus:any
}

// Initial state for the slice
const initialState: UserDataState = {
  Allaboutus: null,
  userTableData: null,
  singleaboutus:null,
  singleDevice:null,
  groupaboutus:null
};

// Create the user data slice
export const aboutusSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAllaboutus: (state, action: PayloadAction<any>) => {
      state.Allaboutus = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singleaboutus: (state, action: PayloadAction<any>) => {
        state.singleaboutus = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      groupaboutus: (state, action: PayloadAction<any>) => {
        state.groupaboutus = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.Allaboutus = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setAllaboutus,singleaboutus, clearUserData,groupaboutus } = aboutusSlice.actions;

// Export reducer
export default aboutusSlice.reducer;
