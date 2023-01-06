import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    tempParam: SocketData["temp_data"] | undefined;
    isLoading: boolean;
    duration: number | undefined;
};
type CustomizeValueInteral = {
    temp: SocketData["temp_data"]["temp"];
};

export const MiniMonitorValuetemp: FC<Props> = ({
    duration = 5000,
    tempParam,
    isLoading,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            tempParam ? { temp: tempParam?.temp } : undefined,
            duration
        );

    return (
        <MiniMonitorValue
            isLoading={isLoading}
            name="resp"
            unit="brpm"
            value={currentData?.temp[index]}
            type="temp"
        />
    );
};
