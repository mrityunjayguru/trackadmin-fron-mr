
export const formatDateToDDMMMYYYY = (dateInput:any) => {
    // Parse the date input into a Date object
    const date = new Date(dateInput);
  
    // Validate if the date is valid
    if (isNaN(date.getTime())) {
       return "-"
    }
  
    // Define an array of month names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Extract the day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${day} ${month} ${year}`;
  };
  

  
export const formatDateToDDMMMYYYYwithDate = (dateInput:any) => {
    // Parse the date input into a Date object
    const date = new Date(dateInput);
  
    // Validate if the date is valid
    if (isNaN(date.getTime())) {
       return "-"
    }
  
    // Define an array of month names
    const monthNames = [
      "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12"
    ];
  
    // Extract the day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${day} ${month} ${year}`;
  };
  

  export const formatDateToDDMMMYYYYwithTime = (dateInput:any) => {
    // Parse the date input into a Date object
    const date = new Date(dateInput);
  
    // Validate if the date is valid
    if (isNaN(date.getTime())) {
      return "-";
    }
  
    // Define an array of month names (as numbers)
    const monthNames = [
      "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12"
    ];
  
    // Extract the day, month, year, hours, and minutes
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    const hours = date.getHours().toString().padStart(2, "0"); // Ensures 2 digits
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures 2 digits
  
    // Return the formatted date and time
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  