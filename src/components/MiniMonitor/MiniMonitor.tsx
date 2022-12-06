import clsx from "clsx";
import { FC, useLayoutEffect, useRef } from "react";
import { UserCircle, WarningTriangleIcon } from "../Icons";
import { varTxtBase, varTxtLight, Variant } from "../VitalCard";
import MiniMonitorValue from "./MiniMonitorValue";
import socketDataGen from "../../utils/sampleData";

const socketData = socketDataGen();

interface MiniMonitorProps {
  img?: string;
  name: string;
  dob: string; // date of birt
  className?: string;
}

const isEllipsisActive = (inner: any, outer: any) => {
  if (!inner || !outer) return;
  return inner.offsetWidth >= outer.offsetWidth;
};

const MiniMonitor: FC<MiniMonitorProps> = ({ name, dob, img, className }) => {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!nameRef.current || !nameWrapperRef.current) return;
    if (isEllipsisActive(nameRef.current, nameWrapperRef.current)) {
      nameRef.current.classList.add("animation-right-to-left");
    }
  }, [nameRef, nameWrapperRef]);
  return (
    <div
      className={clsx(
        "row-span-1 h-full w-full max-w-sm border-2 border-l-0 border-b-0 border-neutral-300 bg-neutral-500 bg-grad-3 py-1.5 px-4 ",
        className
      )}
    >
      <div className="mb-1 flex items-center gap-x-2">
        {img ? (
          <img
            className="aspect-square w-8 rounded-full border border-neutral-200"
            src={img}
            alt="name"
          />
        ) : (
          <UserCircle className="h-8 w-8 text-neutral-200/75" />
        )}
        <div className="flex w-full items-center justify-between">
          <div>
            <div
              ref={nameWrapperRef}
              className="w-full max-w-[22ch] overflow-hidden"
            >
              <p ref={nameRef} className="w-fit truncate text-sm">
                {name}
              </p>
            </div>
            <p className="text-xs text-neutral-200">{dob}</p>
          </div>
          <WarningTriangleIcon className="h-6 w-6 stroke-danger-600" />
        </div>
      </div>
      <div className="mb-1 grid grid-cols-4 justify-between">
        <MiniMonitorValue
          name="rr"
          unit="brpm"
          param={socketData.param.ecg_param.resp}
          time={socketData.param.ecg_param.time}
          type="ecg"
        />
        <MiniMonitorValue
          name="hr"
          unit="bpm"
          param={socketData.param.ecg_param.hr}
          time={socketData.param.ecg_param.time}
          type="ecg"
        />
        <MiniMonitorValue
          name="sys / dia"
          unit="mmHg"
          param={socketData.param.nibp_param.sys}
          param2={socketData.param.nibp_param.dia}
          time={socketData.param.nibp_param.time}
          type="nibp"
          className="col-span-2"
        />
      </div>
      <div className="grid grid-cols-4">
        <MiniMonitorValue
          name="spo2"
          unit="%"
          param={socketData.param.spo2_param.spo2}
          time={socketData.param.ecg_param.time}
          type="spo2"
        />
        <MiniMonitorValue
          name="pr"
          unit="bpm"
          param={socketData.param.spo2_param.pr}
          time={socketData.param.ecg_param.time}
          type="spo2"
        />
        <MiniMonitorValue
          className="col-span-2"
          name="temp"
          unit="°C"
          param={socketData.param.temp_param.temp}
          time={socketData.param.temp_param.time}
          type="temp"
        />
      </div>
    </div>
  );
};

export default MiniMonitor;
