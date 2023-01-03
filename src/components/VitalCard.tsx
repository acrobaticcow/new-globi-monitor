import { clsx } from "clsx";
import type { FunctionComponent } from "react";
import { cloneChild } from "../utils/function";
import { WarningIcon } from "./Icons";
import {
    varTxtLight,
    varTxtBase,
    Variant,
} from "../utils/textColorClass";
import { generalStTranslator } from "../utils/paramTranslator";
import { HeartIcon } from "./Icons";

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
    value2?: number | null;
    className?: string;
    showRange?: boolean;
}
interface VitalMonitorBlockProps {
    /**
     * type of VitalMonitorContent
     */
    type: Variant;
    status: number | undefined;
    Icon?: any;
    isPing?: boolean;
    childrenProps: VitalContentMonitorProps[];
}

export const VitalMonitorBlock: FunctionComponent<
    VitalMonitorBlockProps
> = ({ type, Icon, isPing, childrenProps, status }) => {
    return (
        <div className="flex flex-col justify-between gap-1 py-2 px-3 first:rounded-t even:rounded even:border even:border-neutral-400 even:bg-neutral-500">
            <div className="flex gap-x-4">
                <div
                    id="main-content"
                    className="flex basis-full justify-between"
                >
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
                <div>
                    {Icon ? (
                        cloneChild({
                            children: Icon,
                            props: {
                                className: `${
                                    Icon?.props.className
                                } ${varTxtBase(type)}`,
                            },
                        })
                    ) : (
                        // to be use as a placeholder, so width can be the same
                        <HeartIcon className="h-5 w-5 fill-transparent text-transparent" />
                    )}
                </div>
            </div>

            <div className="flex items-center">
                <WarningIcon className="inline-block h-5 w-5 stroke-neutral-200" />
                <span
                    className={clsx(
                        "mx-4 text-xs font-semibold will-change-contents",
                        !status &&
                            "h-4 w-2/5 animate-pulse stroke-neutral-100/50"
                    )}
                >
                    {status
                        ? generalStTranslator({ status, type })
                        : ""}
                </span>
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
            {!!title && (
                <h3
                    className={clsx(
                        "mb-1.5 text-start text-sm font-semibold uppercase"
                    )}
                >
                    {title ?? ""}
                    <span
                        className={clsx(
                            "ml-1.5 font-sans text-xs font-normal normal-case not-italic text-neutral-100/60"
                        )}
                    >
                        {sub ?? ""}
                    </span>
                </h3>
            )}
            <div className={clsx(value2 !== undefined && "flex ")}>
                <div
                    id="item"
                    className="flex gap-x-2"
                >
                    {showRange && (
                        <div
                            className={clsx(
                                "mb-1.5 self-end",
                                direction !== "right" && "order-last"
                            )}
                        >
                            <p className={rangeClsx}>
                                {maxRange ?? "--"}
                            </p>
                            <p className={rangeClsx}>
                                {minRange ?? "--"}
                            </p>
                        </div>
                    )}
                    <div
                        className={clsx(
                            "font-inter text-4xl font-semibold leading-none",
                            varTxtBase(variant)
                        )}
                    >
                        {value || "--"}
                    </div>
                </div>
                {value2 !== undefined && (
                    <div
                        id="item2"
                        className="flex gap-x-2"
                    >
                        <div
                            className={clsx(
                                "font-inter text-4xl font-semibold leading-none",
                                varTxtBase(variant)
                            )}
                        >
                            <span
                                className={clsx(varTxtBase(variant))}
                            >
                                /
                            </span>
                            <span>{value2 || "--"}</span>
                        </div>
                        {showRange && (
                            <div className="">
                                <p className={rangeClsx}>
                                    {maxRange2 ?? "--"}
                                </p>
                                <p className={rangeClsx}>
                                    {minRange2 ?? "--"}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
