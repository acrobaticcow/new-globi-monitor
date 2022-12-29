import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    ecgParam: SocketData["param"]["ecg_param"] | undefined;
    isLoading: boolean;
    duration: number;
};

export const MiniMonitorValueEcg: FC<Props> = ({
    duration = 5000,
    ecgParam,
    isLoading,
}) => {
    const { currentData, index } = useCustomizeValueInterval<
        Props["ecgParam"]
    >(ecgParam, duration);

    return (
        <>
            <MiniMonitorValue
                isLoading={isLoading}
                name="resp"
                unit="brpm"
                value={currentData?.resp[index]}
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
