import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "../../VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { HeartIcon } from "../../Icons";

interface MainNibpParamProps {
    follower: ArrayElement<Followers["data"]>;
    spo2Param: SocketData["param"]["spo2_param"] | undefined;
    duration: number;
}

export const MainSpo2Param: FC<MainNibpParamProps> = ({
    follower,
    spo2Param,
    duration = 5000,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        spo2Param,
        duration
    );

    return (
        <VitalMonitorBlock
            Icon={<HeartIcon className="h-5 w-5" />}
            type="spo2"
            isPing
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.patient_detail.spo2_range.max,
                    minRange: follower.patient_detail.spo2_range.min,
                    sub: "%",
                    title: "spo2",
                    value: currentData?.spo2[index],
                },
                {
                    maxRange: follower.patient_detail.pr_range.max,
                    minRange: follower.patient_detail.pr_range.min,
                    sub: "bpm",
                    title: "pr",
                    value: currentData?.pr[index],
                },
            ]}
        />
    );
};
