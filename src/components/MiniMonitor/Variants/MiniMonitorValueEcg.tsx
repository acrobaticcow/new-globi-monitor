import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    ecgParam: SocketData["ecg_data"] | undefined;
    isLoading: boolean;
    duration?: number;
};
type CustomizeValueInteral = {
    rr: SocketData["ecg_data"]["rr"]["values"];
    hr: SocketData["ecg_data"]["hr"]["values"];
};
export const MiniMonitorValueEcg: FC<Props> = ({
    duration = 5000,
    ecgParam,
    isLoading,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            ecgParam
                ? {
                      rr: ecgParam?.rr.values,
                      hr: ecgParam?.hr.values,
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
                value={currentData?.rr[index]}
                type="ecg"
            />
            <MiniMonitorValue
                isLoading={isLoading}
                name="hr"
                unit="bpm"
                value={currentData?.hr[index]}
                type="ecg"
            />
        </>
    );
};
