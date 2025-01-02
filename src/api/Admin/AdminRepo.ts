import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface AdminRepo {
  AddAdmin: (payload: Payload) => Promise<AxiosResponse>;
  AllAdmin: (payload: Payload) => Promise<AxiosResponse>;
  updateAdmin: (payload: Payload) => Promise<AxiosResponse>;

}

export const AdminRepo: AdminRepo = {
  AddAdmin(payload) {
    return Repository.post(APIName.addadmin, payload  , {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  
  AllAdmin(payload) {
    return Repository.post(APIName.allAdmin, payload);
  },
  updateAdmin(payload) {
    return Repository.post(APIName.updateAdmin, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
