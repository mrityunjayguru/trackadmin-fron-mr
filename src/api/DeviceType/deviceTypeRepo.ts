import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface deviceTypeRepo {
  addDeviceType: (payload: Payload) => Promise<AxiosResponse>;
  getDeviceType: (payload: Payload) => Promise<AxiosResponse>;
  updateDeviceType:(payload: Payload) => Promise<AxiosResponse>;
}

export const deviceTypeRepo: deviceTypeRepo = {
  addDeviceType(payload) {
    return Repository.post(APIName.createDeviceType, payload);
  },
  getDeviceType(payload) {
    return Repository.post(APIName.getDeviceType, payload);
  },
  updateDeviceType(payload) {
    return Repository.post(APIName.updateDeviceType, payload);
  }
};
