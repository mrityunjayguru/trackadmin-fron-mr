import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface manageSettingState {
  AllmanageSettingt: any; // Store login user data
  userTableData: any; // Store user table data
  singlemanageSettingt:any
  singleDevice:any
  groupmanageSettingt:any
}

// Initial state for the slice
const initialState: manageSettingState = {
  AllmanageSettingt: null,
  userTableData: null,
  singlemanageSettingt:null,
  singleDevice:null,
  groupmanageSettingt:null
};

// Create the user data slice
export const manageSettingtSlice = createSlice({
  name: 'manageSetting',
  initialState,
  reducers: {
    setAllmanageSettingt: (state, action: PayloadAction<any>) => {
      state.AllmanageSettingt = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singlemanageSettingt: (state, action: PayloadAction<any>) => {
        state.singlemanageSettingt = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      groupmanageSettingt: (state, action: PayloadAction<any>) => {
        state.groupmanageSettingt = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.AllmanageSettingt = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setAllmanageSettingt,singlemanageSettingt, clearUserData,singleDevices,groupmanageSettingt } = manageSettingtSlice.actions;

// Export reducer
export default manageSettingtSlice.reducer;
