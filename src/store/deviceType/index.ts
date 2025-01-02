import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
deviceType:any,
singleDeviceType:any
}
const initialState: DeviceState = {
  deviceType: null,
  singleDeviceType:null
};
export const DeviceTypeSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setDeviceType: (state, action: PayloadAction<any>) => {
      state.deviceType = action.payload; // Set login user data
    },
    setsingleDeviceType: (state, action: PayloadAction<any>) => {
      state.singleDeviceType = action.payload; // Set login user data
    },
  },
});
export const {setDeviceType,setsingleDeviceType } = DeviceTypeSlice.actions;

export default DeviceTypeSlice.reducer;
