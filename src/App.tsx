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
import MiniMonitor from "./components/MiniMonitor/MiniMonitor";

function App() {
  return (
    <div className="w-full bg-neutral-600 pl-14">
      <SideBar />
      <div className="h-screen w-full">
        <div className="flex h-3/5 w-full gap-6 overflow-x-auto">
          <MainMonitor className="" />
          <MainMonitor className="" />
          <MainMonitor className="" />
        </div>
        <div className="grid h-2/5 w-full grid-cols-12 bg-neutral-600">
          <div className="col-span-3 flex h-full items-center justify-center bg-biloba-flower-500">
            Thông tin
          </div>
          <div className="col-span-9 grid h-full auto-cols-[25%] grid-flow-col grid-rows-2 overflow-scroll px-2">
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img="img/1.globi-logo.png"
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img="img/1.globi-logo.png"
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
            <MiniMonitor
              name="Nguyễn Vxu Anh Anh Anh"
              dob="18/12/2000"
              img=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
