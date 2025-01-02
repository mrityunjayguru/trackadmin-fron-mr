import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface mapState {
  AllmapDetails: any; // Store login user data
  searchusers: any; // Store user table data
  singlemapDetails:any
  singleDevice:any
  groupmapDetails:any
  devicesList:any
  autoZoom:Boolean
}

// Initial state for the slice
const initialState: mapState = {
  AllmapDetails: null,
  searchusers: null,
  singlemapDetails:null,
  singleDevice:null,
  groupmapDetails:null,
  devicesList:null,
  autoZoom:false
};

// Create the user data slice
export const mapDetailsSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    setAllmapDetails: (state, action: PayloadAction<any>) => {
      state.AllmapDetails = action.payload; // Set login user data
    },
    searchusers: (state, action: PayloadAction<any>) => {
      state.searchusers = action.payload; // Set login user data
    },
    setSearchDevices: (state, action: PayloadAction<any>) => {
      state.devicesList = action.payload; // Set login user data
    },
    setZomm: (state, action: PayloadAction<any>) => {
      state.autoZoom = action.payload; // Set login user data
    },
    handleSocketData: (state, action: PayloadAction<any>) => {
      state.autoZoom = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setAllmapDetails,searchusers,setSearchDevices,setZomm,handleSocketData} = mapDetailsSlice.actions;

// Export reducer
export default mapDetailsSlice.reducer;
