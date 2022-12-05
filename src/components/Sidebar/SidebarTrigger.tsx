import { FC, MouseEvent, useEffect } from "react";
import { useState } from "react";
import clsx from "clsx";
import { cloneChild } from "../../utils/function";
import SideBarDrawer from "./SidebarDrawer";

interface SidebarTriggerProps {
  /**
   * class cho button
   */
  btnClassname?: string;
  /**
   * event onclick
   */
  handleClick: (e: MouseEvent) => void;
  children: any;
  /**
   * id của phần tử đang được chọn
   */
  activeId: string;
  id: string;
  /**
   * class khi được active
   */
  activeIconClassname?: string;
  /**
   * class cho drawer, target thẻ wrapper ngoài cùng
   */
  drawerClassname?: string;
  /**
   * jsx icon
   */
  Icon: any;
  /**
   * mỗi khi active item được thay đổi, hàm sẽ được thực thi với tham số là id của active item đấy
   */
  onChange?: (id: string) => void;
}
const SidebarTrigger: FC<SidebarTriggerProps> = ({
  btnClassname,
  handleClick,
  children,
  activeId,
  id,
  drawerClassname = "bg-neutral-400 py-7",
  activeIconClassname = "!stroke-neutral-100",
  Icon,
  onChange,
}) => {
  const isActive = activeId === id;
  const [activeItem, setActiveItem] = useState("");
  const handleItemClick = (e: MouseEvent) => {
    console.log("something");
    setActiveItem(e.currentTarget.id);
  };
  useEffect(() => {
    console.log(activeItem);
    onChange && onChange(activeItem);
  }, [activeItem]);
  return (
    <>
      <button
        className={clsx(
          "rounded-full p-2 transition-colors duration-75 ease-in",
          btnClassname,
          isActive && "bg-neutral-200/40"
        )}
        id={id}
        onClick={handleClick}
      >
        {cloneChild({
          children: Icon,
          props: {
            className: clsx(
              Icon.props.className,
              isActive && activeIconClassname
            ),
          },
        })}
      </button>
      <SideBarDrawer className={drawerClassname} id={id} activeId={activeId}>
        {children}
      </SideBarDrawer>
    </>
  );
};

export default SidebarTrigger;
