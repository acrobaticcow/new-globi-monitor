import type { FC } from "react";
import { Followers } from "../../models/followers.models";
import { SocketData } from "../../models/realtime.models";
import { ArrayElement } from "../../models/utils.models";
import { modeIconTranslatorForNibp } from "../../utils/paramTranslator";
import { VitalMonitorBlock } from "../VitalCard";
import { useCustomizeValueInterval } from "../../hooks/useCustomizeValueInteral";

interface MainNibpParamProps {
    follower: ArrayElement<Followers["data"]>;
    nibpParam: SocketData["param"]["nibp_param"] | undefined;
}

export const MainNibpParam: FC<MainNibpParamProps> = ({
    follower,
    nibpParam,
}) => {
    const { currentData, index } =
        useCustomizeValueInterval(nibpParam);
    console.log("parent rerender");

    return (
        <VitalMonitorBlock
            Icon={
                currentData &&
                modeIconTranslatorForNibp(
                    currentData?.patient_mode[index]
                )
            }
            type="nibp"
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange:
                        follower.patient_detail.nibp_range
                            .high_pressure.max,
                    minRange:
                        follower.patient_detail.nibp_range
                            .high_pressure.min,
                    maxRange2:
                        follower.patient_detail.nibp_range
                            .low_pressure.max,
                    minRange2:
                        follower.patient_detail.nibp_range
                            .low_pressure.min,
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
