import { clsx } from "clsx";
import { useEffect, useState } from "react";
import type { FunctionComponent } from "react";
import { cloneChild } from "../utils/function";
import { WarningIcon } from "./Icons";

/**
 * Các loại thẻ
 */
export type Variant = "ecg" | "spo2" | "nibp" | "temp";
type NumberOrUndefined = number | null | undefined;
/**
 * El bọc bên ngoài thẻ
 * dùng để cung cấp tiêu đề, warning và các style bên ngoài như background-color và border-radius ...
 */
/**
 * Props của EcgCard
 */
interface VitalContentMonitorProps {
  maxRange: NumberOrUndefined;
  minRange: NumberOrUndefined;
  maxRange2?: NumberOrUndefined;
  minRange2?: NumberOrUndefined;
  direction?: "left" | "right";
  variant?: Variant;
  sub?: string;
  title?: string;
  value?: number;
  value2?: number;
  className?: string;
  showRange?: boolean;
}
interface VitalMonitorBlockProps {
  /**
   * type of VitalMonitorContent
   */
  type: Variant;
  warning: string;
  Icon?: any;
  isPing?: boolean;
  childrenProps: VitalContentMonitorProps[];
}

export const varTxtLight = (variant: Variant | undefined) => {
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
export const varTxtBase = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "text-biloba-flower";
    case "nibp":
      return "text-pale-prim-200";
    case "spo2":
      return "text-spray";
    case "temp":
      return "text-pale-prim";
    default:
      return "text-neutral-100";
  }
};
export const varFillBase = (variant: Variant | undefined) => {
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
  type,
  warning,
  Icon,
  isPing,
  childrenProps,
}) => {
  const [ping, setPing] = useState(false);
  useEffect(() => {
    setPing(true);
    const timeoutId = setTimeout(() => {
      setPing(false);
    }, 500);
    return () => {
      setPing(false);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative  w-full max-w-[573px] rounded px-2">
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
                      Icon?.props.className,
                      varTxtBase(type),
                      ping && "animate-ping-once"
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
          {childrenProps.map((prop, index) => (
            <VitalMonitorContent
              key={index}
              {...prop}
              variant={type}
              value={childrenProps[index].value}
              value2={childrenProps[index].value2}
            />
          ))}
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
  maxRange,
  minRange,
  maxRange2,
  minRange2,
  direction = "right",
  variant,
  sub,
  title,
  className,
  showRange = true,
  value,
  value2,
}) => {
  const rangeClsx = clsx(
    "text-xs",
    varTxtLight(variant),
    direction === "right" ? "text-end" : "text-start"
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
      <div className={clsx(!!value2 && "flex justify-between")}>
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
          <span
            className={clsx(
              "font-inter text-4xl font-semibold leading-none",
              varTxtBase(variant)
            )}
          >
            {value ?? "--"}
          </span>
        </div>
        {!!value2 && (
          <div id="item2" className="ml-auto flex gap-x-2">
            {showRange && (
              <div className="order-last mb-1.5 self-end">
                <p className={rangeClsx}>{maxRange2 ?? "--"}</p>
                <p className={rangeClsx}>{minRange2 ?? "--"}</p>
              </div>
            )}
            <span
              className={clsx(
                "font-inter text-4xl font-semibold leading-none",
                varTxtBase(variant)
              )}
            >
              <span className={clsx(varTxtBase(variant))}>/</span>
              {value2 ?? "--"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
