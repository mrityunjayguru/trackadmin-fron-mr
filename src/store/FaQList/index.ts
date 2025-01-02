import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  AllFaqList: any; // Store login user data
  userTableData: any; // Store user table data
  singleFaqList:any
  singleDevice:any
  groupFaqList:any
}

// Initial state for the slice
const initialState: UserDataState = {
  AllFaqList: null,
  userTableData: null,
  singleFaqList:null,
  singleDevice:null,
  groupFaqList:null
};

// Create the user data slice
export const FaqListSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAllFaqList: (state, action: PayloadAction<any>) => {
      state.AllFaqList = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singleFaqList: (state, action: PayloadAction<any>) => {
        state.singleFaqList = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      groupFaqList: (state, action: PayloadAction<any>) => {
        state.groupFaqList = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.AllFaqList = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setAllFaqList,singleFaqList, clearUserData,singleDevices,groupFaqList } = FaqListSlice.actions;

// Export reducer
export default FaqListSlice.reducer;
