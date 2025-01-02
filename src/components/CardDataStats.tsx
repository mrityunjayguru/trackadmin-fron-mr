import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: any;
  levelDown?: boolean; // Optional
  other?: { [key: string]: number }; // Added other prop
  children: ReactNode; // For SVG icon or any other content
  color: string;
  text: string;
  style:any
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  other,
  children,
  color,
  text,
  style
}) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="rounded-lg  bg-color py-3 px-3 relative shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-1 ">
        <div className="">
          <h4
            style={{ color: text }}
            className=" text-[16px] font-bold text-black dark:text-white"
          >
            {title}
          </h4>
          <span style={{ color: text,position:style.position,bottom:style.bottom,padding:style.paddingbottom }} className="text-xl font-medium">
            {total}
          </span>
        </div>
        {rate ? (
          <>
            <div style={{ color: text }} className="flex gap-2">
              <span className="text-[12px] textg">Company :</span>{' '}
              <p className="text-[12px] text-gray-500">
                {rate.companyUsers}
              </p>
            </div>

            <div style={{ color: text }} className="flex gap-2">
              <span className="text-[12px] textred">Individuals :</span>{' '}
              <p className="text-[12px] text-gray-500">{rate.individualUsers}</p>
            </div>
          </>
        ) : null}
      </div>

      {/* Render other information if available */}
      {other && (
        <div className="mt-2 text-sm text-gray-600">
          {Object.entries(other).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <span
                className={`${
                  key === 'company'
                    ? 'text-[#02B754]'
                    : key === 'indivisual'
                    ? 'text-[#FE5513]'
                    : 'text-gray-600' // Fallback color
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span>
              <span className="text-[#202224] font-bold">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardDataStats;
