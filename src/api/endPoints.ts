const BillboardAPI = {
  getBillboard: 'Blog/get',
  addBillboard: 'Blog/add',
  updateBillboard: 'Blog/update',
  Dashboardcount: 'Blog/dashboard',
};

const Users = {
  alluser: 'allusers',
  updateuser: 'updateuser',
};

const subscribers = {
  subscribers: 'subscribers/getSubscribers',
  updateSubscriber: 'Auth/updateUser',
  addNewSubscriber: 'Auth/createUser',
  groupSubesciber: 'subscribers/groupSubescriber',
};
const vehicleType = {
  createVehicle: 'vehicleType/create',
  VehicleTypes: 'vehicleType/get',
  updatevehicle: 'vehicleType/update',
};
const dashboard = {
  getDashboard: 'dashboard/get',
};
const device = {
  createDevice: 'vehicle/create',
  updateDevices: 'vehicle/update',
  geDevices: 'vehicle/get',
  updateMany:'vehicle/updateMany',
  devicesByOwnerID:'vehicle/devicesByOwnerID',


};
const privacyPolicy = {
  createprivacyPolicy: 'privacyPolicy/create',
  getPrivacyPolicy: 'privacyPolicy/get',
  updatePrivacyPolicy: 'privacyPolicy/update',
};
const splash = {
  createsplash: 'splashAd/create',
  getsplash: 'splashAd/get',
  updateSplash: 'splashAd/update',
};
const setting = {
  createsetting: 'setting/create',
  getsetting: 'setting/get',
};
const aboutUs = {
  createaboutus: 'about/create',
  getAboutus: 'about/get',
  updateAboutus: 'about/update',
};

const adminauthAPI = {
  login: 'adminAuth/login',
  register: 'auth/signup',
  LdapLogin: 'LDAPLOGIN',
  updateprofile: 'auth/updateUser',
  alluser: 'auth/alluser',
};
const FaQList = {
  createFaQList: 'FaQlist/create',
  updateFaQlist: 'FaQlist/update',
  getFaQList: 'FaQlist/get',
  deleteFaqList: 'FaQlist/delete',
};
const FaQPriority = {
  createFaQPriority: 'FaQtopic/create',
  updateFaQPriority: 'FaQtopic/update',
  getFaQPriority: 'FaQtopic/get',
  deleteFaQPriority: 'FaQtopic/delete',
};
const Admin = {
  addadmin: 'admin/createAdmin',
  allAdmin:"admin/All-Admin",
  updateAdmin:"admin/updateAdmin"

};
const getmanageSetting={
  getmanageSetting: 'managesetting/get',
  updatemanageSetting:"managesetting/update",
  createmanageSetting:"managesetting/create",
}
const mapdetails={
  getmanageMap: 'trackVehicle/getByVehicleID',
  searchuser:'trackVehicle/searchuser',
  searchDevices:'trackVehicle/searchDevices',
}
const Notification={
  createNotification: 'notification/send',
  getNotification:'notification/get',
  sendPushNotification:"notification/sendPushNotification"

}
const suport={
  getsupoer:"suport/get",
  updateSuport:"suport/update"
}
const deviceType={
  createDeviceType:"deviceType/create",
  getDeviceType:"deviceType/get",
  updateDeviceType:"deviceType/update"
}
const APIName = {
  ...BillboardAPI,
  ...Users,
  ...adminauthAPI,
  ...subscribers,
  ...vehicleType,
  ...device,
  ...dashboard,
  ...splash,
  ...setting,
  ...aboutUs,
  ...privacyPolicy,
  ...FaQList,
  ...FaQPriority,
  ...Admin,
  ...getmanageSetting,
  ...mapdetails,
  ...Notification,
  ...suport,
  ...deviceType
};

export default APIName;
