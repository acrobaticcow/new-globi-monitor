import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "../../VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { HeartIcon } from "../../Icons";

interface MainNibpParamProps {
    follower: ArrayElement<Followers["data"]>;
    ecgParam: SocketData["ecg_data"] | undefined;
    duration: number | undefined;
}
type CustomizeValueInteral = {
    rr: SocketData["ecg_data"]["rr"]["values"];
    hr: SocketData["ecg_data"]["hr"]["values"];
    status: SocketData["ecg_data"]["status"]["values"];
};
const MainEcgParam: FC<MainNibpParamProps> = ({
    follower,
    ecgParam,
    duration = 5000,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            ecgParam
                ? {
                      rr: ecgParam.rr.values,
                      hr: ecgParam.hr.values,
                      status: ecgParam.status.values,
                  }
                : undefined,
            duration
        );

    return (
        <VitalMonitorBlock
            Icon={<HeartIcon className=" h-5 w-5 " />}
            type="ecg"
            isPing
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.resp_range.max,
                    minRange: follower.resp_range.min,
                    sub: "bpm",
                    title: "resp",
                    value: currentData?.rr[index],
                },
                {
                    maxRange: follower.hr_range.max,
                    minRange: follower.hr_range.min,
                    sub: "bpm",
                    title: "hr",
                    value: currentData?.hr[index],
                },
            ]}
        />
    );
};

export default MainEcgParam;
