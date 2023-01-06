import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "../../VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { modeIconTranslatorForNibp } from "../../../utils/paramTranslator";

interface MainNibpParamProps {
    follower: ArrayElement<Followers["data"]>;
    nibpParam: SocketData["nibp_data"] | undefined;
    duration: number | undefined;
}
type CustomizeValueInteral = {
    sys: SocketData["nibp_data"]["sys"];
    dia: SocketData["nibp_data"]["dia"];
    status: SocketData["nibp_data"]["status"];
    map: SocketData["nibp_data"]["map"];
    cuff: SocketData["nibp_data"]["cuff"];
};
export const MainNibpParam: FC<MainNibpParamProps> = ({
    follower,
    nibpParam,
    duration = 5000,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval<CustomizeValueInteral>(
            nibpParam
                ? {
                      sys: nibpParam.sys,
                      dia: nibpParam.dia,
                      status: nibpParam.status,
                      map: nibpParam.map,
                      cuff: nibpParam.cuff,
                  }
                : undefined,
            duration
        );

    return (
        <VitalMonitorBlock
            Icon={
                currentData &&
                modeIconTranslatorForNibp(nibpParam?.patient_mode)
            }
            type="nibp"
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.nibp_range.high_pressure.max,
                    minRange: follower.nibp_range.high_pressure.min,
                    maxRange2: follower.nibp_range.low_pressure.max,
                    minRange2: follower.nibp_range.low_pressure.min,
                    value: currentData?.sys[index],
                    value2: currentData?.dia[index] ?? null,
                    sub: "nibp",
                    title: "sys/dia",
                },

                {
                    className: "flex flex-col items-end",
                    maxRange: undefined,
                    minRange: undefined,
                    value:
                        currentData?.status[index] !== 1
                            ? currentData?.map[index]
                            : currentData?.cuff[index],
                    direction: "left",
                    showRange: false,
                    sub: "mmHg",
                    title:
                        currentData?.status[index] !== 1
                            ? "map"
                            : "cuff",
                },
            ]}
        />
    );
};
