import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "../../VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { HeartIcon } from "../../Icons";

interface MainNibpParamProps {
    follower: ArrayElement<Followers["data"]>;
    spo2Param: SocketData["spo2_data"] | undefined;
    duration: number | undefined;
}
type CustomizeValueInteral = {
    spo2: SocketData["spo2_data"]["spo2_point"]["values"];
    pr: SocketData["spo2_data"]["pr"]["values"];
    status: SocketData["spo2_data"]["status"]["values"];
};
export const MainSpo2Param: FC<MainNibpParamProps> = ({
    follower,
    spo2Param,
    duration = 5000,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            spo2Param
                ? {
                      spo2: spo2Param.spo2_point.values,
                      pr: spo2Param.pr.values,
                      status: spo2Param.status.values,
                  }
                : undefined,
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
                    maxRange: follower.spo2_range.max,
                    minRange: follower.spo2_range.min,
                    sub: "%",
                    title: "spo2",
                    value: currentData?.spo2[index],
                },
                {
                    maxRange: follower.pr_range.max,
                    minRange: follower.pr_range.min,
                    sub: "bpm",
                    title: "pr",
                    value: currentData?.pr[index],
                },
            ]}
        />
    );
};
