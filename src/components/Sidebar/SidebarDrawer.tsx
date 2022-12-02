import clsx from "clsx";
import { FC, useMemo } from "react";
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
  const isActive = useMemo(() => activeId === id, [activeId]);
  return drawerPlaceholder ? (
    createPortal(
      <div
        className={clsx(
          "fixed inset-y-0 -left-0 z-10 h-full w-80 transform shadow-lg shadow-neutral-400 duration-200 ease-in-out",
          className,
          isActive ? "block translate-x-14" : "-translate-x-full"
        )}
      >
        {children}
      </div>,
      drawerPlaceholder
    )
  ) : (
    <></>
  );
};

export default SideBarDrawer;
