import clsx from "clsx";
import { FC, useContext } from "react";
import { useSelectFollowers } from "../../api/hooks/useFetchPatients";
import {
    MonitorContext,
    MonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import MainMonitor from "./MainMonitor";

interface MainMonitorsContainerProps {}

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

const MainMonitorsContainer: FC<MainMonitorsContainerProps> = () => {
    const { activeMonitorIds } = useContext(
        MonitorContext
    ) as MonitorContextType;
    const { data } = useSelectFollowers(activeMonitorIds);

    return (
        <div className="flex h-3/5 w-full gap-6 overflow-x-scroll px-2 pt-2">
            {data?.map((follower) => (
                <MainMonitor
                    key={follower.patient_detail.patient_id}
                    follower={follower}
                />
            ))}
        </div>
    );
};

export default MainMonitorsContainer;
