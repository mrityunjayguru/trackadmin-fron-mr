import { useSelector } from "react-redux";

function OtherDetails() {
  const vehicleData: any = useSelector((state: any) => state.subscriber.singleDevice);

  const formatDate = (dateValue: any) => {
    const date = new Date(dateValue);
    return !isNaN(date.getTime()) ? date.toLocaleDateString() : "-";
  };

  return (
    <>
      <div className="rounded-2xl flex justify-between gap-1 w-full p-4 bg-black text-xl font-semibold text-white">
        <div className="flex gap-1">
          <h1 className="text-[#D9E821]">Other Info (App)</h1>
        </div>
      </div>
      <div className="mt-10 px-10 my-10">
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4 ">
              Vehicle Registration No.:
            </span>
            <span className="text-[#949495] text-sm">
              {vehicleData.vehicleRegistrationNo || '-'}
            </span>
          </div>

        
          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              Vehicle Type:
            </span>
            <span className="text-[#949495] text-sm">
              {vehicleData?.vehicleTypeDetails?.vehicleTypeName ||
                '-'}
            </span>
          </div>

       

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">Date Added:</span>
            <span className="text-[#949495] text-sm">
              {formatDate(vehicleData.dateAdded)}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              Driver Name:
            </span>
            <span className="text-[#949495] text-sm">
              {vehicleData.driverName || '-'}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">Mobile No:</span>
            <span className="text-[#949495] text-sm">
              {vehicleData.mobileNo || '-'}
            </span>
          </div>
      

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              Vehicle Brand:
            </span>
            <span className="text-[#949495] text-sm">
              {vehicleData.vehicleBrand || '-'}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              Vehicle Model:
            </span>
            <span className="text-[#949495] text-sm">
              {vehicleData.vehicleModel || '-'}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              Insurance Expiry Date:
            </span>
            <span className="text-[#949495] text-sm">
              {formatDate(vehicleData.insuranceExpiryDate)}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              Pollution Expiry Date:
            </span>
            <span className="text-[#949495] text-sm">
              {formatDate(vehicleData.pollutionExpiryDate)}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              Fitness Expiry Date:
            </span>
            <span className="text-[#949495] text-sm">
              {formatDate(vehicleData.fitnessExpiryDate)}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-[#000] text-sm w-1/4">
              National Permit Expiry Date:
            </span>
            <span className="text-[#949495] text-sm">
              {formatDate(vehicleData.nationalPermitExpiryDate)}
            </span>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default OtherDetails;