import type { FC } from "react";
import { Followers } from "../../models/followers.models";
import { ArrayElement } from "../../models/utils.models";
import { FluentTemperature16Filled } from "../Icons";
import { VitalMonitorBlock } from "../VitalCard";
import { SocketData } from "../../models/realtime.models";
import { useCustomizeValueInterval } from "../../hooks/useCustomizeValueInteral";

interface MainTempParamProps {
    follower: ArrayElement<Followers["data"]>;
    tempsParam: SocketData["param"]["temp_param"] | undefined;
}

const MainTempParam: FC<MainTempParamProps> = ({
    follower,
    tempsParam,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval(tempsParam);

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

export default MainTempParam;
