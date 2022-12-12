import clsx from "clsx";
import type { FC } from "react";
import { varTxtBase, Variant } from "../VitalCard";

interface MiniMonitorValueProps {
  /**
   * kiểu thông tin như ecg hay nibp ...
   */
  type: Variant;
  /**
   * tên thông tin như resp hoặc hr trong ecg
   */
  name: string;
  /**
   * đơn vị đo lường
   */
  unit?: string;
  /**
   * giá trị một
   */
  value: number | undefined;
  /**
   * chỉ có kiểu đo sys/dia mới có giá trị thứ 2
   */
  value2?: number;
  /**
   * thích thì show đơn vị
   */
  showUnit?: boolean;
  className?: string;
}

const MiniMonitorValue: FC<MiniMonitorValueProps> = ({
  className,
  type,
  name,
  unit,
  showUnit,
  value,
  value2,
}) => {
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
        {value || "--"}
        {!!value2 && ` / ${value2 || "--"}`}
      </p>
    </div>
  );
};
export default MiniMonitorValue;
