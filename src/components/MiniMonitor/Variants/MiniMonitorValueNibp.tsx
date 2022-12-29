import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    nibpParam: SocketData["param"]["nibp_param"] | undefined;
    isLoading: boolean;
    duration: number;
};

export const MiniMonitorValueNibp: FC<Props> = ({
    duration,
    isLoading,
    nibpParam,
}) => {
    const { currentData, index } = useCustomizeValueInterval<
        Props["nibpParam"]
    >(nibpParam, duration);

    return (
        <MiniMonitorValue
            isLoading={isLoading}
            name="sys / dia"
            unit="mmHg"
            value={currentData?.sys[index]}
            value2={currentData?.dia[index] ?? null}
            type="nibp"
            className="col-span-2"
        />
    );
};
