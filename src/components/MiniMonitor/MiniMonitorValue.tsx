import clsx from "clsx";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { varTxtBase, Variant } from "../VitalCard";
import { m, AnimatePresence } from "framer-motion";

interface MiniMonitorValueProps {
  type: Variant;
  name: string;
  unit?: string;
  param: number[];
  param2?: number[];
  showUnit?: boolean;
  time: number[];
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
  time,
}) => {
  const [value, setValue] = useState(param[0]);
  const [value2, setValue2] = useState(param2 ? param2[0] : undefined);
  useEffect(() => {
    const timeoutIdArr: number[] = [];
    /**
     * thời gian mà thẻ sẽ thay đổi thông số
     * @example time = [2,2,1] thì sau 2s sẽ cập nhật thông số mới
     * và 2s sau nữa cập nhật thông số mới và cuối cùng là 1s sau cập nhật thông số
     */
    const beats = time.map((el, i, arr) => {
      if (i === 0) return 0;
      return el - arr[i - 1];
    });
    for (let i = 0; i < beats.length; i++) {
      const beat = beats[i];
      let timeoutId = setTimeout(() => {
        setValue(param[i]);
        param2 && setValue2(param2[i]);
        /**
         * trích xuất warning, nếu không có thì là undefined
         */
      }, 1000 * i * beat);
      timeoutIdArr.push(timeoutId);
    }
    return () => timeoutIdArr.forEach((el) => clearTimeout(el));
  }, []);
  return (
    <div className={className}>
      <span className="mr-2 h-fit text-xs font-medium uppercase text-neutral-100/75">
        {name}
      </span>
      {showUnit && <span className="text-sm text-neutral-200">{unit}</span>}
      <AnimatePresence>
        <m.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={clsx(
            varTxtBase(type),
            "text-start font-inter text-base font-semibold"
          )}
        >
          {value || "--"}
          {!!value2 && ` / ${value2 || "--"}`}
        </m.p>
      </AnimatePresence>
    </div>
  );
};
export default MiniMonitorValue;
