import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface notificationRepo {
  NotificationRepo: any;
  getNotification: (payload: Payload) => Promise<AxiosResponse>
  createNotification: (payload: Payload) => Promise<AxiosResponse>
  sendPushNotification:(payload: Payload) => Promise<AxiosResponse>;
  
}

export const notificationRepo: notificationRepo = {
  getNotification(payload) {
    return Repository.post(APIName.getNotification, payload);
  },
  createNotification(payload) {
    return Repository.post(APIName.createNotification, payload);
  },
  sendPushNotification(payload) {
    return Repository.post(APIName.sendPushNotification, payload);
  },
  NotificationRepo: undefined
};
