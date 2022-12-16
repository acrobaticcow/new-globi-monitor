import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import { CurrentParam } from "../../hooks/useValueInterval";
import { Followers } from "../../models/followers.models";
import { ArrayElement } from "../../models/utils.models";
import { FluentTemperature16Filled } from "../Icons";
import { VitalMonitorBlock } from "../VitalCard";

interface MainTempParamProps {
  follower: ArrayElement<Followers["data"]>;
  currentParam: CurrentParam;
  temps: number[];
}

const MainTempParam: FC<MainTempParamProps> = ({
  follower,
  currentParam,
  temps,
}) => {
  const [index, setIndex] = useState(0);
  const transformedTemps = useMemo(
    () =>
      temps
        .filter((_, i) => [9, 19, 29, 39, 49].includes(i))
        .map((value) => Number(value.toFixed(1))),
    [temps]
  );

  useEffect(() => {
    const timeoutIds = [] as number[];

    for (let i = 0; i < transformedTemps.length; i++) {
      const timeoutId = setTimeout(() => {
        setIndex((prev) =>
          prev + 1 > transformedTemps.length ? prev : prev + 1
        );
      }, 1000 * i);
      timeoutIds.push(timeoutId);
    }

    return () => {
      timeoutIds.forEach((id) => {
        clearTimeout(id);
      });
      setIndex(0);
    };
  }, [transformedTemps]);

  return (
    <VitalMonitorBlock
      Icon={<FluentTemperature16Filled className="h-5 w-5" />}
      type="temp"
      status={currentParam.tempSt}
      childrenProps={[
        {
          maxRange: follower.patient_detail.temp_range.max,
          minRange: follower.patient_detail.temp_range.min,
          value: transformedTemps[index] ?? transformedTemps[index - 1],
          sub: "°C",
          title: "Temp 1",
        },
      ]}
    />
  );
};

export default MainTempParam;
