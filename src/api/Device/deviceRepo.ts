import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  Getsubscribers: (payload: Payload) => Promise<AxiosResponse>;
  updatedevices: (payload: Payload) => Promise<AxiosResponse>;
  AddDevice:(payload: Payload) => Promise<AxiosResponse>;
  expDevices:(payload: Payload) => Promise<AxiosResponse>;
  updateMany:(payload: Payload) => Promise<AxiosResponse>;
  deviceOwnerID:(payload: Payload) => Promise<AxiosResponse>;


}

export const userRepo: UserRepo = {
  Getsubscribers(payload) {
    return Repository.post(APIName.subscribers, payload);
  },
  updatedevices(payload) {
    return Repository.post(APIName.updateDevices, payload);
  },
  AddDevice(payload) {
    return Repository.post(APIName.createDevice, payload);
  },
  expDevices(payload) {
    return Repository.post(APIName.geDevices, payload);
  },
  updateMany(payload) {
    return Repository.post(APIName.updateMany, payload);
  },
  deviceOwnerID(payload) {
    return Repository.post(APIName.devicesByOwnerID, payload);
  },
};
