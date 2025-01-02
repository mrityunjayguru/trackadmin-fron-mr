// src/routesConfig.tsx
import React from 'react';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/AdminDashboard';
import Profile from './pages/Profile';
import Users from './pages/ManageUsers/Users';
import ViewSubscribers from './pages/ManageUsers/Component/Subscriber/ViewSubscribers';
import Edituser from './pages/ManageUsers/Component/Subscriber/Edituser';
import EditDevices from './pages/ManageUsers/Component/Devices/EditDevices';
import VeiwDevices from './pages/ManageUsers/Component/Devices/VeiwDevices';
import AddSubscribe from './pages/ManageUsers/Component/Subscriber/AddSubscribe';
import AddDevices from './pages/ManageUsers/Component/Devices/AddDevices';
import AdminRoles from './pages/AdminRoles/AdminRoles';
import ManageAdmin from './pages/AdminRoles/Component/ManageAdmin';
import Vehicle from './pages/Manage/Vehicle/Vehicle';
import Splash from './pages/Manage/SplashAdd/Splash';
import Setting from './pages/Manage/Setting/Setting';
import About from './pages/Manage/About/About';
import Privacy from './pages/Manage/PrivacyPolicy/Privacy';
import FaqTopics from './pages/Manage/FaQTopics/FaqTopics';
import FaQ from './pages/Manage/FaQ/FaQ';
import Notification from './pages/Notification/Notification';
import Mapoverview from './pages/MapOverView/mapoverview';
import AddList from './pages/Manage/FaQ/Component/AddList';
import EditFaQlist from './pages/Manage/FaQ/Component/EditFaQlist';
import AddTopicsList from './pages/Manage/FaQTopics/Component/AddTopicsList';
import EdiTopicsList from './pages/Manage/FaQTopics/Component/EdiTopicsList';
import EditAdmin from './pages/AdminRoles/Component/EditAdmin';
import ExpiryList from './pages/Manage/ExpiryList/ExpiryList';
import Suport from './pages/Suports/Suport';
import ViewAdmin from './pages/AdminRoles/Component/ViewAdmin';
import Settings from './pages/Settings';
import AddDeviceType from './pages/ManageUsers/Component/DeviceType/AddDeviceType';
import DeviceTypeTable from './pages/ManageUsers/Component/DeviceType/DeviceTypeTable';
import EditDeviceType from './pages/ManageUsers/Component/DeviceType/EditDeviceType';
export const routes = [
  { path: '/auth/signin', title: 'Signin', component: <SignIn /> },
  { path: '/', title: 'Calendar', component: <ECommerce /> },
  { path: '/deviceType', title: 'Signin', component: <AddDeviceType /> },
  { path: '/manage/ManageDevice', title: 'manage', component: <DeviceTypeTable /> },
  { path: '/EditDeviceType', title: 'Signin', component: <EditDeviceType /> },

  
  { path: '/profile', title: 'Profile', component: <Profile /> },
  { path: '/subscribers', title: 'Manage User', component: <Users /> },
  { path: '/view-subscriber/:userId', title: 'View Subscriber', component: <ViewSubscribers /> },
  { path: '/edit-subscriber/:userId', title: 'Edit User', component: <Edituser /> },
  { path: '/edit-devices', title: 'Edit Devices', component: <EditDevices /> },
  { path: '/view-devices', title: 'View Devices', component: <VeiwDevices /> },
  { path: '/add-subscribers', title: 'Add Subscribers', component: <AddSubscribe /> },
  { path: '/add-device', title: 'Add Device', component: <AddDevices /> },
  { path: '/admin-roles', title: 'Admin Roles', component: <AdminRoles /> },
  { path: '/admin-roles/add-admin-roles', title: 'Manage Admin', component: <ManageAdmin /> },
  { path: '/manage/add-vehicle-type', title: 'Add Vehicle Type', component: <Vehicle /> },
  { path: '/manage/splash-screen-ad', title: 'Splash Screen', component: <Splash /> },
  { path: '/manage/settings-screen-ad', title: 'Settings Screen', component: <Setting /> },
  { path: '/manage/about-content-management', title: 'About Content Management', component: <About /> },
  { path: '/manage/privacy-policy-content-management', title: 'Privacy Policy Management', component: <Privacy /> },
  { path: '/manage/faq-topics', title: 'FAQ Topics', component: <FaqTopics /> },
  { path: '/manage/faqs', title: 'FAQs', component: <FaQ /> },
  { path: '/settings', title: 'Settings', component: <Settings /> },
  { path: '/notification', title: 'Notification', component: <Notification /> },
  { path: '/map-overview', title: 'Map Overview', component: <Mapoverview /> },
  { path: '/manage/add-list', title: 'Add List', component: <AddList /> },
  { path: '/manage/edit-faqs', title: 'Edit FAQs', component: <EditFaQlist /> },
  { path: '/manage/add-topic-list', title: 'Add Topic List', component: <AddTopicsList /> },
  { path: '/manage/edit-topic-list', title: 'Edit Topic List', component: <EdiTopicsList /> },
  { path: '/admin-roles/edit-admin-roles', title: 'Edit Admin Roles', component: <EditAdmin /> },
  { path: '/view-admin', title: 'View Admin', component: <ViewAdmin /> },
  { path: '/suport', title: 'Support', component: <Suport /> },
  { path: '/manage/deviceList', title: 'Device List', component: <ExpiryList /> },
];
