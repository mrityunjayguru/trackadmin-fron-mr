import { Link, useParams } from 'react-router-dom';
// import DropdownMessage from './DropdownMessage';
// import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
// import DarkModeSwitcher from './DarkModeSwitcher';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const location = useLocation();
  const { userId } = useParams();

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
      {location.pathname === '/' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Dashboard</h1>}
      {location.pathname === '/subscribers' && <h1 className='block text-2xl font-medium text-black dark:text-white' >Manage Subscribers</h1>}
      {location.pathname === '/map-overview' && <h1 className='block text-2xl font-medium text-black dark:text-white' >Map Overview</h1>}
      {location.pathname === '/Admin-Roles' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Admin Roles</h1>}
      {location.pathname === '/Notification' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Send Notification</h1>}
      {location.pathname === '/suport' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Support</h1>}
      {location.pathname === '/manage/Splash-Screen-AD' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage</h1>}
      {location.pathname === '/manage/About-Content-Management' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage</h1>}
      {location.pathname === '/manage/Settings-Screen-AD' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage</h1>}
      {location.pathname === '/manage/Add-Vehicle-Type' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Add Vehicle Type</h1>}
      {location.pathname === '/manage/Privacy-Policy-Content-Management' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage</h1>}
      {location.pathname === '/manage/FAQ-Topics' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage FAQ Topics</h1>}
      {location.pathname === '/manage/deviceList' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Renew Subscription</h1>}
      {location.pathname === '/settings' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Settings</h1>}
      {location.pathname === '/manage/FAQs' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage FAQ</h1>}
      {location.pathname === '/add-Topic-List' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage </h1>}
      {location.pathname === '/manage/add-Topic-List' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Add FAQ Topic</h1>}
      {location.pathname === '/Manage/Edit-FAQs' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Edit FAQs</h1>}
      {location.pathname === '/manage/edit-Topic-List' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Edit FAQ Topics</h1>}
      {location.pathname === '/Admin-Roles/Edit-Admin-Roles' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Admin Roles</h1>}
      {location.pathname === '/manage/Add-List' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Add FAQs</h1>}
      {location.pathname === '/Admin-Roles/Add-Admin-Roles' && <h1 className='block text-2xl font-medium text-black dark:text-white'>Admin Roles</h1>}
      {location.pathname.includes(`/add-subscribers`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>Add Subscribers</h1>}
      {location.pathname.includes(`/view-subscriber`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>View Subscribers</h1>}
      {location.pathname.includes(`/Edit-subscriber`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>Edit Subscribers</h1>}
      {location.pathname.includes(`/Add-device`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>Add Device</h1>}
      {location.pathname.includes(`/View-Devices`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>View Device</h1>}
      {location.pathname.includes(`/Edit-Devices`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>Edit Devices</h1>}
       
      {location.pathname.includes(`/manage/ManageDevice`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>Device Type</h1>}
      {location.pathname.includes(`/deviceType`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage</h1>}
      {location.pathname.includes(`/EditDeviceType`) && <h1 className='block text-2xl font-medium text-black dark:text-white'>Manage</h1>}


        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <Link
            to="/profile"
            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <img src={LogoIcon} alt="Logo" />
          </Link> */}
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative"></div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
