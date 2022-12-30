import type { FC, MouseEvent } from "react";
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
    handleSetActiveId: (e: string) => void;
    /**
     * children sẽ được nhét vào trong drawer
     */
    children: any;
    /**
     * id của phần tử đang được chọn */
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
}
const SidebarTrigger: FC<SidebarTriggerProps> = ({
    btnClassname,
    handleSetActiveId,
    children,
    activeId,
    id,
    drawerClassname = "bg-neutral-400 py-7",
    activeIconClassname = "!stroke-neutral-100",
    Icon,
}) => {
    const isActive = activeId === id;
    return (
        <>
            <button
                className={clsx(
                    "rounded-full p-2 transition-colors duration-75 ease-in",
                    btnClassname,
                    isActive && "bg-neutral-200/40"
                )}
                id={id}
                onClick={() => handleSetActiveId(id)}
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
            <SideBarDrawer
                handleSetActiveId={handleSetActiveId}
                className={drawerClassname}
                id={id}
                activeId={activeId}
            >
                {children}
            </SideBarDrawer>
        </>
    );
};

export default SidebarTrigger;
