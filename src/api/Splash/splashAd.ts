import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  getSplash: (payload: Payload) => Promise<AxiosResponse>;
  updatedevices: (payload: Payload) => Promise<AxiosResponse>;
  createSplash:(payload: Payload) => Promise<AxiosResponse>;
}

export const userRepo: UserRepo = {
  getSplash(payload) {
    return Repository.post(APIName.getsplash, payload);
  },
  updatedevices(payload) {
    return Repository.post(APIName.updateSplash, payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
   createSplash(payload) {
    return Repository.post(APIName.createsplash,payload)},
};
