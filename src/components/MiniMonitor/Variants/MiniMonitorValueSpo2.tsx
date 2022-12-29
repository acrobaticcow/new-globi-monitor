import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    spo2Param: SocketData["param"]["spo2_param"] | undefined;
    isLoading: boolean;
    duration: number;
};

export const MiniMonitorValueSpo2: FC<Props> = ({
    duration = 5000,
    spo2Param,
    isLoading,
}) => {
    const { currentData, index } = useCustomizeValueInterval<
        Props["spo2Param"]
    >(spo2Param, duration);

    return (
        <>
            <MiniMonitorValue
                isLoading={isLoading}
                name="resp"
                unit="brpm"
                value={currentData?.spo2[index]}
                type="spo2"
            />
            <MiniMonitorValue
                isLoading={isLoading}
                name="hr"
                unit="bpm"
                value={currentData?.pr[index]}
                type="spo2"
            />
        </>
    );
};
