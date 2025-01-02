export const editDeviceTypeKeys = (editDeviceType: any) => {
    return [
        {
            label: 'Device Type. *',
            name: 'deviceType',
            type: 'text',
            placeholder: 'Enter deviceType.',
            value:editDeviceType?.deviceType, // Dummy value

            disabled:false
          },
         
          {
            label: 'status *',
            name: 'status',
            type: 'select',
            placeholder: 'Select status',
            options: ['Active', 'InActive'], // Example options
            value:editDeviceType?.status, // Dummy value
            disabled:false
        
          },
    ];
};
