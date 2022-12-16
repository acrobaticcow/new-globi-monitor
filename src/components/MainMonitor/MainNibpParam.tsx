import { FC, useEffect, useState } from "react";
import { Followers } from "../../models/followers.models";
import { SocketData } from "../../models/realtime.models";
import { ArrayElement } from "../../models/utils.models";
import { modeIconTranslatorForNibp } from "../../utils/paramTranslator";
import { VitalMonitorBlock } from "../VitalCard";

interface MainNibpParamProps {
  follower: ArrayElement<Followers["data"]>;
  nibpParam: SocketData["param"]["nibp_param"] | undefined;
}

export const MainNibpParam: FC<MainNibpParamProps> = ({
  follower,
  nibpParam,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!nibpParam) return;
    const intervalId = setInterval(() => {
      setIndex((prev) => {
        const current = prev + 1;
        if (current > nibpParam.cuff.length) {
          clearInterval(intervalId);
          return prev;
        }
        return current;
      });
    }, 500);

    return () => {
      setIndex(0);
    };
  }, [nibpParam]);

  if (!nibpParam) return <div>loading</div>;

  return (
    <VitalMonitorBlock
      Icon={modeIconTranslatorForNibp(nibpParam.patient_mode[index])}
      type="nibp"
      status={nibpParam.status[index]}
      childrenProps={[
        {
          maxRange: follower.patient_detail.nibp_range.high_pressure.max,
          minRange: follower.patient_detail.nibp_range.high_pressure.min,
          maxRange2: follower.patient_detail.nibp_range.low_pressure.max,
          minRange2: follower.patient_detail.nibp_range.low_pressure.min,
          value: nibpParam.sys[index],
          value2: nibpParam.dia[index] ?? null,
          sub: "nibp",
          title: "sys/dia",
        },

        {
          className: "flex flex-col items-end",
          maxRange: undefined,
          minRange: undefined,
          value:
            nibpParam.status[index] !== 1
              ? nibpParam.map[index]
              : nibpParam.cuff[index],
          direction: "left",
          showRange: false,
          sub: "mmHg",
          title: nibpParam.status[index] !== 1 ? "map" : "cuff",
        },
      ]}
    />
  );
};
