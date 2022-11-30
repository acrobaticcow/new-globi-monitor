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
import { useState } from "react";
const sampleSocketData = genSampleSocketData();
const patientDetail = sampleFollowers_Data.patient_detail;
const param = sampleSocketData.param;

function App() {
  const [isChatActive, setIsChatActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const onChatClick = () => {
    setIsChatActive((state) => {
      return !state;
    });
  };
  const onContactClick = () => {
    setIsContactActive((state) => {
      return !state;
    });
  };
  return (
    <div className="h-screen pl-14 w-full bg-neutral-600">
      <div
        className={clsx(
          "w-80 fixed inset-y-0 duration-200 ease-in-out transform -left-0 bg-danger-500 h-full",
          isChatActive && "translate-x-14 block",
          !isChatActive && " -translate-x-full"
        )}
      ></div>
      <div
        className={clsx(
          "w-80 fixed inset-y-0 duration-200 ease-in-out transform -left-0 bg-spray-500 h-full",
          isContactActive && "translate-x-14 block",
          !isContactActive && " -translate-x-full"
        )}
      ></div>
      <nav className="fixed px-2 z-0 py-10 inset-y-0 h-screen left-0 w-14 bg-neutral-500 border-r shadow-lg shadow-neutral-400 border-neutral-300">
        <img
          className="w-full ring-1 mb-14 ring-neutral-200 bg-neutral-100 aspect-square object-cover object-center rounded-full"
          src="/public/img/1.globi-logo.png"
          alt="unsplash"
        />
        <div className="flex flex-col h-full justify-between">
          <div id="main-btn" className="flex flex-col items-center gap-y-4">
            <button onClick={onChatClick}>
              <ChatIcon className="navbar--icon" />
            </button>
            <button onClick={onContactClick}>
              <ContactIcon className="navbar--icon" />
            </button>
          </div>
          <button>
            <SettingIcon className="navbar--icon" />
          </button>
        </div>
      </nav>
      <div className="w-full h-full">
        <div className="h-3/5 gap-6 w-full flex overflow-x-auto">
          <img
            className="w-1/2 aspect-auto"
            src="/public/img/Home.png"
            alt=""
          />
          <img
            className="w-1/2 aspect-auto"
            src="/public/img/Home.png"
            alt=""
          />
          <img src="/public/img/Home.png" alt="" />
        </div>
        <div className="h-2/5 grid grid-cols-12 w-full bg-neutral-200">
          <div className="col-span-3 flex items-center justify-center h-full bg-biloba-flower-500">
            Thông tin
          </div>
          <div className="col-span-9 overflow-x-auto">
            <div className="flex w-full h-1/2 flex-nowrap">
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
            </div>
            <div className="flex w-full h-1/2 flex-nowrap">
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
              <img
                className="w-1/4 object-contain aspect-auto"
                src="/public/img/Home(2).png"
                alt=""
              />
            </div>
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
