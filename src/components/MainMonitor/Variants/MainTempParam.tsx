import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "../../VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { FluentTemperature16Filled } from "../../Icons";

interface MainTempParamProps {
    follower: ArrayElement<Followers["data"]>;
    tempsParam: SocketData["temp_data"] | undefined;
    duration: number | undefined;
}
type CustomizeValueInteral = {
    temps: SocketData["temp_data"]["temp"];
    status: SocketData["temp_data"]["status"];
};
export const MainTempParam: FC<MainTempParamProps> = ({
    follower,
    tempsParam,
    duration = 5000,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            tempsParam
                ? {
                      temps: tempsParam?.temp,
                      status: tempsParam.status,
                  }
                : undefined,
            duration
        );

    return (
        <VitalMonitorBlock
            Icon={<FluentTemperature16Filled className="h-5 w-5" />}
            type="temp"
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.temp_range.max,
                    minRange: follower.temp_range.min,
                    value: currentData?.temps[index],
                    sub: "°C",
                    title: "Temp 1",
                },
            ]}
        />
    );
};
