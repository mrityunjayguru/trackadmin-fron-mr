import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface AdminData {
  Admin: any; 
  singleAdmin:any
}

// Initial state for the slice
const initialState: AdminData = {
  Admin: null,
  singleAdmin:null
};

// Create the user data slice
export const AdminSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<any>) => {
      state.Admin = action.payload; // Set login user data
    },
    setSingleAdmin: (state, action: PayloadAction<any>) => {
      state.singleAdmin = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setAdmin,setSingleAdmin } = AdminSlice.actions;

// Export reducer
export default AdminSlice.reducer;
