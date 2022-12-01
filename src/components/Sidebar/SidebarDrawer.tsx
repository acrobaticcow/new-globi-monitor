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
          "w-80 fixed inset-y-0 duration-200 shadow-lg shadow-neutral-400 ease-in-out transform -left-0 h-full",
          className,
          isActive ? "translate-x-14 block" : "-translate-x-full"
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
