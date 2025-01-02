import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface vehicleRepo {
  fetchVehicleTypes: (payload: Payload) => Promise<AxiosResponse>;
  updatevehicle: (payload: Payload) => Promise<AxiosResponse>;
  createVehicleType:(payload: Payload) => Promise<AxiosResponse>;
}

export const vehicleRepo: vehicleRepo = {
  fetchVehicleTypes(payload) {
    return Repository.post(APIName.VehicleTypes, payload);
  },
  updatevehicle(payload) {
    return Repository.post(APIName.updatevehicle, payload
      , {
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
        },
      });
    
  },
  createVehicleType(payload) {
    return Repository.post(APIName.createVehicle, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
