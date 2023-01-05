import clsx from "clsx";
import { useEffect } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import { Mask } from "../Mask";
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
                <Mask
                    id={id}
                    isActive={!!activeId.length}
                />
                <div
                    className={clsx(
                        "fixed inset-y-0 -left-0 z-50 h-full w-80 transform rounded-r-md shadow-neutral-400 transition-all duration-200 ease-out will-change-transform shadow-lg",
                        className,
                        isActive
                            ? "block translate-x-14 opacity-100"
                            : "-translate-x-full opacity-0"
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
