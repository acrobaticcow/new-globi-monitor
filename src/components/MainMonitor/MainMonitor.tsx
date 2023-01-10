import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import type { FC } from "react";
import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useFetchUser } from "../../api/hooks/useFetchUser";
import {
    ActiveMonitorsApiContext,
    ActiveMonitorsApiContextType,
} from "../../hooks/useActiveMonitorProvider";
import { Followers } from "../../models/followers.models";
import { SocketData } from "../../models/realtime.models";
import { ArrayElement } from "../../models/utils.models";
import Chart, { ConfigType } from "../Chart/Chart";
import { HalfBatteryIcon } from "../Icons";
import { Mask } from "../Mask";
import * as MainMonitorValue from "./Variants/Variants";
/**
 * Chuyển từ độc c sang độ f
 */
type Param = {
    ecg: MainMonitorValue.EcgParam;
    nibp: MainMonitorValue.NibpParam;
    spo2: MainMonitorValue.Spo2Param;
    temp: MainMonitorValue.TempParam;
};
interface MainMonitorProps {
    className?: string;
    isError?: boolean;
    follower: ArrayElement<Followers["data"]>;
    itemId: string;
}
const ecgConfig: ConfigType = {
        color: "00FF00",
        WINDOW_POINTS: 1250,
        scanBarLength: 40,
        minVal: -5,
        maxVal: 255,
        type: "ecg",
        duration: 5000,
    },
    spo2Config: ConfigType = {
        color: "FFFF00",
        WINDOW_POINTS: 250,
        scanBarLength: 40,
        minVal: -5,
        maxVal: 105,
        type: "spo2",
        duration: 5000,
    },
    respConfig: ConfigType = {
        color: "00FFFF",
        WINDOW_POINTS: 250,
        scanBarLength: 40,
        minVal: -5,
        maxVal: 255,
        duration: 5000,
        type: "rr",
    };

const MainMonitor: FC<MainMonitorProps> = ({
    className,
    follower,
}) => {
    const { isItemVisible } = useContext(VisibilityContext);
    const patient_id = follower.user_id;
    const isVisible = isItemVisible(patient_id);
    const { data: user } = useFetchUser();
    const { data: socket } = useQuery<SocketData>({
        queryKey: [user?.user_id, patient_id, Promise],
        queryFn: () => new Promise<SocketData>(() => {}),
        enabled: !!user && isVisible,
    });
    const { onDelMonitorId } = useContext(
        ActiveMonitorsApiContext
    ) as ActiveMonitorsApiContextType;
    const duration = socket
        ? socket.to_ts - socket.from_ts
        : undefined;
    const param: Param | undefined = !!socket
        ? {
              ecg: {
                  rr: socket.ecg_data.rr.values,
                  hr: socket.ecg_data.hr.values,
                  status: socket.ecg_data.status.values,
              },
              nibp: {
                  cuff: socket.nibp_data.cuff,
                  sys: socket.nibp_data.sys,
                  dia: socket.nibp_data.dia,
                  map: socket.nibp_data.map,
                  mode: socket.nibp_data.patient_mode,
                  status: socket.nibp_data.status,
              },
              spo2: {
                  pr: socket.spo2_data.pr.values,
                  spo2: socket.spo2_data.spo2_point.values,
                  status: socket.spo2_data.status.values,
              },
              temp: {
                  status: socket.temp_data.status,
                  temps: socket.temp_data.temp,
              },
          }
        : undefined;
    return (
        <div
            id="main-monitor"
            className={clsx(
                "relative h-fit rounded-b rounded-t-xl border border-neutral-300 ",
                className
            )}
            tabIndex={0}
        >
            <Mask
                isActive={true}
                className="absolute inset-0 !z-0"
            />
            <div className="flex items-center justify-between rounded-t-xl border-b border-b-neutral-300/50 bg-neutral-500 p-2">
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
                                    {follower.user_name}
                                </p>
                            </div>
                            <p className="mr-1 text-xs leading-tight text-neutral-200">
                                {follower.dob}
                            </p>
                        </div>
                        <div>
                            <p className="mr-1 text-sm leading-tight text-neutral-200">
                                {follower.gender}
                            </p>
                            <p className="mr-1 text-xs leading-tight text-neutral-200">
                                {follower.phone}
                            </p>
                        </div>
                        <HalfBatteryIcon className="h-5 w-5 fill-neutral-200 stroke-neutral-200 stroke-0" />
                    </div>
                </div>

                {/* {!!socket?.warning.warning && (
                    <div
                        className={clsx(
                            "absolute left-1/2 top-4 z-50 flex w-80 -translate-x-1/2  items-center justify-between rounded-md border px-2 py-1 text-sm shadow-neutral-400 backdrop-blur-md shadow-lg",
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
                                isError
                                    ? "text-danger-50"
                                    : "text-success-50"
                            )}
                        >
                            {socket.warning.warning[0]}
                        </span>
                    </div>
                )} */}

                {/* isHover && */}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelMonitorId(patient_id);
                    }}
                    className="group relative flex w-52 items-center justify-between rounded-md border-2 border-danger-900/75 bg-danger-900/20 px-2 py-1 text-sm leading-none shadow-danger-900/25 transition-all duration-200 ease-in-out inner-border-transparent hover:border-danger-900 hover:shadow-danger-900/30 hover:shadow-sm active:scale-95 active:outline-1 active:outline-offset-2 active:outline-danger-900 active:outline"
                >
                    <span className="relative font-thin text-danger-50 group-hover:text-neutral-100">
                        Gỡ theo dõi chi tiết
                    </span>
                    <ArchiveBoxArrowDownIcon className="relative h-5 w-5 fill-neutral-100/60 stroke-transparent stroke-0 transition-colors duration-200 group-hover:fill-danger-100 " />
                </button>
            </div>
            <div className="grid grid-cols-5 px-2 pb-2">
                <div
                    id="main-monitor__wave"
                    className="col-span-3 grid h-full grid-cols-1 grid-rows-3 gap-0.5 pt-2"
                >
                    {isVisible && (
                        <>
                            <Chart
                                data={socket}
                                config={ecgConfig}
                            />
                            <Chart
                                data={socket}
                                config={respConfig}
                            />
                            <Chart
                                data={socket}
                                config={spo2Config}
                            />
                        </>
                    )}
                </div>
                <div
                    id="main-monitor__param"
                    className="col-span-2 ml-2 grid grid-rows-4"
                >
                    <MainMonitorValue.Ecg
                        follower={follower}
                        param={param?.ecg}
                        duration={duration}
                    />
                    <MainMonitorValue.Nibp
                        follower={follower}
                        param={param?.nibp}
                        duration={duration}
                    />
                    <MainMonitorValue.Spo2
                        follower={follower}
                        param={param?.spo2}
                        duration={duration}
                    />
                    <MainMonitorValue.Temp
                        follower={follower}
                        param={param?.temp}
                        duration={duration}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainMonitor;
