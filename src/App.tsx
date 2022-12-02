import {
  HeartIcon,
  ChatIcon,
  ContactIcon,
  SettingIcon,
} from "./components/Icons";
import clsx from "clsx";
import { VitalMonitorBlock, VitalMonitorContent } from "./components/VitalCard";
import SideBar from "./components/Sidebar/Sidebar";
import MainMonitor from "./components/MainMonitor/MainMonitor";

function App() {
  return (
    <div className="pl-14 w-full bg-neutral-600">
      <SideBar />
      <div className="w-full h-screen">
        <div className="h-3/5 gap-6 w-full flex overflow-x-auto">
          <MainMonitor className="" />
          <MainMonitor className="" />
          <MainMonitor className="" />
        </div>
        <div className="h-2/5  grid grid-cols-12 w-full bg-neutral-200">
          <div className="col-span-3 flex items-center justify-center h-full bg-biloba-flower-500">
            Thông tin
          </div>
          <div className="grid overflow-y-scroll col-span-9 grid-cols-4 gap-2">
            <img
              className="object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
            <img
              className=" object-contain aspect-auto"
              src="/img/Home(2).png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
