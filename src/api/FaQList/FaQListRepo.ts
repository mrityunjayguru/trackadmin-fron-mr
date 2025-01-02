import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  GetFaQLisy: (payload: Payload) => Promise<AxiosResponse>;
  updateFaQList: (payload: Payload) => Promise<AxiosResponse>;
  addFaQList:(payload: Payload) => Promise<AxiosResponse>;
}

export const userRepo: UserRepo = {
  GetFaQLisy(payload) {
    return Repository.post(APIName.getFaQList, payload);
  },
  updateFaQList(payload) {
    return Repository.post(APIName.updateFaQlist, payload);
  },
   addFaQList(payload) {
    return Repository.post(APIName.createFaQList,payload)},
};
