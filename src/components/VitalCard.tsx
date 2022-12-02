import { clsx } from "clsx";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  DataMonitoring,
  Ecg_param,
  Followers_Data,
  Spo2_param,
  Temp_param,
} from "../models/realtime.models";
import { cloneChild } from "../utils/function";
import { HeartIcon, WarningIcon } from "./Icons";

/**
 * Các loại thẻ
 */
type Variant = "ecg" | "spo2" | "nibp" | "temp";
type NumberOrUndefined = number | null | undefined;
/**
 * El bọc bên ngoài thẻ
 * dùng để cung cấp tiêu đề, warning và các style bên ngoài như background-color và border-radius ...
 */
interface WrapperProps {
  type: Variant;
  children: any;
  warning: string;
}
/**
 * Props của EcgCard
 */
export interface EcgVitalProps {
  /**
   * data được trả về từ socket, socket.param.ecg_param
   */
  data: Ecg_param;
  /**
   * data trả về từ followers api, sampleFollowers_Data.patient_detail.hr_range
   */
  rangeResp: Followers_Data["patient_detail"]["resp_range"] | undefined;
  /**
   * data trả về từ followers api, sampleFollowers_Data.patient_detail.resp_range
   */
  rangeHr: Followers_Data["patient_detail"]["hr_range"] | undefined;
}
interface VitalContentMonitorProps {
  maxRange: NumberOrUndefined;
  minRange: NumberOrUndefined;
  direction?: "left" | "right";
  hasDivider?: boolean;
  variant?: Variant;
  sub?: string;
  title?: string;
  time: number[];
  param: number[];
  className?: string;
  onChange?: (...args: any) => any;
  showRange?: boolean;
}
interface VitalMonitorBlockProps {
  type: Variant;
  children: any;
  warnings: string[];
  Icon?: any;
  isPing?: boolean;
}
export interface TempVitalProps {
  data: Temp_param;
  rangeTemp: Followers_Data["patient_detail"]["temp_range"] | undefined;
}
export interface Spo2VitalProps {
  /**
   * data được trả về từ socket, socket.param.spo2_param
   */
  data: Spo2_param;
  /**
   * data được trả về từ followers api, sample_followers.patient_detail.spo2_range
   */
  rangeSpo2: Followers_Data["patient_detail"]["spo2_range"] | undefined;
  /**
   * data được trả về từ followers api, sample_followers.patient_detail.pr_range
   */
  rangePr: Followers_Data["patient_detail"]["pr_range"] | undefined;
}
export interface Spo2State {
  spo2: number;
  pr: number;
}
interface VitalHeaderProps {
  sub?: string;
  title?: string;
  variant?: Variant;
}
export interface NibpVitalProps {
  /**
   * data được trả về từ socket, socket.param.nibp_param
   */
  data: DataMonitoring["data"]["param"]["nibp_param"];
  /**
   * data được trả về từ followers api, sample_followers.patient_detail.nibp_range
   */
  rangeNibp: Followers_Data["patient_detail"]["nibp_range"] | undefined;
}

const varTxtLight = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "text-biloba-flower-300/80";
    case "nibp":
      return "text-pale-prim-400/80";
    case "spo2":
      return "text-spray-200/80";
    case "temp":
      return "text-pale-prim-100/90";
    default:
      return "text-neutral-100";
  }
};
const varTxtBase = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "text-biloba-flower";
    case "nibp":
      return "text-pale-prim-600";
    case "spo2":
      return "text-spray";
    case "temp":
      return "text-pale-prim";
    default:
      return "text-neutral-100";
  }
};
const varFillBase = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "fill-biloba-flower";
    case "nibp":
      return "fill-pale-prim-600";
    case "spo2":
      return "fill-spray";
    case "temp":
      return "fill-pale-prim";
    default:
      return "fill-neutral-100";
  }
};

export const VitalMonitorBlock: FunctionComponent<VitalMonitorBlockProps> = ({
  children,
  type,
  warnings,
  Icon,
  isPing,
}) => {
  const [warning, setWarning] = useState("");
  const [ping, setPing] = useState(false);
  const onChange = (i: number) => {
    const warning = i <= warnings.length ? warnings[i] : undefined;
    warning && setWarning(warning);
  };
  useEffect(() => {
    setPing(true);
    const timeoutId = setTimeout(() => {
      setPing(false);
    }, 500);

    return () => {
      setPing(false);
      clearTimeout(timeoutId);
    };
  }, [warning]);

  return (
    <div className="relative w-full max-w-[573px] rounded  px-2">
      <div className="rounded-2xl border-neutral-200 shadow-inner shadow-neutral-500">
        <div className="mb-0.5 flex items-center justify-between">
          <h1
            className={clsx("text-sm font-medium uppercase", varTxtLight(type))}
          >
            {type}
          </h1>
          {Icon && (
            <div className="flex">
              {isPing &&
                cloneChild({
                  children: Icon,
                  props: {
                    className: clsx(
                      "absolute inline-flex opacity-75 ",
                      Icon.props.className,
                      varTxtBase(type),
                      ping && "animate-ping"
                    ),
                  },
                })}
              {cloneChild({
                children: Icon,
                props: {
                  className: `${Icon?.props.className} ${varTxtBase(type)} `,
                },
              })}
            </div>
          )}
        </div>
        <div id="main-content" className="mb-1 grid grid-cols-2">
          {cloneChild({
            children,
            props: { onChange, variant: type },
          })}
        </div>
        <div className="flex items-center">
          <WarningIcon className="inline-block h-5 w-5 stroke-neutral-200" />
          <span className="mx-4 text-xs font-semibold">{warning}</span>
        </div>
      </div>
    </div>
  );
};
export const VitalMonitorContent: FunctionComponent<
  VitalContentMonitorProps
> = ({
  time,
  param,
  maxRange,
  minRange,
  hasDivider,
  direction = "right",
  variant,
  sub,
  title,
  onChange,
  className,
  showRange = true,
}) => {
  const [value, setValue] = useState<number | undefined>();
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
        /**
         * trích xuất warning, nếu không có thì là undefined
         */
        !!onChange && onChange(i);
      }, 1000 * i * beat);
      timeoutIdArr.push(timeoutId);
    }
    return () => timeoutIdArr.forEach((el) => clearTimeout(el));
  }, []);
  const rangeClsx = useMemo(
    () =>
      clsx(
        "text-xs",
        varTxtLight(variant),
        direction === "right" ? "text-end" : "text-start"
      ),
    []
  );
  return (
    <div className={className}>
      {!!title ? (
        <h3 className={clsx("mb-1 text-start text-xs font-semibold uppercase")}>
          {title ?? ""}
          <span
            className={clsx(
              "ml-1.5 font-sans text-[9px] font-normal normal-case not-italic text-neutral-200"
            )}
          >
            {sub ?? ""}
          </span>
        </h3>
      ) : (
        <></>
      )}
      <div id="item" className="ml-auto flex gap-x-2">
        {showRange && (
          <div
            className={clsx(
              "mb-1.5 self-end",
              direction !== "right" && "order-last"
            )}
          >
            <p className={rangeClsx}>{maxRange ?? "--"}</p>
            <p className={rangeClsx}>{minRange ?? "--"}</p>
          </div>
        )}
        <p
          className={clsx(
            "font-inter text-4xl font-semibold leading-none",
            varTxtBase(variant)
            //   direction === "right" ? "order-2" : "order-1"
          )}
        >
          {value ?? "--"}

          {!!hasDivider && (
            <span className={clsx(varTxtLight(variant))}>/</span>
          )}
        </p>
      </div>
    </div>
  );
};
