import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "../../VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { HeartIcon } from "../../Icons";

interface MainNibpParamProps {
    follower: ArrayElement<Followers["data"]>;
    ecgParam: SocketData["param"]["ecg_param"] | undefined;
    duration: number;
}

const MainEcgParam: FC<MainNibpParamProps> = ({
    follower,
    ecgParam,
    duration = 5000,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        ecgParam,
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
                    maxRange: follower.patient_detail.resp_range.max,
                    minRange: follower.patient_detail.resp_range.min,
                    sub: "bpm",
                    title: "resp",
                    value: currentData?.resp[index],
                },
                {
                    maxRange: follower.patient_detail.hr_range.max,
                    minRange: follower.patient_detail.hr_range.min,
                    sub: "bpm",
                    title: "hr",
                    value: currentData?.hr[index],
                },
            ]}
        />
    );
};

export default MainEcgParam;
