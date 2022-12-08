import clsx from "clsx";
import { FC, useContext } from "react";
import { useLayoutEffect, useRef } from "react";
import { UserCircle, WarningTriangleIcon } from "../Icons";
import MiniMonitorValue from "./MiniMonitorValue";
import socketDataGen from "../../utils/sampleData";
import {
  MonitorContext,
  MonitorContextType,
} from "../../hooks/useActiveMonitorProvider";

const socketData = socketDataGen();

export interface MiniMonitorProps {
  img?: string;
  name: string;
  dob: string; // date of birt
  className?: string;
  id: string;
}

const isEllipsisActive = (inner: any, outer: any) => {
  if (!inner || !outer) return;
  return inner.offsetWidth >= outer.offsetWidth;
};

const MiniMonitor: FC<MiniMonitorProps> = ({
  name,
  dob,
  img,
  className,
  id,
}) => {
  const { addMonitorIds } = useContext(MonitorContext) as MonitorContextType;
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
      onClick={() => addMonitorIds(id)}
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
          times={socketData.param.ecg_param.time}
          type="ecg"
        />
        <MiniMonitorValue
          name="hr"
          unit="bpm"
          param={socketData.param.ecg_param.hr}
          times={socketData.param.ecg_param.time}
          type="ecg"
        />
        <MiniMonitorValue
          name="sys / dia"
          unit="mmHg"
          param={socketData.param.nibp_param.sys}
          param2={socketData.param.nibp_param.dia}
          times={socketData.param.nibp_param.time}
          type="nibp"
          className="col-span-2"
        />
      </div>
      <div className="grid grid-cols-4">
        <MiniMonitorValue
          name="spo2"
          unit="%"
          param={socketData.param.spo2_param.spo2}
          times={socketData.param.ecg_param.time}
          type="spo2"
        />
        <MiniMonitorValue
          name="pr"
          unit="bpm"
          param={socketData.param.spo2_param.pr}
          times={socketData.param.ecg_param.time}
          type="spo2"
        />
        <MiniMonitorValue
          className="col-span-2"
          name="temp"
          unit="°C"
          param={socketData.param.temp_param.temp}
          times={socketData.param.temp_param.time}
          type="temp"
        />
      </div>
    </div>
  );
};

export default MiniMonitor;
