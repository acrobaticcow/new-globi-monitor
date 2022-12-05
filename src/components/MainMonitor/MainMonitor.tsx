import type { FC } from "react";
import {
  CheckCircleIcon,
  FluentTemperature16Filled,
  HalfBatteryIcon,
  HeartIcon,
  MdiHumanHandsdown,
  WarningTriangleIcon,
} from "../Icons";
import { VitalMonitorBlock, VitalMonitorContent } from "../VitalCard";
import genSampleSocketData, {
  sampleFollowers_Data,
} from "../../utils/sampleData";
import { extractor } from "../../utils/function";
import clsx from "clsx";
const sampleSocketData = genSampleSocketData();
const patientDetail = sampleFollowers_Data.patient_detail;
const param = sampleSocketData.param;
/**
 * Chuyển từ độc c sang độ f
 */
const cToF = (c: number | undefined) => {
  return c ? Number((c * 1.8 + 32).toFixed(1)) : 0;
};
const ecgParam = (variant: string) => {
  const root = extractor({
    root: param,
    target: "ecg_param",
  });
  return extractor({ root, target: variant });
};
const spo2Param = (variant: string) => {
  const root = extractor({
    root: param,
    target: "spo2_param",
  });
  return extractor({ root, target: variant });
};
const nipbParam = (variant: string) => {
  const root = extractor({
    root: param,
    target: "nibp_param",
  });
  return extractor({ root, target: variant });
};
const tempParam = (variant: string) => {
  const root = extractor({
    root: param,
    target: "temp_param",
  });
  return extractor({ root, target: variant });
};
const rangeParam = (target: string) => {
  return extractor({ root: patientDetail, target, suffix: "_range" });
};
interface MainMonitorProps {
  className?: string;
  isError?: boolean;
}

const MainMonitor: FC<MainMonitorProps> = ({ className, isError }) => {
  return (
    <div
      id="main-monitor"
      className={clsx(
        "h-full min-w-[calc(50%-1.5rem)] rounded-lg border border-neutral-200 ",
        className
      )}
    >
      <div className="flex items-center justify-between py-2 pl-2.5 pr-1.5">
        <div className="flex items-center gap-x-3">
          <img
            className="aspect-square w-9 rounded-full border border-neutral-200 object-cover object-center"
            src="/img/1.globi-logo.png"
            alt=""
          />
          <div className="grid grid-cols-3 place-items-center gap-2">
            <div>
              <div
                className="tooltip tooltip-right -z-0 inline text-start"
                data-tip="Nguyễn Vũ Anh sdfsdfsdfsdfsdfsdfsdf"
              >
                <p className="w-fit text-ellipsis font-inter text-sm leading-tight line-clamp-1">
                  Nguyễn Vũ Anh
                </p>
              </div>
              <p className="mr-1 text-xs leading-tight text-neutral-200">
                16/7/2012
              </p>
            </div>
            <div>
              <p className="mr-1 text-sm leading-tight text-neutral-200">Nam</p>
              <p className="mr-1 text-xs leading-tight text-neutral-200">
                1900 6886
              </p>
            </div>
            <HalfBatteryIcon className="h-5 w-5 fill-neutral-200 stroke-neutral-200 stroke-0" />
          </div>
        </div>
        <div
          className={clsx(
            "w-[calc(40%-0.625rem)] rounded-md border px-2 py-1 text-sm",
            isError
              ? "border-danger-500 bg-danger/[22%] "
              : "border-success bg-success/[22%] "
          )}
        >
          {isError ? (
            <WarningTriangleIcon className="mr-2 inline-block h-5 w-5 stroke-danger-100 align-middle" />
          ) : (
            <CheckCircleIcon className="mr-2 inline-block h-5 w-5 stroke-success-100 align-middle" />
          )}
          <span
            className={clsx(
              "align-middle ",
              isError ? "text-danger-50" : "text-success-50"
            )}
          >
            warning
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5">
        <div
          id="main-monitor__wave"
          className="col-span-3 grid h-full grid-rows-3"
        >
          <div className="bg-neutral-500"></div>
          <div className="bg-neutral-400"></div>
          <div className="bg-neutral-300"></div>
        </div>
        <div id="main-monitor__param" className="col-span-2 grid grid-rows-4">
          <VitalMonitorBlock
            Icon={<HeartIcon className="ml-auto h-5 w-5 " />}
            type="ecg"
            isPing
            warnings={ecgParam("warning")}
          >
            <VitalMonitorContent
              param={ecgParam("resp")}
              maxRange={rangeParam("resp").max}
              minRange={rangeParam("resp").min}
              sub="bpm"
              title="resp"
              time={ecgParam("time")}
            />
            <VitalMonitorContent
              param={ecgParam("hr")}
              maxRange={rangeParam("hr").max}
              minRange={rangeParam("hr").min}
              direction="left"
              sub="bpm"
              title="hr"
              time={ecgParam("time")}
            />
          </VitalMonitorBlock>

          <VitalMonitorBlock
            Icon={<HeartIcon className="ml-auto h-5 w-5" />}
            type="spo2"
            isPing
            warnings={spo2Param("warning")}
          >
            <VitalMonitorContent
              param={spo2Param("spo2")}
              maxRange={rangeParam("spo2").max}
              minRange={rangeParam("spo2").min}
              sub="%"
              title="spo2"
              time={spo2Param("time")}
            />
            <VitalMonitorContent
              param={spo2Param("pr")}
              maxRange={rangeParam("pr").max}
              minRange={rangeParam("pr").min}
              direction="left"
              sub="bpm"
              title="pr"
              time={spo2Param("time")}
            />
          </VitalMonitorBlock>
          <VitalMonitorBlock
            Icon={<MdiHumanHandsdown className="h-5 w-5" />}
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
              className="flex flex-col items-end"
              param={nipbParam("map")}
              maxRange={rangeParam("nibp").low_pressure.max}
              minRange={rangeParam("nibp").low_pressure.max}
              direction="left"
              showRange={false}
              sub="mmHg"
              title="map"
              time={nipbParam("time")}
            />
          </VitalMonitorBlock>
          <VitalMonitorBlock
            Icon={<FluentTemperature16Filled className="h-5 w-5" />}
            type="temp"
            warnings={tempParam("warning")}
          >
            <VitalMonitorContent
              param={tempParam("temp")}
              maxRange={rangeParam("temp").max}
              minRange={rangeParam("temp").min}
              sub="°C"
              title="Temp 1"
              time={ecgParam("time")}
            />
            {/* <VitalMonitorContent
              param={ecgParam("resp")}
              maxRange={rangeParam("resp").max}
              minRange={rangeParam("resp").min}
              direction="left"
              sub="°F"
              title="Temp 2"
              time={ecgParam("time")}
            /> */}
          </VitalMonitorBlock>
        </div>
      </div>
    </div>
  );
};

export default MainMonitor;
