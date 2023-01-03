import clsx from "clsx";
import { FC, useContext, useEffect } from "react";
import { useRef } from "react";
import { UserCircle } from "../Icons";
import {
    ActiveMonitorsApiContext,
    ActiveMonitorsApiContextType,
    MonitorContext,
    MonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSocketQuery } from "../../api/hooks/useSocketSubscription";
import { MiniMonitorValueEcg } from "./Variants/MiniMonitorValueEcg";
import { MiniMonitorValueNibp } from "./Variants/MiniMonitorValueNibp";
import { MiniMonitorValueSpo2 } from "./Variants/MiniMonitorValueSpo2";
import { MiniMonitorValuetemp } from "./Variants/MiniMonitorValueTemp";

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
    const { onAddMonitorIds, onDelMiniMonitorId, onDelMonitorId } =
        useContext(
            ActiveMonitorsApiContext
        ) as ActiveMonitorsApiContextType;
    const { activeMonitorIds } = useContext(
        MonitorContext
    ) as MonitorContextType;
    const { data: socket, isLoading } = useSocketQuery(patientId);
    const duration = socket ? (socket.to - socket.from) * 1000 : 5000;
    const nameRef = useRef<HTMLParagraphElement>(null);
    const nameWrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!nameRef.current || !nameWrapperRef.current) return;
        if (
            isEllipsisActive(nameRef.current, nameWrapperRef.current)
        ) {
            nameRef.current.classList.add("animation-right-to-left");
        }
    }, [nameRef, nameWrapperRef]);
    return (
        <div
            className={clsx(
                "relative row-span-1 h-full w-full max-w-sm cursor-pointer rounded-md bg-neutral-500 py-2 px-3 transition-colors inner-border inner-border-neutral-300 shadow",
                className,
                activeMonitorIds.includes(patientId) &&
                    "shadow-neutral-200/25 inner-border inner-border-success-600"
            )}
            onClick={() => {
                onAddMonitorIds(patientId);
                if (activeMonitorIds.includes(patientId)) {
                    onDelMonitorId(patientId);
                }
            }}
        >
            <div className="mb-1 flex items-center gap-x-10">
                {img ? (
                    <img
                        className="aspect-square w-8 rounded-full border border-neutral-200"
                        src={img}
                        alt="name"
                    />
                ) : (
                    <UserCircle className="h-8 w-8 text-neutral-200/75" />
                )}

                <div>
                    <div
                        ref={nameWrapperRef}
                        className="flex w-[22ch] items-center gap-x-2 overflow-hidden"
                    >
                        <span
                            ref={nameRef}
                            className="w-fit truncate text-sm"
                        >
                            {name}
                        </span>
                        {/* {value?.warning && (
                            <ExclamationTriangleIcon className="inline-block h-4 w-4 fill-transparent stroke-yellow-600" />
                        )} */}
                    </div>
                    <p className="text-xs text-neutral-200">{dob}</p>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelMiniMonitorId(patientId);
                    }}
                    className="group absolute top-1.5 right-1.5 flex items-center justify-center rounded-md border border-transparent p-0.5 transition-all hover:border-danger-600 hover:bg-danger-700"
                >
                    <XMarkIcon className="h-5 w-5 rounded-full fill-neutral-200/75 transition-all duration-200 active:scale-90 group-hover:fill-neutral-100" />
                </button>
            </div>
            <div className="mb-1 mt-4 grid grid-cols-4 justify-between px-1">
                <MiniMonitorValueEcg
                    isLoading={isLoading}
                    duration={duration}
                    ecgParam={socket?.param.ecg_param}
                />
                <MiniMonitorValueNibp
                    isLoading={isLoading}
                    duration={duration}
                    nibpParam={socket?.param.nibp_param}
                />
            </div>
            <div className="grid grid-cols-4 px-1">
                <MiniMonitorValueSpo2
                    isLoading={isLoading}
                    duration={duration}
                    spo2Param={socket?.param.spo2_param}
                />
                <MiniMonitorValuetemp
                    isLoading={isLoading}
                    duration={duration}
                    tempParam={socket?.param.temp_param}
                />
            </div>
        </div>
    );
};

export default MiniMonitor;
