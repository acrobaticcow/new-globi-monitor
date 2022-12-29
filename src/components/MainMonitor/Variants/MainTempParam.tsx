import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "../../VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { FluentTemperature16Filled } from "../../Icons";

interface MainTempParamProps {
    follower: ArrayElement<Followers["data"]>;
    tempsParam: SocketData["param"]["temp_param"] | undefined;
    duration: number;
}

export const MainTempParam: FC<MainTempParamProps> = ({
    follower,
    tempsParam,
    duration = 5000,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        tempsParam,
        duration
    );

    return (
        <VitalMonitorBlock
            Icon={<FluentTemperature16Filled className="h-5 w-5" />}
            type="temp"
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.patient_detail.temp_range.max,
                    minRange: follower.patient_detail.temp_range.min,
                    value: currentData?.temp[index],
                    sub: "°C",
                    title: "Temp 1",
                },
            ]}
        />
    );
};
