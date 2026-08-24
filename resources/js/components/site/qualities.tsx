import {
  MapsSquare02Icon,
  TimeQuarterIcon,
  UserGroupIcon,
} from "hugeicons-react";

export default function Qualities() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <div className="w-48 flex flex-col justify-center items-center border-4 bg-yellow-500/5 border-yellow-600/5 p-2 rounded-xl">
        <UserGroupIcon size={56} className="text-yellow-500" />
        <h6>Visitors Welcomed</h6>
        <h1 className="text-xl font-bold">+500</h1>
      </div>
      <div className="w-48 flex flex-col justify-center items-center border-4 bg-yellow-500/5 border-yellow-600/5 p-2 rounded-xl">
        <MapsSquare02Icon size={56} className="text-yellow-500" />
        <h6>Places to visit</h6>
        <h1 className="text-xl font-bold">+30</h1>
      </div>
      <div className="w-48 flex flex-col justify-center items-center border-4 bg-yellow-500/5 border-yellow-600/5 p-2 rounded-xl">
        <TimeQuarterIcon size={56} className="text-yellow-500" />
        <h6>Years in service</h6>
        <h1 className="text-xl font-bold">
          +{new Date().getFullYear() - 2022}
        </h1>
      </div>
    </div>
  );
}
