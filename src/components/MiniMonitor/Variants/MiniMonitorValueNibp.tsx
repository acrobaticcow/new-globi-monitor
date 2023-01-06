import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "../MiniMonitorValue";

type Props = {
    nibpParam: SocketData["nibp_data"] | undefined;
    isLoading: boolean;
    duration: number | undefined;
};
type CustomizeValueInteral = {
    sys: SocketData["nibp_data"]["sys"];
    dia: SocketData["nibp_data"]["dia"];
};

export const MiniMonitorValueNibp: FC<Props> = ({
    duration,
    isLoading,
    nibpParam,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            nibpParam
                ? {
                      sys: nibpParam?.sys,
                      dia: nibpParam?.dia,
                  }
                : undefined,
            duration
        );

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
