import clsx from "clsx";
import { useEffect } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
interface SideBarDrawerProps {
    className?: string;
    children: any;
    activeId: string;
    id: string;
    handleSetActiveId: (e: string) => void;
}
const drawerPlaceholder = document.querySelector(
    "#aboveRoot--placeholder"
);

const SideBarDrawer: FC<SideBarDrawerProps> = ({
    children,
    activeId,
    className,
    id,
    handleSetActiveId,
}) => {
    const isActive = activeId === id;
    /**
     * Click vào mask thì đóng drawer
     */
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            const thisComponent = drawerPlaceholder?.querySelector(
                `#${id}`
            );
            const thisMask = thisComponent?.querySelector(
                `#${id}__mask`
            );
            const isThisCompContainTarget =
                thisMask?.contains(target);
            if (!!target && isThisCompContainTarget) {
                handleSetActiveId("");
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleSetActiveId, id]);

    return drawerPlaceholder ? (
        createPortal(
            <div
                id={id}
                key={id}
            >
                <div
                    id={`${id}__mask`}
                    className={clsx(
                        "fixed inset-0 -z-10 h-full  w-full opacity-0 transition-opacity duration-200 ease-out",
                        activeId.length && "!z-40 !opacity-100"
                    )}
                >
                    <div className="absolute inset-0 h-full w-full brightness-110 contrast-125 filter backdrop-blur-[1px] backdrop-filter"></div>
                    <div className="absolute inset-0 h-full  w-full bg-noise mix-blend-multiply"></div>
                    <div className="absolute inset-0 h-full w-full bg-neutral-400/20"></div>
                </div>
                <div
                    className={clsx(
                        "fixed inset-y-0 -left-0 z-50 h-full w-80 -translate-x-full transform rounded-r-md opacity-75 shadow-neutral-400 transition-all duration-200 ease-in-out will-change-transform shadow-lg",
                        className,
                        isActive &&
                            "!translate-x-14 !opacity-100 !ease-in"
                    )}
                >
                    {children}
                </div>
            </div>,
            drawerPlaceholder
        )
    ) : (
        <div>error: drawer place holder not found</div>
    );
};

export default SideBarDrawer;
