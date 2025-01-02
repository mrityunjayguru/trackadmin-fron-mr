import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  AllFFaQPriorityt: any; // Store login user data
  userTableData: any; // Store user table data
  singleFFaQPriorityt:any
  singleDevice:any
  groupFFaQPriorityt:any
}

// Initial state for the slice
const initialState: UserDataState = {
  AllFFaQPriorityt: null,
  userTableData: null,
  singleFFaQPriorityt:null,
  singleDevice:null,
  groupFFaQPriorityt:null
};

// Create the user data slice
export const FFaQPrioritytSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAllFFaQPriorityt: (state, action: PayloadAction<any>) => {
      state.AllFFaQPriorityt = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singleFFaQPriorityt: (state, action: PayloadAction<any>) => {
        state.singleFFaQPriorityt = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      groupFFaQPriorityt: (state, action: PayloadAction<any>) => {
        state.groupFFaQPriorityt = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.AllFFaQPriorityt = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setAllFFaQPriorityt,singleFFaQPriorityt, clearUserData,singleDevices,groupFFaQPriorityt } = FFaQPrioritytSlice.actions;

// Export reducer
export default FFaQPrioritytSlice.reducer;
