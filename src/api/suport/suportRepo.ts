import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  getsupoer: (payload: Payload) => Promise<AxiosResponse>;
  updateSuport: (payload: Payload) => Promise<AxiosResponse>;
}

export const userRepo: UserRepo = {
  getsupoer(payload) {
    return Repository.post(APIName.getsupoer, payload);
  },
  updateSuport(payload) {
    return Repository.post(APIName.updateSuport, payload);
  },
 
};
