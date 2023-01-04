import clsx from "clsx";
import type { FC } from "react";

interface Props {
    id?: string | number;
    isActive: boolean;
    className?: string;
}

export const Mask: FC<Props> = ({ id, isActive, className = "" }) => {
    return (
        <div
            id={`${id}__mask`}
            className={clsx(
                "fixed inset-0 z-40 h-full w-full transition-opacity duration-200 ease-out",
                className,
                isActive ? "opacity-100" : "-z-10 opacity-0"
            )}
        >
            <div className="absolute inset-0 h-full w-full brightness-110 contrast-125 filter backdrop-blur-[1px] backdrop-filter"></div>
            <div className="absolute inset-0 h-full  w-full bg-noise mix-blend-multiply"></div>
            <div className="absolute inset-0 h-full w-full bg-neutral-400/20"></div>
        </div>
    );
};
