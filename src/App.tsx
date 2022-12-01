import {
  HeartIcon,
  ChatIcon,
  ContactIcon,
  SettingIcon,
} from "./components/Icons";
import clsx from "clsx";
import { VitalMonitorBlock, VitalMonitorContent } from "./components/VitalCard";
import genSampleSocketData, { sampleFollowers_Data } from "./utils/sampleData";
import { extractor } from "./utils/function";
import { useCallback, useState } from "react";
import type { MouseEvent } from "react";
import SideBar from "./components/Sidebar/Sidebar";
const sampleSocketData = genSampleSocketData();
const patientDetail = sampleFollowers_Data.patient_detail;
const param = sampleSocketData.param;

function App() {
  return (
    <div className="pl-14 w-full bg-neutral-600">
      <SideBar />
      <div className="w-full h-screen">
        <div className="h-3/5 gap-6 w-full flex overflow-x-auto">
          <img className="w-1/2 aspect-auto" src="/img/Home.png" alt="" />
          <img className="w-1/2 aspect-auto" src="/img/Home.png" alt="" />
          <img className="w-1/2 aspect-auto" src="/img/Home.png" alt="" />
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

{
  /* <VitalMonitorBlock
        Icon={<HeartIcon className="w-7 h-7 ml-auto" />}
        type="ecg"
        warnings={ecgParam("warning")}
      >
        <VitalMonitorContent
          param={ecgParam("hr")}
          maxRange={rangeParam("hr").max}
          minRange={rangeParam("hr").min}
          sub="bpm"
          title="hr"
          time={ecgParam("time")}
        />
        <VitalMonitorContent
          param={ecgParam("resp")}
          maxRange={rangeParam("resp").max}
          minRange={rangeParam("resp").min}
          direction="left"
          sub="%"
          title="resp"
          time={ecgParam("time")}
        />
      </VitalMonitorBlock>
      <VitalMonitorBlock
        Icon={<HeartIcon className="w-7 h-7 ml-auto" />}
        type="nibp"
        warnings={nipbParam("warning")}
      >
        <div className="flex items-end">
          <VitalMonitorContent
            param={nipbParam("sys")}
            maxRange={rangeParam("nibp").high_pressure.max}
            minRange={rangeParam("nibp").high_pressure.min}
            sub="mmHg"
            variant="nibp"
            title="sys/dia"
            time={nipbParam("time")}
            hasDivider
          />
          <VitalMonitorContent
            param={nipbParam("dia")}
            maxRange={rangeParam("nibp").low_pressure.max}
            minRange={rangeParam("nibp").low_pressure.max}
            direction="left"
            variant="nibp"
            time={nipbParam("time")}
          />
        </div>
        <VitalMonitorContent
          className="flex-col flex items-end"
          param={nipbParam("map")}
          maxRange={rangeParam("nibp").low_pressure.max}
          minRange={rangeParam("nibp").low_pressure.max}
          direction="left"
          sub="mmHg"
          title="map"
          time={nipbParam("time")}
        />
      </VitalMonitorBlock> */
}

// const ecgParam = (variant: string) => {
//   const root = extractor({
//     root: param,
//     target: "ecg_param",
//   });
//   return extractor({ root, target: variant });
// };
// const spo2Param = (variant: string) => {
//   const root = extractor({
//     root: param,
//     target: "spo2_param",
//   });
//   return extractor({ root, target: variant });
// };
// const nipbParam = (variant: string) => {
//   const root = extractor({
//     root: param,
//     target: "nibp_param",
//   });
//   return extractor({ root, target: variant });
// };
// const rangeParam = (target: string) => {
//   return extractor({ root: patientDetail, target, suffix: "_range" });
// };
