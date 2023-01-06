import type { FC } from "react";
import clsx from "clsx";
import { uuid } from "../../utils/function";
import { UserCircle } from "../Icons";
import { useContext } from "react";
import {
    ActiveMonitorsApiContext,
    ActiveMonitorsApiContextType,
    MiniMonitorContext,
    MiniMonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
export interface SidebarFollowersItemProps {
    img?: string | null;
    /**
     * Tên bệnh nhân
     */
    name: string;
    id?: string;
    /**
     * trạng thái onl hay off
     */
    status?: boolean;
    dob: string | null; // date of birth, ngày tháng năm sinh
    /**
     * thay đổi style theo tên class , chỉ có thay đổi wrapper, yêu tiên dùng class của tw để thay đổi style
     */
    className?: string;
    /**
     * không chuyền trực tiếp tham số này vào, muốn bắt sự kiện onChange thì listen ở <SidebarFollowersList/>
     */
    // handleClick?: (e: MouseEvent) => void;
}

const SidebarFollowersItem: FC<SidebarFollowersItemProps> = ({
    img,
    name,
    id = uuid(),
    status,
    dob,
    className,
}) => {
    const { onAddMiniMonitorIds, onDelMiniMonitorId } = useContext(
        ActiveMonitorsApiContext
    ) as ActiveMonitorsApiContextType;
    const { activeMiniMonitorIds } = useContext(
        MiniMonitorContext
    ) as MiniMonitorContextType;
    return (
        <li
            key={id}
            id={id}
            className={clsx(
                "flex w-full cursor-pointer items-center gap-x-4 border-y border-transparent px-3 py-3 ring-transparent transition-colors duration-75 shadow ring-1 hover:bg-neutral-200/10 active:ring-neutral-300",
                activeMiniMonitorIds.includes(id) &&
                    "border-success-500/20 bg-success-500/5 shadow-neutral-400 hover:border-red-300/20 hover:bg-red-300/5",
                className
            )}
            onClick={() => {
                if (activeMiniMonitorIds.includes(id)) {
                    onDelMiniMonitorId(id);
                } else {
                    onAddMiniMonitorIds(id);
                }
            }}
        >
            <div
                id="indicator"
                className="relative"
            >
                {img ? (
                    <img
                        className="aspect-square w-9 rounded-full border border-neutral-200"
                        src={img}
                        alt="name"
                    />
                ) : (
                    <UserCircle className="h-9 w-9 text-neutral-200/75" />
                )}
                <span
                    id="indicator__status"
                    className={clsx(
                        "absolute -bottom-[1px] right-0 aspect-square w-3 rounded-full border-2  border-neutral-400 ",
                        status ? "bg-success" : "bg-slate-300"
                    )}
                ></span>
            </div>
            <div>
                <p className="">{name}</p>
                <p className="text-sm text-slate-400">
                    {dob || "-- / -- / --"}
                </p>
            </div>
            <button></button>
        </li>
    );
};

export default SidebarFollowersItem;
