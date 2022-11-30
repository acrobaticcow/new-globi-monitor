import { clsx } from "clsx";
import { Children, FunctionComponent, ReactNode, useRef } from "react";
import { useEffect, useMemo, useState } from "react";
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
 * Chuyển từ độc c sang độ f
 */
const cToF = (c: number | undefined) => {
  return c ? Number((c * 1.8 + 32).toFixed(1)) : 0;
};

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
interface EcgState {
  resp: number;
  hr: number;
}
interface VitalContentProps {
  value: NumberOrUndefined;
  maxRange: NumberOrUndefined;
  minRange: NumberOrUndefined;
  direction?: "left" | "right";
  isDivider?: boolean;
  variant?: Variant;
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
}
interface VitalMonitorBlockProps {
  type: Variant;
  children: any;
  warnings: string[];
  Icon?: any;
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
interface NipbState {
  sys: number;
  dia: number;
  map: number;
}

const varTxtLight = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "text-biloba-flower-300/80";
    case "nibp":
      return "text-pale-prim-500";
    case "spo2":
      return "text-spray-200/80";
    case "temp":
      return "text-pale-prim-50";
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
const varTxtMed = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "text-biloba-flower-500";
    case "nibp":
      return "text-pale-prim-700";
    case "spo2":
      return "text-spray-500";
    case "temp":
      return "text-pale-prim-200";
    default:
      return "text-neutral-100";
  }
};

export const VitalMonitorBlock: FunctionComponent<VitalMonitorBlockProps> = ({
  children,
  type,
  warnings,
  Icon,
}) => {
  const [warning, setWarning] = useState("");
  const onChange = (i: number) => {
    const warning = i <= warnings.length ? warnings[i] : undefined;
    warning && setWarning(warning);
  };

  return (
    <div className="relative w-full max-w-[573px] bg-grad-4 rounded-2xl p-0.5">
      <div className="rounded-2xl px-4 py-3 bg-grad-2 shadow-inner shadow-neutral-500">
        <h1
          className={clsx("font-medium text-2xl uppercase", varTxtLight(type))}
        >
          {type}
        </h1>
        {cloneChild({
          children: Icon,
          props: {
            className: `${Icon?.props.className} ${varTxtBase(
              type
            )} ${varFillBase(type)}`,
          },
        })}
        <div id="main-content" className="grid grid-cols-2">
          {cloneChild({
            children,
            props: { onChange, variant: type },
          })}
        </div>
        <div className="flex items-center">
          <WarningIcon className="inline-block h-6 w-6 stroke-neutral-200" />
          <span className="mx-4 text-lg font-semibold">{warning}</span>
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
        "text-xl",
        varTxtLight(variant),
        direction === "right" ? "text-end" : "text-start"
      ),
    []
  );
  console.log(variant);
  return (
    <div className={className}>
      <VitalHeader sub={sub} title={title} />
      <div id="item" className="ml-auto mb-5 flex gap-x-2">
        <div
          className={clsx(
            "self-end mb-1.5",
            direction !== "right" && "order-last"
          )}
        >
          <p className={rangeClsx}>{maxRange ?? "--"}</p>
          <p className={rangeClsx}>{minRange ?? "--"}</p>
        </div>
        <p
          className={clsx(
            "font-inter font-semibold text-7.25xl leading-none",
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
const VitalCardWrapper: FunctionComponent<WrapperProps> = ({
  children,
  type,
  warning,
}) => {
  return (
    <div className="relative w-full max-w-[573px] bg-grad-4 rounded-2xl p-0.5">
      <div className="rounded-2xl px-4 py-3 bg-grad-2 shadow-inner shadow-neutral-500">
        <h1
          className={clsx("font-medium text-2xl uppercase", varTxtLight(type))}
        >
          {type}
        </h1>
        <HeartIcon
          className={clsx(
            "w-7 h-7 ml-auto",
            varTxtBase(type),
            varFillBase(type)
          )}
        />
        {children}
        <p className="mx-4 mt-3 text-end text-sm">{warning}</p>
      </div>
    </div>
  );
};
const VitalHeader: FunctionComponent<VitalHeaderProps> = ({
  sub,
  title,
  variant,
}) => {
  return !!title ? (
    <h3 className={clsx("mb-2 text-start text-xl font-semibold uppercase")}>
      {title ?? ""}
      <span
        className={clsx(
          "ml-3 text-neutral-200 font-sans text-xs font-normal not-italic"
        )}
      >
        {sub ?? ""}
      </span>
    </h3>
  ) : (
    <></>
  );
};
const VitalContentBlock: FunctionComponent<VitalContentProps> = ({
  value,
  maxRange,
  minRange,
  isDivider,
  direction = "right",
  variant,
}) => {
  const rangeClsx = useMemo(
    () =>
      clsx(
        "text-xl",
        varTxtLight(variant),
        direction === "right" ? "text-end" : "text-start"
      ),
    []
  );
  return (
    <div id="item" className="ml-auto mb-5 flex gap-x-2">
      <div
        className={clsx(
          "self-end mb-1.5",
          direction !== "right" && "order-last"
        )}
      >
        <p className={rangeClsx}>{maxRange ?? "--"}</p>
        <p className={rangeClsx}>{minRange ?? "--"}</p>
      </div>
      <p
        className={clsx(
          "font-inter font-semibold text-7.25xl leading-none",
          varTxtBase(variant)
          //   direction === "right" ? "order-2" : "order-1"
        )}
      >
        {value ?? "--"}

        {!!isDivider && <span className={clsx(varTxtLight(variant))}>/</span>}
      </p>
    </div>
  );
};
/**
 * Thẻ thông số Ecg
 */
export const EcgVital: FunctionComponent<EcgVitalProps> = ({
  data,
  rangeResp,
  rangeHr,
}) => {
  const [ecgData, setEcgData] = useState<EcgState | undefined>();
  const [warning, setWarning] = useState("");
  useEffect(() => {
    const timeoutIdArr: number[] = [];
    /**
     * thời gian mà thẻ sẽ thay đổi thông số
     * @example time = [2,2,1] thì sau 2s sẽ cập nhật thông số mới
     * và 2s sau nữa cập nhật thông số mới và cuối cùng là 1s sau cập nhật thông số
     */
    const beats = data.time.map((el, i, arr) => {
      if (i === 0) return 0;
      return el - arr[i - 1];
    });
    for (let i = 0; i < beats.length; i++) {
      const beat = beats[i];
      let timeoutId = setTimeout(() => {
        setEcgData(() => ({ resp: data.resp[i], hr: data.hr[i] }));
        /**
         * trích xuất warning, nếu không có thì là undefined
         */
        const warning =
          i <= data?.warning.length ? data?.warning[i] : undefined;
        warning && setWarning(warning);
      }, 1000 * i * beat);
      timeoutIdArr.push(timeoutId);
    }
    return () => timeoutIdArr.forEach((el) => clearTimeout(el));
  }, []);

  return (
    <VitalCardWrapper type={"ecg"} warning={warning}>
      <div id="main-content" className="grid h-fit grid-cols-2 gap-2">
        <div>
          <VitalHeader sub="bbm" title="resp" variant="ecg" />
          <VitalContentBlock
            maxRange={rangeResp?.max}
            minRange={rangeResp?.min}
            value={ecgData?.resp}
            variant="ecg"
          />
        </div>
        <div>
          <VitalHeader sub="bbm" title="hr" variant="ecg" />
          <VitalContentBlock
            maxRange={rangeHr?.max}
            minRange={rangeHr?.min}
            value={ecgData?.hr}
            direction="left"
            variant="ecg"
          />
        </div>
      </div>
    </VitalCardWrapper>
  );
};

export const NibpVital: FunctionComponent<NibpVitalProps> = ({
  data,
  rangeNibp,
}) => {
  const [nibpData, setNipbData] = useState<NipbState | undefined>();
  const [warning, setWarning] = useState("");
  useEffect(() => {
    const timeoutIdArr: number[] = [];
    const beats = data.time.map((el, i, arr) => {
      if (i === 0) return 0;
      return el - arr[i - 1];
    });
    for (let i = 0; i < beats.length; i++) {
      const beat = beats[i];
      let timeoutId = setTimeout(() => {
        setNipbData(() => ({
          sys: data.sys[i],
          dia: data.dia[i],
          map: data.map[i],
        }));
        const warning =
          i <= data?.warning.length ? data?.warning[i] : undefined;
        warning && setWarning(warning);
      }, 1000 * i * beat);
      timeoutIdArr.push(timeoutId);
    }
    return () => timeoutIdArr.forEach((el) => clearTimeout(el));
  }, []);

  return (
    <VitalCardWrapper warning={warning} type="nibp">
      <div id="main-content" className="grid h-fit grid-cols-2 gap-2 px-6 ">
        <div>
          <VitalHeader sub="mmHg" title="sys/dia" variant="nibp" />
          <div
            id="grid--cols-2__center"
            className="grid grid-cols-2 place-items-center gap-5"
          >
            <VitalContentBlock
              maxRange={rangeNibp?.high_pressure.max}
              minRange={rangeNibp?.high_pressure.min}
              value={nibpData?.sys}
              variant="nibp"
              isDivider
            />
            <VitalContentBlock
              maxRange={rangeNibp?.low_pressure.max}
              minRange={rangeNibp?.low_pressure.min}
              value={nibpData?.dia}
              variant="nibp"
              direction="left"
            />
          </div>
        </div>
        <div>
          <VitalHeader sub="mmHg" title="sys/dia" variant="nibp" />
          <VitalContentBlock
            maxRange={rangeNibp?.high_pressure.max}
            minRange={rangeNibp?.high_pressure.min}
            value={nibpData?.sys}
            variant="nibp"
          />
        </div>
      </div>
    </VitalCardWrapper>
  );
};

export const Spo2Vital: FunctionComponent<Spo2VitalProps> = ({
  data,
  rangeSpo2,
  rangePr,
}) => {
  const [spo2, setSpo2] = useState<Spo2State | undefined>();
  const [warning, setWarning] = useState("");
  useEffect(() => {
    const timeoutIdArr: number[] = [];
    const beats = data.time.map((el, i, arr) => {
      if (i === 0) return 0;
      return el - arr[i - 1];
    });
    for (let i = 0; i < beats.length; i++) {
      const beat = beats[i];
      let timeoutId = setTimeout(() => {
        setSpo2(() => ({ spo2: data?.spo2[i], pr: data.pr[i] }));
        const warning =
          i <= data?.warning.length ? data?.warning[i] : undefined;
        warning && setWarning(warning);
      }, 1000 * i * beat);
      timeoutIdArr.push(timeoutId);
    }
    return () => timeoutIdArr.forEach((el) => clearTimeout(el));
  }, []);

  return (
    <VitalCardWrapper type={"spo2"} warning={warning}>
      <div id="main-content" className="grid h-fit grid-cols-2  gap-2 px-6 ">
        <div>
          <VitalHeader sub="%" title="spo2" variant="spo2" />
          <VitalContentBlock
            maxRange={rangeSpo2?.max}
            minRange={rangeSpo2?.min}
            value={spo2?.spo2}
            variant="spo2"
          />
        </div>
        <div>
          <VitalHeader sub="bbm" title="pr" variant="spo2" />
          <VitalContentBlock
            maxRange={rangePr?.max}
            minRange={rangePr?.min}
            value={spo2?.pr}
            variant="spo2"
          />
        </div>
      </div>
    </VitalCardWrapper>
  );
};

export const TempVital: FunctionComponent<TempVitalProps> = ({
  data,
  rangeTemp,
}) => {
  const [temp, setTemp] = useState<number>();
  const [warning, setWarning] = useState("");
  useEffect(() => {
    const timeoutIdArr: number[] = [];
    const beats = data.time.map((el, i, arr) => {
      if (i === 0) return 0;
      return el - arr[i - 1];
    });
    for (let i = 0; i < beats.length; i++) {
      const beat = beats[i];
      let timeoutId = setTimeout(() => {
        setTemp(Number(data.temp[i].toFixed(1)));
        const warning =
          i <= data?.warning.length ? data?.warning[i] : undefined;
        warning && setWarning(warning);
      }, 1000 * i * beat);
      timeoutIdArr.push(timeoutId);
    }
    return () => timeoutIdArr.forEach((el) => clearTimeout(el));
  }, []);

  return (
    <VitalCardWrapper type={"temp"} warning={warning}>
      <div id="main-content" className="grid h-fit grid-cols-2 gap-2 px-6 ">
        <div>
          <VitalHeader sub="°C" title="temp 1" variant="temp" />
          <VitalContentBlock
            maxRange={rangeTemp?.max}
            minRange={rangeTemp?.min}
            value={temp}
            variant="temp"
          />
        </div>
        <div>
          <VitalHeader sub="°F" title="temp 2" variant="temp" />
          <VitalContentBlock
            maxRange={Number(cToF(rangeTemp?.max).toFixed(0))}
            minRange={Number(cToF(rangeTemp?.min).toFixed(0))}
            value={cToF(temp)}
            variant="temp"
          />
        </div>
      </div>
    </VitalCardWrapper>
  );
};
