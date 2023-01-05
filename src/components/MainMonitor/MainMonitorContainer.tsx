import clsx from "clsx";
import { FC, useContext, useEffect, useState } from "react";
import { useSelectFollowers } from "../../api/hooks/useFetchPatients";
import {
    MonitorContext,
    MonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import MainMonitor from "./MainMonitor";
import {
    ScrollMenu,
    VisibilityContext,
} from "react-horizontal-scrolling-menu";
import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

interface MainMonitorsContainerProps {}

const MainMonitorsContainer: FC<MainMonitorsContainerProps> = () => {
    const { activeMonitorIds } = useContext(
        MonitorContext
    ) as MonitorContextType;
    const { data } = useSelectFollowers(activeMonitorIds);

    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            wrapperClassName="h-3/5"
            scrollContainerClassName="h-full p-2"
            itemClassName="basis-1/2 min-w-[calc(50%-1rem)] h-full"
            separatorClassName="mx-2"
        >
            {data?.map((follower) => (
                <MainMonitor
                    itemId={follower.patient_detail.patient_id}
                    key={follower.patient_detail.patient_id}
                    follower={follower}
                />
            )) ?? []}
        </ScrollMenu>
    );
};

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
        useContext(VisibilityContext);

    return (
        <Transition
            unmount={false}
            as="button"
            show={!isFirstItemVisible}
            enter="transition-all transform ease-linear duration-75"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition-all hidden transform ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
        >
            <button
                className="relative flex h-full w-fit items-center border-r border-b border-neutral-300 bg-neutral-200/5 px-1"
                onClick={() => scrollPrev()}
            >
                <ArrowLeftCircleIcon className="h-6 w-6 stroke-neutral-200/90" />
            </button>
        </Transition>
    );
}
function RightArrow() {
    const { isLastItemVisible, scrollNext } =
        useContext(VisibilityContext);

    return (
        <Transition
            unmount={false}
            as="button"
            show={!isLastItemVisible}
            enter="transition-all transform ease-linear duration-75"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition-all hidden transform ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
        >
            <button
                className="relative flex h-full w-fit items-center border-l border-b border-neutral-300 bg-neutral-200/5 px-1"
                onClick={() => scrollNext()}
            >
                <ArrowRightCircleIcon className="h-6 w-6 stroke-neutral-200/90" />
            </button>
        </Transition>
    );
}

const MainMonitorLoadingPlaceholder = () => {
    return (
        <div className="relative w-full max-w-[573px] px-2">
            <div className="rounded border border-b-0 border-neutral-400 bg-neutral-500/75 px-5 shadow-neutral-300/5 shadow-inner">
                <div className="mb-0.5 flex items-center justify-between">
                    <h1
                        className={clsx(
                            "animate-pulse bg-neutral-300/50 text-sm font-medium uppercase"
                        )}
                    >
                        {"    "}
                    </h1>
                </div>
                <div
                    id="main-content"
                    className="mb-1 grid grid-cols-2"
                >
                    <div className="">
                        (
                        <h3
                            className={clsx(
                                "mb-1 text-start text-xs font-semibold uppercase"
                            )}
                        >
                            <span
                                className={clsx(
                                    "ml-1.5 font-sans text-[9px] font-normal normal-case not-italic text-neutral-200"
                                )}
                            ></span>
                        </h3>
                        )
                        <div className="flex">
                            <div
                                id="item"
                                className="flex gap-x-2"
                            >
                                <div
                                    className={clsx(
                                        "mb-1.5 self-end"
                                    )}
                                >
                                    <p></p>
                                    <p></p>
                                </div>

                                <div
                                    className={clsx(
                                        "font-inter text-4xl font-semibold leading-none"
                                    )}
                                ></div>
                            </div>
                            <div
                                id="item2"
                                className="flex gap-x-2"
                            >
                                <div
                                    className={clsx(
                                        "font-inter text-4xl font-semibold leading-none"
                                    )}
                                >
                                    <span>/</span>
                                    <span></span>
                                </div>
                                <div className="">
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex  items-center">
                    <span
                        className={clsx("mx-4 text-xs font-semibold")}
                    ></span>
                </div>
            </div>
        </div>
    );
};

export default MainMonitorsContainer;
