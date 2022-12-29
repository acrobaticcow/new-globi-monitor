import clsx from "clsx";
import type { FC } from "react";
import { createPortal } from "react-dom";
interface SideBarDrawerProps {
    className?: string;
    children: any;
    activeId: string;
    id: string;
}
const drawerPlaceholder = document.querySelector(
    "#aboveRoot--placeholder"
);

const SideBarDrawer: FC<SideBarDrawerProps> = ({
    children,
    activeId,
    className,
    id,
}) => {
    const isActive = activeId === id;
    return drawerPlaceholder ? (
        createPortal(
            <>
                <div
                    className={clsx(
                        "fixed inset-0 z-40 h-full w-full transform transition-opacity duration-200 ease-out",
                        isActive ? "opacity-100" : "opacity-0"
                    )}
                >
                    <div className="noise absolute inset-0  h-full w-full backdrop-blur-[1px]"></div>
                    <div className="absolute inset-0  h-full w-full bg-neutral-500/40 mix-blend-multiply"></div>
                </div>
                <div
                    className={clsx(
                        "fixed inset-y-0 -left-0 z-50 h-full w-80 transform rounded-r-md shadow-neutral-400 transition-all duration-200 ease-in-out shadow-lg",
                        className,
                        isActive
                            ? "block translate-x-14 opacity-100"
                            : "-translate-x-full opacity-0"
                    )}
                >
                    {children}
                </div>
            </>,
            drawerPlaceholder
        )
    ) : (
        <div>error: drawer place holder not found</div>
    );
};

export default SideBarDrawer;
