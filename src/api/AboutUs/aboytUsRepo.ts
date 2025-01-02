import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  getAboutusRecord: (payload: Payload) => Promise<AxiosResponse>;
  updatedevices: (payload: Payload) => Promise<AxiosResponse>;
  createAboutus:(payload: Payload) => Promise<AxiosResponse>;
}

export const userRepo: UserRepo = {
  getAboutusRecord(payload) {
    return Repository.post(APIName.getAboutus, payload);
  },
  updatedevices(payload) {
    return Repository.post(APIName.updateAboutus, payload);
  },
   createAboutus(payload) {
    return Repository.post(APIName.createaboutus,payload)},
};
