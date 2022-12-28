import clsx from "clsx";
import { FC, useContext } from "react";
import { useLayoutEffect, useRef } from "react";
import { UserCircle } from "../Icons";
import MiniMonitorValue from "./MiniMonitorValue";
import {
    ActiveMonitorsApiContext,
    ActiveMonitorsApiContextType,
    MonitorContext,
    MonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import { useSocketValueInterval } from "../../hooks/useValueInterval";
import {
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
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
    const { onAddMonitorIds, onDelMiniMonitorId, onDelMonitorId } =
        useContext(
            ActiveMonitorsApiContext
        ) as ActiveMonitorsApiContextType;
    const { activeMonitorIds } = useContext(
        MonitorContext
    ) as MonitorContextType;
    // to connect to socket
    useSocketQuery(patientId);
    const { currentParam: value, isLoading } =
        useSocketValueInterval(patientId);

    const nameRef = useRef<HTMLParagraphElement>(null);
    const nameWrapperRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
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
                "relative row-span-1 h-full w-full max-w-sm cursor-pointer rounded-md bg-neutral-400/50 py-2 px-3 transition-colors inner-border-2 inner-border-neutral-300 shadow",
                className,
                activeMonitorIds.includes(patientId) &&
                    "border-0 border-transparent shadow-neutral-200/25 inner-border inner-border-success-600"
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
                        {value?.warning && (
                            <ExclamationTriangleIcon className="inline-block h-4 w-4 fill-transparent stroke-yellow-600" />
                        )}
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
                <MiniMonitorValue
                    isLoading={isLoading}
                    name="resp"
                    unit="brpm"
                    value={value?.resp}
                    type="ecg"
                />
                <MiniMonitorValue
                    isLoading={isLoading}
                    name="hr"
                    unit="bpm"
                    value={value?.hr}
                    type="ecg"
                />
                <MiniMonitorValue
                    isLoading={isLoading}
                    name="sys / dia"
                    unit="mmHg"
                    value={value?.sys}
                    value2={value?.dia ?? null}
                    type="nibp"
                    className="col-span-2"
                />
            </div>
            <div className="grid grid-cols-4 px-1">
                <MiniMonitorValue
                    isLoading={isLoading}
                    name="spo2"
                    unit="%"
                    value={value?.spo2}
                    type="spo2"
                />
                <MiniMonitorValue
                    isLoading={isLoading}
                    name="pr"
                    unit="bpm"
                    value={value?.pr}
                    type="spo2"
                />
                <MiniMonitorValue
                    isLoading={isLoading}
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
