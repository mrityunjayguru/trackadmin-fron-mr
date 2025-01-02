import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface PrivacyPolicyRepo {
  getPrivacyPolicy: (payload: Payload) => Promise<AxiosResponse>;
  updatePrivacyPolicy: (payload: Payload) => Promise<AxiosResponse>;
  createPrivacyPolicy:(payload: Payload) => Promise<AxiosResponse>;
}

export const PrivacyPolicyRepo: PrivacyPolicyRepo = {
  getPrivacyPolicy(payload) {
    return Repository.post(APIName.getPrivacyPolicy, payload);
  },
  updatePrivacyPolicy(payload) {
    return Repository.post(APIName.updatePrivacyPolicy, payload);
  },
   createPrivacyPolicy(payload) {
    return Repository.post(APIName.createprivacyPolicy,payload)},
};
