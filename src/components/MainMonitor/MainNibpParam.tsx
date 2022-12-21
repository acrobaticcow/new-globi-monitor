import {
  FC,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const deferredIndex = useDeferredValue(index);

  useEffect(() => {
    if (!nibpParam) return;
    const intervalId = setInterval(() => {
      setIndex((prev) => {
        const current = prev + 1;
        if (current >= nibpParam.cuff.length) {
          clearInterval(intervalId);
          return 0;
        }
        return current;
      });
    }, 500);

    return () => {
      setIndex(0);
      clearInterval(intervalId);
    };
  }, [nibpParam]);

  if (nibpParam?.cuff[0] !== 0) {
    console.log(nibpParam?.cuff[index], nibpParam?.cuff, index);
  } else {
    console.log(nibpParam?.map[index], nibpParam?.map, index);
  }

  return (
    <VitalMonitorBlock
      Icon={
        nibpParam && modeIconTranslatorForNibp(nibpParam?.patient_mode[index])
      }
      type="nibp"
      status={nibpParam?.status[index]}
      childrenProps={[
        {
          maxRange: follower.patient_detail.nibp_range.high_pressure.max,
          minRange: follower.patient_detail.nibp_range.high_pressure.min,
          maxRange2: follower.patient_detail.nibp_range.low_pressure.max,
          minRange2: follower.patient_detail.nibp_range.low_pressure.min,
          value: nibpParam?.sys[deferredIndex],
          value2: nibpParam?.dia[deferredIndex] ?? null,
          sub: "nibp",
          title: "sys/dia",
        },

        {
          className: "flex flex-col items-end",
          maxRange: undefined,
          minRange: undefined,
          value:
            nibpParam?.status[deferredIndex] !== 1
              ? nibpParam?.map[deferredIndex]
              : nibpParam?.cuff[deferredIndex],
          direction: "left",
          showRange: false,
          sub: "mmHg",
          title: nibpParam?.status[deferredIndex] !== 1 ? "map" : "cuff",
        },
      ]}
    />
  );
};
