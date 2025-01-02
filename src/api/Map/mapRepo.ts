import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface mapRepo {
  manageMapRepo: any;
  getmanageMap: (payload: Payload) => Promise<AxiosResponse>
  searchuser: (payload: Payload) => Promise<AxiosResponse>
  searchDevices: (payload: Payload) => Promise<AxiosResponse>
}

export const mapRepo: mapRepo = {
  getmanageMap(payload) {
    return Repository.post(APIName.getmanageMap, payload);
  },
  searchuser(payload) {
    return Repository.post(APIName.searchuser, payload);
  },
  searchDevices(payload) {
    return Repository.post(APIName.searchDevices, payload);
  },
  manageMapRepo: undefined
};
