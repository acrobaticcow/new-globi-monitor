import clsx from "clsx";
import type { FC } from "react";
import { varTxtBase, Variant } from "../VitalCard";
import { useValueInterval } from "../../hooks/useValueInterval";

interface MiniMonitorValueProps {
  type: Variant;
  name: string;
  unit?: string;
  param: number[];
  param2?: number[];
  showUnit?: boolean;
  times: number[];
  className?: string;
}

const MiniMonitorValue: FC<MiniMonitorValueProps> = ({
  className,
  type,
  name,
  unit,
  param,
  param2,
  showUnit,
  times,
}) => {
  const { currentValueAndParams } = useValueInterval({
    times,
    valuesAndParams: [
      {
        param,
        param2,
        value: param[0],
        value2: param2?.length ? param2[0] : undefined,
      },
    ],
  });

  return (
    <div className={className}>
      <span className="mr-2 h-fit text-xs font-medium uppercase text-neutral-100/75">
        {name}
      </span>
      {showUnit && <span className="text-sm text-neutral-200">{unit}</span>}
      <p
        className={clsx(
          varTxtBase(type),
          "text-start font-inter text-base font-semibold"
        )}
      >
        {currentValueAndParams[0].value || "--"}
        {!!currentValueAndParams[0].value2 &&
          ` / ${currentValueAndParams[0].value2 || "--"}`}
      </p>
    </div>
  );
};
export default MiniMonitorValue;
