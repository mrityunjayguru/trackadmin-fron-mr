import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface Dashboard {
  Dashboards: (payload: Payload) => Promise<AxiosResponse>;
}

export const Dashboard: Dashboard = {
  Dashboards(payload) {
    return Repository.post(APIName.getDashboard, payload);
  },
};
