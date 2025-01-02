export const ViewDeviceKeys = (SingleDevice: any, VehiclwType: any) => {
    // Function to filter and get keys with true values
    const getKeysWithTrueValues = (obj: any): string[] => {
        let myval = Object.entries(obj)
            .filter(([key, value]) => value === true) // Filter keys where value is true
            .map(([key]) => key); // Return the key as it is without modification

        return myval;
    };

    // Ensure the displayParameters exists and is populated before processing
    const displayParams = SingleDevice?.displayParameters || {};

    // Get the keys with true values
    const trueKeys = getKeysWithTrueValues(displayParams);

    // Return the form data with the filtered display parameters
    return [
        {
            label: 'Device Type *',
            name: 'deviceType',
            type: 'select',
            placeholder: 'Choose Device',
            options: ['Type 1', 'Type 2', 'Type 3'],
            value: SingleDevice?.deviceType,
            disabled: true,
        },
        {
            label: 'IMEI No. *',
            name: 'imei',
            type: 'text',
            placeholder: 'Enter IMEI No.',
            value: SingleDevice?.imei,
            disabled: true,
        },
        {
            label: 'Dealer Code *',
            name: 'dealerCode',
            type: 'text',
            placeholder: 'Enter Dealer Code',
            value: SingleDevice?.dealerCode,
            disabled: true,
        },
        {
            label: 'Device SIM No. *',
            name: 'deviceSimNumber',
            type: 'text',
            placeholder: 'Enter Device Mobile No.',
            value: SingleDevice?.deviceSimNumber,
            disabled: true,
        },
        {
            label: 'Operator',
            name: 'operator',
            type: 'select',
            placeholder: 'Choose Operator',
            options: ['Airtel', 'Jio', 'Vodafone', 'Other'],
            value: SingleDevice?.operator,
            disabled: true,
        },
        {
            label: 'Vehicle Category *',
            name: 'vehicleType',
            type: 'select',
            placeholder: 'Select Vehicle Type',
            options: VehiclwType,
            value: SingleDevice?.vehicleType,
            disabled: true,
        },
        {
            label: 'Device Status *',
            name: 'deviceStatus',
            type: 'select',
            placeholder: 'Choose Status',
            options: ['Active', 'InActive'],
            value: SingleDevice?.status,
            disabled: true,
        },
        {
            label: 'Device ID',
            name: 'deviceId',
            type: 'text',
            placeholder: 'Enter Device ID',
            value: SingleDevice?.deviceId,
            disabled: true,
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
            value: trueKeys,  // Display only the keys with 'true' values (e.g., 'AC')
        },
        {
            label: 'Fuel Status *',
            name: 'fuelStatus',
            type: 'radioGroup',
            options: [
                { label: 'Off', value: 'Off' },
                { label: 'On', value: 'On' },
            ],
            value: SingleDevice?.fuelStatus ? SingleDevice?.fuelStatus : 'Off',
            disabled: true,
        },
        {
            label: 'Output *',
            name: 'output',
            type: 'select',
            placeholder: 'Select Fuel System',
            options: ['System 1', 'System 2', 'System 3'],
            value: SingleDevice?.output ? SingleDevice?.output : 'System 1',
            disabled: true,
        },
    ];
};
