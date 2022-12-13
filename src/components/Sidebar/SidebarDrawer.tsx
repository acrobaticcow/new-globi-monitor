import clsx from "clsx";
import type { FC } from "react";
import { createPortal } from "react-dom";
interface SideBarDrawerProps {
  className?: string;
  children: any;
  activeId: string;
  id: string;
}
const drawerPlaceholder = document.querySelector("#aboveRoot--placeholder");

const SideBarDrawer: FC<SideBarDrawerProps> = ({
  children,
  activeId,
  className,
  id,
}) => {
  const isActive = activeId === id;
  return drawerPlaceholder ? (
    createPortal(
      <div
        className={clsx(
          "fixed inset-y-0 -left-0 z-40 h-full w-80 transform rounded-r-md shadow-lg shadow-neutral-400 transition-all duration-200 ease-in-out will-change-transform",
          className,
          isActive
            ? "block translate-x-14 opacity-100"
            : "-translate-x-full opacity-0"
        )}
      >
        {children}
      </div>,
      drawerPlaceholder
    )
  ) : (
    <div>error: drawer place holder not found</div>
  );
};

export default SideBarDrawer;
