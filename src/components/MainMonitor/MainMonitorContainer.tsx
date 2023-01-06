import { Transition } from "@headlessui/react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import type { FC } from "react";
import {
    ScrollMenu,
    VisibilityContext,
} from "react-horizontal-scrolling-menu";
import { useSelectFollowers } from "../../api/hooks/useFetchPatients";
import {
    MonitorContext,
    MonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import MainMonitor from "./MainMonitor";

type scrollVisibilityApiType = React.ContextType<
    typeof VisibilityContext
>;
interface MainMonitorsContainerProps {}

const MainMonitorsContainer: FC<MainMonitorsContainerProps> = () => {
    const { activeMonitorIds } = useContext(
        MonitorContext
    ) as MonitorContextType;
    const { data } = useSelectFollowers(activeMonitorIds);
    const prevData = useRef(data);
    const apiRef = useRef({} as scrollVisibilityApiType);

    useEffect(() => {
        return () => {
            if (data) {
                prevData.current = data;
            }
        };
    }, [data]);
    useEffect(() => {
        if (
            apiRef.current &&
            !!data &&
            !!prevData.current &&
            data.length > prevData.current.length
        ) {
            const newlyAdded = apiRef.current.getItemElementById(
                data[data.length - 1].patient_detail.patient_id
            );
            newlyAdded && apiRef.current.scrollToItem(newlyAdded);
        }
    }, [data, prevData]);

    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            wrapperClassName="h-3/5 relative"
            scrollContainerClassName="h-full will-change-scroll p-2"
            itemClassName="basis-1/2 min-w-[calc(50%-1rem)] h-full"
            separatorClassName="mx-2"
            options={{
                ratio: 0.9,
                rootMargin: "4px",
                threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
            }}
            onWheel={onWheel}
            apiRef={apiRef}
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
    const { isFirstItemVisible, scrollToItem, getPrevElement } =
        useContext(VisibilityContext);
    const handleClick = () => {
        scrollToItem(getPrevElement(), "smooth", "start");
    };

    return (
        <Transition
            unmount={false}
            show={!isFirstItemVisible}
            enter="transition-opacity ease-in duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-y-0 left-0.5 z-30 flex items-center"
        >
            <button
                className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-neutral-300 bg-neutral-300/5 bg-noise shadow-neutral-600 backdrop-blur-sm shadow-md"
                onClick={() => handleClick()}
            >
                <ArrowLeftIcon className="h-6 w-6 stroke-neutral-100/80" />
            </button>
        </Transition>
    );
}
function RightArrow() {
    const { isLastItemVisible, scrollToItem, getNextElement } =
        useContext(VisibilityContext);
    const handleClick = () => {
        scrollToItem(getNextElement(), "smooth", "end");
    };
    return (
        <Transition
            unmount={false}
            as="div"
            show={!isLastItemVisible}
            enter="transition-opacity ease-in duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-y-0 right-0.5 z-30 flex items-center"
        >
            <button
                className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-neutral-300 bg-neutral-300/5 bg-noise shadow-neutral-600 backdrop-blur-sm shadow-md"
                onClick={() => handleClick()}
            >
                <ArrowRightIcon className="h-6 w-6 stroke-neutral-100/80" />
            </button>
        </Transition>
    );
}

function onWheel(
    apiObj: scrollVisibilityApiType,
    ev: React.WheelEvent
): void {
    const { scrollToItem, getNextElement, getPrevElement } = apiObj;
    const isThouchpad =
        Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    const scrollNext1Item = () => {
        scrollToItem(getNextElement(), "smooth", "end");
    };
    const scrollPrev1Item = () => {
        scrollToItem(getPrevElement(), "smooth", "start");
    };

    if (isThouchpad) {
        ev.stopPropagation();
        return;
    }

    if (ev.deltaY < 0) {
        scrollNext1Item();
    } else if (ev.deltaY > 0) {
        scrollPrev1Item();
    }
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
