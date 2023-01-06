import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    spo2Param: SocketData["spo2_data"] | undefined;
    isLoading: boolean;
    duration: number | undefined;
};
type CustomizeValueInteral = {
    spo2: SocketData["spo2_data"]["spo2_point"]["values"];
    pr: SocketData["spo2_data"]["pr"]["values"];
};

export const MiniMonitorValueSpo2: FC<Props> = ({
    duration = 5000,
    spo2Param,
    isLoading,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            spo2Param
                ? {
                      spo2: spo2Param?.spo2_point.values,
                      pr: spo2Param?.pr.values,
                  }
                : undefined,
            duration
        );

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
