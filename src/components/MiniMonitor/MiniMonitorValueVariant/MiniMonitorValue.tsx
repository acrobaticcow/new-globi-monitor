import clsx from "clsx";
import type { FC } from "react";
import { Variant, varTxtBase } from "../../../utils/textColorClass";

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
  value2?: number | null;
  /**
   * thích thì show đơn vị
   */
  showUnit?: boolean;
  className?: string;
  isLoading: boolean;
}

const MiniMonitorValue: FC<MiniMonitorValueProps> = ({
  className,
  type,
  name,
  unit,
  showUnit,
  value,
  value2 = undefined,
  isLoading,
}) => {
  return (
      <div className={className}>
          <p
              className={clsx(
                  !isLoading
                      ? "mr-2 h-fit text-xs font-medium uppercase text-neutral-100/75"
                      : "h-2 w-8 animate-pulse rounded-md bg-neutral-200/50"
              )}
          >
              {!isLoading && name}
          </p>
          {showUnit && (
              <span className="text-sm text-neutral-200">{unit}</span>
          )}
          <p
              className={clsx(
                  !isLoading
                      ? varTxtBase(type)
                      : "text-neutral-200/75",
                  "text-start font-inter text-base font-semibold",
                  isLoading && "animate-pulse"
              )}
          >
              {value || "--"}
              {value2 !== undefined && ` / ${value2 || "--"}`}
          </p>
      </div>
  );
};
export default MiniMonitorValue;
