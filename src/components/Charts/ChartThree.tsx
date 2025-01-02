import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

interface GroupedStatus {
  count: number;
}

interface Records {
  totalCount: number;
  groupedStatus: GroupedStatus[];
}

interface ChartThreeProps {
  records: Records;
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
    width: '100%',
    height: '200px',
  },
  colors: ['#02B754', '#FE5513'],
  labels: ['Active', 'InActive'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '50%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 250,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 150,
        },
      },
    },
  ],
};

const ChartThree: React.FC<ChartThreeProps> = ({ records }) => {
const [activecount,setctivecount]=useState<number>(0)
const [Inactivecount,setInctivecount]=useState<number>(0)
const datadashboard = useSelector((state: any) => state.dashboard.dashboard);
console.log(datadashboard?.groupDevices?.result,"datadashboarddatadashboard")
const [series, setSeries] = useState<number[]>([]);
  useEffect(() => {
    datadashboard?.groupDevices?.groupedStatus.forEach((val: any) => {
      if (val._id === "Active") {
        setctivecount(val.count); 
        setSeries([val.count]);   
      } else {
        setInctivecount(val.count); 
        setSeries((prev) => [...prev, val.count]); 
      }
    });
  }, [datadashboard]);
console.log(series,"seriesseries")
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-sm border border-stroke bg-[#F0F4FD] p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col justify-between">
        <div className="mb-3">
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Total Device
          </h5>
          <span className ="text-[#6C63FF]">{records?.totalCount}</span>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <span className="mr-2 block h-3 w-3 rounded-full bg-[#02B754]"></span>
            <p className=" text-sm font-medium text-black dark:text-white w-full">
              <span>Active :</span>
              <span className='px-1'>{activecount || 0}</span>
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-2 block h-3 w-3 rounded-full bg-[#FE5513]"></span>
            <p className=" text-sm font-medium text-black dark:text-white w-full">
              <span>InActive :</span>
              <span className='px-1'>{Inactivecount || 0}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-2 mr-5">
        <div id="chartThree" className="flex justify-center">
          <ReactApexChart options={options} series={datadashboard?.groupDevices?.result} type="donut" />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;



// Chitresh Chaudhary
// 12:20
// ID: 862408128000886
// IMEI:864356065888886
// Chitresh Chaudhary
// 12:27
// 862408128000853
// 864356066003030