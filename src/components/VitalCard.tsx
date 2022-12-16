import { clsx } from "clsx";
import { useEffect, useState } from "react";
import type { FunctionComponent } from "react";
import { cloneChild } from "../utils/function";
import { WarningIcon } from "./Icons";
import { varTxtLight, varTxtBase, Variant } from "../utils/textColorClass";
import { generalStTranslator } from "../utils/paramTranslator";

type NumberOrUndefined = number | null | undefined;

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
  status: number;
  Icon?: any;
  isPing?: boolean;
  childrenProps: VitalContentMonitorProps[];
}

export const VitalMonitorBlock: FunctionComponent<VitalMonitorBlockProps> = ({
  type,
  Icon,
  isPing,
  childrenProps,
  status,
}) => {
  // const [ping, setPing] = useState(false);
  // useEffect(() => {
  //   if (!isPing) return;
  //   setPing(true);
  //   const timeoutId = setTimeout(() => {
  //     setPing(false);
  //   }, 500);
  //   return () => {
  //     setPing(false);
  //     clearTimeout(timeoutId);
  //   };
  // }, [childrenProps, isPing]);

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
              {/* {isPing && cloneChild({
                  children: Icon,
                  props: {
                    className: clsx(
                      "absolute inline-flex opacity-75 ",
                      Icon?.props.className,
                      varTxtBase(type),
                      ping && "animate-ping"
                    ),
                  },
                })} */}
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
        <div className="flex  items-center">
          <WarningIcon className="inline-block h-5 w-5 stroke-neutral-200" />
          <span className="mx-4 text-xs font-semibold">
            {generalStTranslator({ status, type })}
          </span>
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
  value2 = undefined,
}) => {
  const rangeClsx = clsx(
    "text-xs",
    varTxtLight(variant),
    direction === "right" ? "text-end" : "text-start"
  );

  return (
    <div className={clsx(className)}>
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
      <div className={clsx(value2 !== undefined && "flex ")}>
        <div id="item" className="flex gap-x-2">
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
          <div
            className={clsx(
              "font-inter text-4xl font-semibold leading-none",
              varTxtBase(variant)
            )}
          >
            {value ?? "--"}
          </div>
        </div>
        {value2 !== undefined && (
          <div id="item2" className="flex gap-x-2">
            <div
              className={clsx(
                "font-inter text-4xl font-semibold leading-none",
                varTxtBase(variant)
              )}
            >
              <span className={clsx(varTxtBase(variant))}>/</span>
              <span>{value2 ?? "--"}</span>
            </div>
            {showRange && (
              <div className="">
                <p className={rangeClsx}>{maxRange2 ?? "--"}</p>
                <p className={rangeClsx}>{minRange2 ?? "--"}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
