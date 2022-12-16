import { useMemo, useContext } from "react";
import type { FC } from "react";
import {
  FluentTemperature16Filled,
  HalfBatteryIcon,
  HeartIcon,
  WarningTriangleIcon,
} from "../Icons";
import { VitalMonitorBlock } from "../VitalCard";
import clsx from "clsx";
import { useSocketValueInterval } from "../../hooks/useValueInterval";
import Chart, { ConfigType } from "../Chart/Chart";
import { useQueryClient } from "@tanstack/react-query";
import {
  ActiveMonitorsApiContext,
  ActiveMonitorsApiContextType,
} from "../../hooks/useActiveMonitorProvider";
import { UserData } from "../../models/auth.models";
import { SocketData } from "../../models/realtime.models";
import { ArrayElement } from "../../models/utils.models";
import { Followers } from "../../models/followers.models";
import { m, AnimatePresence } from "framer-motion";
import { CheckIcon, ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";
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
    WINDOW_POINTS: 1250,
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
          {/* <MainNibpParam follower={follower} currentParam={currentParam} /> */}
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
    } else {
      return <div>loading</div>;
    }
  }, [currentParam, follower]);

  if (isCurrentParamLoading || !socket) return <div>current param loading</div>;
  if (currentParamError || !currentParam || !socket)
    return <div>socket error</div>;
  return (
    <m.div
      initial={{ opacity: 0, scale: "0%" }}
      animate={{ opacity: 100, scale: "100%" }}
      exit={{ opacity: 0, scale: "0%" }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 290,
      }}
      id="main-monitor"
      className={clsx(
        "relative h-full w-1/2 min-w-[50%] origin-bottom-left rounded-lg border border-neutral-200 ",
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
        <AnimatePresence>
          {!!currentParam.warning && (
            <m.div
              initial={{
                opacity: 0,
                top: "-100%",
              }}
              animate={{
                opacity: 100,
                top: "1rem",
              }}
              exit={{ opacity: 0, top: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className={clsx(
                "absolute left-1/2 top-4 z-50 flex w-80 -translate-x-1/2  items-center justify-between rounded-md border px-2 py-1 text-sm shadow-lg shadow-neutral-400 backdrop-blur-md",
                isError
                  ? "border-danger-500 bg-danger/[22%] "
                  : "border-success bg-success/[22%] "
              )}
            >
              {isError ? (
                <WarningTriangleIcon className="inline-block h-5 w-5 stroke-danger-100 align-middle" />
              ) : (
                <CheckIcon className="inline-block h-5 w-5 stroke-success-100 align-middle" />
                // <CheckCircleIcon className="inline-block h-5 w-5 stroke-success-100 align-middle" />
              )}
              <span
                className={clsx(
                  "text-ellipsis leading-none",
                  isError ? "text-danger-50" : "text-success-50"
                )}
              >
                {currentParam.warning}
              </span>
            </m.div>
          )}
        </AnimatePresence>
        {/* isHover && */}
        {
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelMonitorId(patient_id);
            }}
            className="group relative flex w-52 items-center justify-between rounded-md border border-neutral-300 bg-neutral-500 px-2 py-1 text-sm leading-none transition-colors duration-200 hover:border-neutral-200/75"
          >
            <span className="relative font-thin text-neutral-100">
              Gỡ theo dõi chi tiết
            </span>
            <ArchiveBoxArrowDownIcon className="relative h-5 w-5 fill-neutral-200 stroke-transparent stroke-0 text-neutral-200 transition-colors duration-200 group-hover:fill-neutral-100/95 " />
            {/* <XMarkIcon className="h-5 w-5 fill-neutral-300 stroke-transparent stroke-0 text-neutral-200 " /> */}
          </button>
        }
      </div>
      <div className="grid grid-cols-5">
        <div
          id="main-monitor__wave"
          className="col-span-3 grid h-full grid-cols-1 grid-rows-3"
        >
          {EcgChart}
          {Spo2Chart}
          {RespChart}
        </div>
        <div id="main-monitor__param" className="col-span-2 grid grid-rows-4">
          {MainMonitorParam}
          {/* <MainTempParam
            follower={follower}
            temps={socket.param.temp_param.temp}
            currentParam={currentParam}
          /> */}
        </div>
      </div>
    </m.div>
  );
};

export default MainMonitor;
