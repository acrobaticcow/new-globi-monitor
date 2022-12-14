import { useMemo, useState, useContext } from "react";
import type { FC } from "react";
import {
  CheckCircleIcon,
  FluentTemperature16Filled,
  HalfBatteryIcon,
  HeartIcon,
  MdiHumanHandsdown,
  WarningTriangleIcon,
  XMarkIcon,
} from "../Icons";
import { VitalMonitorBlock } from "../VitalCard";
import clsx from "clsx";
import { useSocketValueInterval } from "../../hooks/useValueInterval";
import { useSelectFollowers } from "../../api/hooks/useFetchPatients";
import Chart, { ConfigType } from "../Chart/Chart";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketQuery } from "../../api/hooks/useSocketSubscription";
import {
  ActiveMonitorsApiContext,
  ActiveMonitorsApiContextType,
} from "../../hooks/useActiveMonitorProvider";
import { UserData } from "../../models/auth.models";
import { SocketData } from "../../models/realtime.models";
import { ArrayElement } from "../../models/utils.models";
import { Followers } from "../../models/followers.models";
/**
 * Chuyển từ độc c sang độ f
 */

interface MainMonitorProps {
  className?: string;
  isError?: boolean;
  name: string;
  dob: string;
  gender: string;
  phone: number;
  patient_id: string;
  follower: ArrayElement<Followers["data"]>;
}

const ecgConfig = {
    color: "00FF00",
    WINDOW_POINTS: 250,
    scanBarLength: 40,
    INTERVAL: 20,
    type: "ecg",
  } as ConfigType,
  spo2Config = {
    color: "FFFF00",
    WINDOW_POINTS: 50,
    scanBarLength: 40,
    INTERVAL: 150,
    type: "spo2",
  } as ConfigType,
  respConfig = {
    color: "00FFFF",
    WINDOW_POINTS: 50,
    scanBarLength: 40,
    INTERVAL: 100,
    type: "resp",
  } as ConfigType;

const MainMonitor: FC<MainMonitorProps> = ({
  className,
  isError,
  name,
  dob,
  phone,
  gender,
  patient_id,
  follower,
}) => {
  const {
    currentParam,
    isLoading: isCurrentParamLoading,
    error: currentParamError,
  } = useSocketValueInterval(patient_id);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as UserData;
  const socket = queryClient.getQueryData([
    user.user_id,
    patient_id,
    Promise,
  ]) as SocketData;
  const [isHover, setIsHover] = useState(false);
  const { onDelMonitorId } = useContext(
    ActiveMonitorsApiContext
  ) as ActiveMonitorsApiContextType;

  const EcgChart = useMemo(() => {
    return <Chart data={socket} config={ecgConfig} />;
  }, [socket]);
  const RespChart = useMemo(() => {
    return <Chart data={socket} config={respConfig} />;
  }, [socket]);
  const Spo2Chart = useMemo(() => {
    return <Chart data={socket} config={spo2Config} />;
  }, [socket]);
  const MainMonitorParam = useMemo(() => {
    if (currentParam) {
      return (
        <>
          <VitalMonitorBlock
            Icon={<HeartIcon className="ml-auto h-5 w-5 " />}
            type="ecg"
            isPing
            status={currentParam.ecgSt}
            childrenProps={[
              {
                maxRange: follower.patient_detail.resp_range.max,
                minRange: follower.patient_detail.resp_range.min,
                sub: "bpm",
                title: "resp",
                value: currentParam.resp,
              },
              {
                maxRange: follower.patient_detail.hr_range.max,
                minRange: follower.patient_detail.hr_range.min,
                sub: "bpm",
                title: "hr",
                value: currentParam.hr,
              },
            ]}
          />
          <VitalMonitorBlock
            Icon={<HeartIcon className="ml-auto h-5 w-5" />}
            type="spo2"
            isPing
            status={currentParam.spo2St}
            childrenProps={[
              {
                maxRange: follower.patient_detail.spo2_range.max,
                minRange: follower.patient_detail.spo2_range.min,
                sub: "%",
                title: "spo2",
                value: currentParam.spo2,
              },
              {
                maxRange: follower.patient_detail.pr_range.max,
                minRange: follower.patient_detail.pr_range.min,
                sub: "bpm",
                title: "pr",
                value: currentParam.pr,
              },
            ]}
          />
          <VitalMonitorBlock
            Icon={<MdiHumanHandsdown className="h-5 w-5" />}
            type="nibp"
            status={currentParam.nibpSt}
            childrenProps={[
              {
                maxRange: follower.patient_detail.nibp_range.high_pressure.max,
                minRange: follower.patient_detail.nibp_range.high_pressure.min,
                maxRange2: follower.patient_detail.nibp_range.low_pressure.max,
                minRange2: follower.patient_detail.nibp_range.low_pressure.min,
                value: currentParam.sys,
                value2: currentParam.dia,
                sub: "nibp",
                title: "sys/dia",
              },

              {
                className: "flex flex-col items-end",
                maxRange: undefined,
                minRange: undefined,
                value: currentParam.map,
                direction: "left",
                showRange: false,
                sub: "mmHg",
                title: "map",
              },
            ]}
          />
          <VitalMonitorBlock
            Icon={<FluentTemperature16Filled className="h-5 w-5" />}
            type="temp"
            status={currentParam.tempSt}
            childrenProps={[
              {
                maxRange: follower.patient_detail.temp_range.max,
                minRange: follower.patient_detail.temp_range.min,
                value: currentParam.temp,
                sub: "°C",
                title: "Temp 1",
              },
            ]}
          />
        </>
      );
    }
  }, [currentParam, follower]);

  if (isCurrentParamLoading) return <div>current param loading</div>;
  if (currentParamError || !currentParam) return <div>socket error</div>;
  return (
    <div
      id="main-monitor"
      className={clsx(
        "h-full w-1/2 min-w-[50%] rounded-lg border border-neutral-200 ",
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
                  {name}
                </p>
              </div>
              <p className="mr-1 text-xs leading-tight text-neutral-200">
                {dob}
              </p>
            </div>
            <div>
              <p className="mr-1 text-sm leading-tight text-neutral-200">
                {gender}
              </p>
              <p className="mr-1 text-xs leading-tight text-neutral-200">
                {phone}
              </p>
            </div>
            <HalfBatteryIcon className="h-5 w-5 fill-neutral-200 stroke-neutral-200 stroke-0" />
          </div>
        </div>
        {currentParam.warning && !isHover && (
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
              {currentParam.warning}
            </span>
          </div>
        )}
        {isHover && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelMonitorId(patient_id);
            }}
          >
            <XMarkIcon className="h-5 w-5 fill-neutral-300 stroke-transparent stroke-0 text-neutral-200 " />
          </button>
        )}
      </div>
      <div className="grid grid-cols-5">
        <div
          id="main-monitor__wave"
          className="col-span-3 grid h-full grid-cols-1 grid-rows-3"
        >
          {EcgChart}
          {RespChart}
          {Spo2Chart}
        </div>
        <div id="main-monitor__param" className="col-span-2 grid grid-rows-4">
          {MainMonitorParam}
        </div>
      </div>
    </div>
  );
};

export default MainMonitor;
