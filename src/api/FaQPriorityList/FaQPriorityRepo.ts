import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  GetFaQPriority: (payload: Payload) => Promise<AxiosResponse>;
  updateFaQPriority: (payload: Payload) => Promise<AxiosResponse>;
  addFaQPriority:(payload: Payload) => Promise<AxiosResponse>;
}

export const userRepo: UserRepo = {
  GetFaQPriority(payload) {
    return Repository.post(APIName.getFaQPriority, payload);
  },
  updateFaQPriority(payload) {
    return Repository.post(APIName.updateFaQPriority, payload);
  },
   addFaQPriority(payload) {
    return Repository.post(APIName.createFaQPriority,payload)},
};
