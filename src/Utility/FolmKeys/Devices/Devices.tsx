export const vehicleFields = (devicetypeDetails: any,DealerRecord:any) => {
  let vehicleTypeData: any = localStorage.getItem('vehicleTypeData');
  let parsedata = JSON.parse(vehicleTypeData);
  const formattedVehicleTypes = parsedata?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName,
    value: vehicle._id,
    icon: vehicle.icons,
  }));
  const DeviceType: any = devicetypeDetails?.map((vehicle: any) => ({
    label: vehicle.deviceType,
    value: vehicle._id,
  }));
  const dealearRecord: any = DealerRecord?.map((dealer: any) => ({
    label: dealer.Name,
    value: dealer._id,
  }));

  return [
    {
      label: 'Device Type *',
      name: 'deviceType',
      type: 'select',
      placeholder: 'Choose Device',
      options: DeviceType, // Example options
      value: '', // Dummy value
    },
    {
      label: 'IMEI No. *',
      name: 'imei',
      type: 'text',
      placeholder: 'Enter IMEI No.',
      value: '', // Dummy value
      disabled: false,
    },
    {
      label: 'Dealer Code *',
      name: 'dealerCode',
      type: 'select',
      placeholder: 'select Dealer Code',
      options: dealearRecord,
      value: "",
      disabled: false,
  },
    {
      label: 'Device SIM No. *',
      name: 'deviceSimNumber',
      type: 'text',
      placeholder: 'Enter Device Mobile No.',
      value: '', // Dummy value
    },
    {
      label: 'Operator',
      name: 'operator',
      type: 'select',
      placeholder: 'Choose Operator', // Default value
      options: ['Airtel', 'Jio', 'Vodafone', 'Other'], // Example options
      value: '', // Dummy value
    },
    {
      label: 'Vehicle Category *',
      name: 'vehicleType',
      type: 'select',
      placeholder: 'Select Vehicle Type',
      options:formattedVehicleTypes, // Example options
      value: '', // Dummy value (first option)
    },
    {
      label: 'Device Status *',
      name: 'deviceStatus',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'InActive'], // Example options
      value: '', // Dummy value
    },
    {
      label: 'Device ID',
      name: 'deviceId',
      type: 'text',
      placeholder: 'Enter Device ID',
      value: '', // Dummy value
    },
    {
      label: 'Display Parameters *',
      name: 'displayParameters',
      type: 'checkboxGroup',
      options: [
        { label: 'AC', value: 'AC' },
        { label: 'Relay / Immobiliser', value: 'Relay' },
        { label: 'GPS', value: 'GPS' },
        { label: 'Door', value: 'Door' },
        { label: 'GeoFencing', value: 'GeoFencing' },
        { label: 'Network', value: 'Network' },
        { label: 'Engine', value: 'Engine' },
        { label: 'Parking', value: 'Parking' },
        { label: 'Charging', value: 'Charging' },
      ],
      // value: ['AC', 'GPS','Relay'],
    },
    {
      label: 'Fuel Status *',
      name: 'fuelStatus',
      type: 'radioGroup',
      options: [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' },
      ],
      value: 'off', // Dummy value
    },
    {
      label: 'Output *',
      name: 'output',
      type: 'select',
      placeholder: 'Select Fuel System',
      options: ['System 1', 'System 2', 'System 3'], // Example options
      value: 'System 2', // Dummy value
    },
  ];
};
