import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  Allsplash: any; // Store login user data
  userTableData: any; // Store user table data
  singlesplash:any
  singleDevice:any
  groupsplash:any
}

// Initial state for the slice
const initialState: UserDataState = {
  Allsplash: null,
  userTableData: null,
  singlesplash:null,
  singleDevice:null,
  groupsplash:null
};

// Create the user data slice
export const splashSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAllsplash: (state, action: PayloadAction<any>) => {
      state.Allsplash = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singlesplash: (state, action: PayloadAction<any>) => {
        state.singlesplash = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      groupsplash: (state, action: PayloadAction<any>) => {
        state.groupsplash = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.Allsplash = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setAllsplash,singlesplash, clearUserData,singleDevices,groupsplash } = splashSlice.actions;

// Export reducer
export default splashSlice.reducer;
