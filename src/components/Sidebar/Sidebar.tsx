import type { FC, MouseEvent } from "react";
import { useMemo, useState } from "react";
import { uuid } from "../../utils/function";
import {
  ChatIcon,
  ContactIcon,
  SearchIcon,
  SearchIconMini,
  SettingIcon,
} from "../Icons";
import type { SidebarFollowersItemProps } from "./SidebarFollowersItem";
import SidebarFollowersList from "./SidebarFollowersList";
import SidebarTrigger from "./SidebarTrigger";

interface SideBarProps {}
const SideBar: FC<SideBarProps> = () => {
  const [activeId, setActiveId] = useState("");
  const [, setActiveItem] = useState("");
  const handleClick = (e: MouseEvent) => {
    const id = e.currentTarget.id;
    if (activeId === id) {
      setActiveId("");
      return;
    }
    setActiveId(id);
  };
  const onChange = (id: string) => {
    setActiveItem(id);
  };
  return (
    <nav className="fixed top-0 left-0 z-20 flex  h-screen max-h-screen w-14 flex-col border-r border-neutral-300 bg-neutral-500 pb-4 shadow-lg shadow-neutral-400">
      <div className="mx-2 border-b border-neutral-300 py-8">
        <img
          className="aspect-square w-full rounded-full bg-neutral-100 object-cover object-center ring-1 ring-neutral-200"
          src="/img/1.globi-logo.png"
          alt="unsplash"
        />
      </div>
      <div className="mt-7 flex h-full flex-col items-center justify-between">
        <div id="main-btn" className="flex flex-col gap-y-4">
          <SidebarTrigger
            handleClick={handleClick}
            activeId={activeId}
            id="sidebar--btn__chat"
            Icon={<ChatIcon className="sidebar--icon" />}
          >
            <div className="flex w-full justify-center p-2">
              <img
                className="aspect-square w-8 rounded-full bg-neutral-100 object-cover object-center ring-1 ring-neutral-200"
                src="/img/1.globi-logo.png"
                alt=""
              />
              <div>Nguyễn Vũ Anh</div>
            </div>
          </SidebarTrigger>
          <SidebarTrigger
            handleClick={handleClick}
            activeId={activeId}
            id="sidebar--btn__contact"
            Icon={<ContactIcon className="sidebar--icon" />}
          >
            <div
              id="search"
              className="group relative mx-3 mb-6 flex items-center gap-x-2 rounded-3xl border border-neutral-300 bg-neutral-500 py-2 px-3"
            >
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="peer z-10 w-full border-0 bg-transparent p-0 text-sm outline-none ring-0 focus:border-transparent focus:outline-transparent focus:ring-transparent"
              />
              <SearchIconMini className="order-first h-5 w-5 transform text-neutral-200 transition-colors duration-75 ease-in group-hover:text-neutral-100 peer-focus:text-neutral-100" />
              <div className="absolute inset-0 z-0 h-full w-full rounded-3xl ring-neutral-200 peer-focus:ring peer-focus:ring-slate-600"></div>
            </div>
            <SidebarFollowersList onChange={onChange} />
          </SidebarTrigger>
        </div>
        <div id="support-btn" className="">
          <SidebarTrigger
            handleClick={handleClick}
            activeId={activeId}
            id="sidebar--btn__setting"
            Icon={<SettingIcon className="sidebar--icon" />}
          >
            <div>setting</div>
          </SidebarTrigger>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
