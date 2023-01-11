import { FC, useRef } from "react";
import {
    MiniMonitorContext,
    MiniMonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import { useContext } from "react";
import MiniMonitor from "./MiniMonitor";
import { useSelectFollowers } from "../../api/hooks/useFetchPatients";
import { GeneralInfo } from "./GeneralInfo";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {
    onWheel,
    scrollVisibilityApiType,
} from "../horizontalScrollingMenu/Utils";
import "./miniHorizontalList.css";

interface MiniMonitorsProps {}

const MiniMonitorsContainer: FC<MiniMonitorsProps> = () => {
    const { activeMiniMonitorIds } = useContext(
        MiniMonitorContext
    ) as MiniMonitorContextType;
    const { data } = useSelectFollowers(activeMiniMonitorIds);
    const apiRef = useRef({} as scrollVisibilityApiType);

    return (
        <div className="grid h-2/5 w-full grid-cols-12 border-t-2 border-neutral-400 bg-neutral-600 shadow-neutral-600/30 shadow-inner">
            <div className=" col-span-3 py-2 pl-2">
                <GeneralInfo />
            </div>
            <ScrollMenu
                wrapperClassName="col-span-9 overflow-y-hidden
             relative min-h-full"
                scrollContainerClassName="grid gap-2 p-2 h-full auto-cols-[25%] grid-flow-col 
                grid-rows-2"
                separatorClassName="hidden"
                onWheel={onWheel}
                apiRef={apiRef}
            >
                {data?.map(({ user_name, user_id, image, dob }) => (
                    <MiniMonitor
                        itemId={user_id}
                        name={user_name}
                        dob={dob}
                        img={image}
                        key={user_id}
                        patientId={user_id}
                    />
                )) ?? []}
            </ScrollMenu>
        </div>
    );
};

export default MiniMonitorsContainer;
