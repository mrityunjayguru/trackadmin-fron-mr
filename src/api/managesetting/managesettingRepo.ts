import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface manageSettingRepo {
  manageSettingRepo: any;
  getmanageSetting: (payload: Payload) => Promise<AxiosResponse>;
  updatemanageSetting: (payload: Payload) => Promise<AxiosResponse>;
  createmanageSetting:(payload: Payload) => Promise<AxiosResponse>;
 
}

export const manageSettingRepo: manageSettingRepo = {
  getmanageSetting(payload) {
    return Repository.post(APIName.getmanageSetting, payload);
  },
  updatemanageSetting(payload) {
    return Repository.post(APIName.updatemanageSetting, payload);
  },
  createmanageSetting(payload) {
    return Repository.post(APIName.createmanageSetting, payload);
  },

  manageSettingRepo: undefined
};
