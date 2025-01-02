import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  getsetting: (payload: Payload) => Promise<AxiosResponse>;
  updatedevices: (payload: Payload) => Promise<AxiosResponse>;
  createsetting:(payload: Payload) => Promise<AxiosResponse>;
}

export const userRepo: UserRepo = {
  getsetting(payload) {
    return Repository.post(APIName.getsetting, payload);
  },
  updatedevices(payload) {
    return Repository.post(APIName.updateDevices, payload);
  },
   createsetting(payload) {
    return Repository.post(APIName.createsetting,payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
