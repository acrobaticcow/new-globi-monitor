import { FC, MouseEvent, useMemo } from "react";
import clsx from "clsx";
import { cloneChild } from "../../utils/function";
import SideBarDrawer from "./SidebarDrawer";

interface SideBarItemProps {
  btnClass?: string;
  handleClick: (e: MouseEvent) => void;
  children: any;
  activeId: string;
  id: string;
  activeIconClass?: string;
  drawerClass?: string;
  Icon: any;
}
const SideBarItem: FC<SideBarItemProps> = ({
  btnClass,
  handleClick,
  children,
  activeId,
  id,
  drawerClass = "bg-neutral-200",
  activeIconClass = "!stroke-neutral-100",
  Icon,
}) => {
  const isActive = useMemo(() => activeId === id, [activeId]);
  return (
    <>
      <button
        className={clsx(
          "p-2 rounded-full transition-colors duration-75 ease-in",
          btnClass,
          isActive && "bg-neutral-200/40"
        )}
        id={id}
        onClick={handleClick}
      >
        {cloneChild({
          children: Icon,
          props: {
            className: clsx(Icon.props.className, isActive && activeIconClass),
          },
        })}
      </button>
      <SideBarDrawer className={drawerClass} id={id} activeId={activeId}>
        {children}
      </SideBarDrawer>
    </>
  );
};

export default SideBarItem;
