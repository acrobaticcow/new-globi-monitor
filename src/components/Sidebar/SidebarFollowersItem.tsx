import type { FC, MouseEvent } from "react";
import clsx from "clsx";
import { uuid } from "../../utils/function";
import { UserCircle } from "../Icons";
export interface SidebarFollowersItemProps {
  img?: string;
  /**
   * Tên bệnh nhân
   */
  name: string;
  id?: string;
  /**
   * trạng thái onl hay off
   */
  status?: boolean;
  dob: string; // date of birth, ngày tháng năm sinh
  /**
   * thay đổi style theo tên class , chỉ có thay đổi wrapper, yêu tiên dùng class của tw để thay đổi style
   */
  className?: string;
  /**
   * không chuyền trực tiếp tham số này vào, muốn bắt sự kiện onChange thì listen ở <SidebarFollowersList/>
   */
  handleClick?: (e: MouseEvent) => void;
}

const SidebarFollowersItem: FC<SidebarFollowersItemProps> = ({
  img,
  name,
  id = uuid(),
  status,
  dob,
  className,
  handleClick,
}) => {
  return (
    <li
      key={id}
      id={id}
      className={clsx(
        "flex w-full cursor-pointer items-center gap-x-4 px-3 py-3 transition-colors duration-200 ease-in-out hover:bg-neutral-200/20 active:ring-1 active:ring-neutral-200",
        className
      )}
      onClick={handleClick}
    >
      <div id="indicator" className="relative">
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
        <p className="text-sm text-slate-400">{dob}</p>
      </div>
      <button></button>
    </li>
  );
};

export default SidebarFollowersItem;
