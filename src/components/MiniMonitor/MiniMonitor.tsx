import clsx from "clsx";
import { FC, useContext } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { UserCircle, WarningTriangleIcon, XMarkIcon } from "../Icons";
import MiniMonitorValue from "./MiniMonitorValue";
import socketDataGen from "../../utils/sampleData";
import {
  ActiveMonitorsApiContext,
  ActiveMonitorsApiContextType,
} from "../../hooks/useActiveMonitorProvider";
import { useSocketValueInterval } from "../../hooks/useValueInterval";
import { useSocketQuery } from "../../api/hooks/useSocketSubscription";

export interface MiniMonitorProps {
  img?: string;
  name: string;
  dob: string; // date of birt
  className?: string;
  patientId: string;
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
  patientId,
}) => {
  // const { data, isLoading, error } = useSocketSubscription(patientId);
  const { onAddMonitorIds, onDelMiniMonitorId } = useContext(
    ActiveMonitorsApiContext
  ) as ActiveMonitorsApiContextType;
  const {
    currentParam: value,
    isLoading,
    error,
  } = useSocketValueInterval(patientId);
  const { turnOffSocket } = useSocketQuery(patientId);
  const [isHover, setIsHover] = useState(false);

  const nameRef = useRef<HTMLParagraphElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!nameRef.current || !nameWrapperRef.current) return;
    if (isEllipsisActive(nameRef.current, nameWrapperRef.current)) {
      nameRef.current.classList.add("animation-right-to-left");
    }
  }, [nameRef, nameWrapperRef]);
  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;
  return (
    <div
      className={clsx(
        "row-span-1 h-full w-full max-w-sm border-2 border-l-0 border-b-0 border-neutral-300 bg-neutral-500 bg-grad-3 py-1.5 px-4 ",
        className
      )}
      onClick={() => onAddMonitorIds(patientId)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
            <div ref={nameWrapperRef} className="w-[22ch] overflow-hidden">
              <p ref={nameRef} className="w-fit truncate text-sm">
                {name}
              </p>
            </div>
            <p className="text-xs text-neutral-200">{dob}</p>
          </div>
          {isHover ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelMiniMonitorId(patientId);
                turnOffSocket();
              }}
            >
              <XMarkIcon className="h-5 w-5 fill-neutral-300 stroke-transparent stroke-0 text-neutral-200 " />
            </button>
          ) : (
            <WarningTriangleIcon className="h-6 w-6 stroke-danger-600" />
          )}
        </div>
      </div>
      <div className="mb-1 grid grid-cols-4 justify-between">
        <MiniMonitorValue
          name="resp"
          unit="brpm"
          value={value?.resp}
          type="ecg"
        />
        <MiniMonitorValue name="hr" unit="bpm" value={value?.hr} type="ecg" />
        <MiniMonitorValue
          name="sys / dia"
          unit="mmHg"
          value={value?.sys}
          value2={value?.dia}
          type="nibp"
          className="col-span-2"
        />
      </div>
      <div className="grid grid-cols-4">
        <MiniMonitorValue
          name="spo2"
          unit="%"
          value={value?.spo2}
          type="spo2"
        />
        <MiniMonitorValue name="pr" unit="bpm" value={value?.pr} type="spo2" />
        <MiniMonitorValue
          className="col-span-2"
          name="temp"
          unit="°C"
          value={value?.temp}
          type="temp"
        />
      </div>
    </div>
  );
};

export default MiniMonitor;
