import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    tempParam: SocketData["param"]["temp_param"] | undefined;
    isLoading: boolean;
    duration: number;
};

export const MiniMonitorValuetemp: FC<Props> = ({
    duration = 5000,
    tempParam,
    isLoading,
}) => {
    const { currentData, index } = useCustomizeValueInterval<
        Props["tempParam"]
    >(tempParam, duration);

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
