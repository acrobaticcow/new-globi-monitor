import type { FC, MouseEvent } from "react";
import { useState } from "react";
import { ChatIcon, ContactIcon, SearchIconMini, SettingIcon } from "../Icons";
import SidebarFollowersList from "./SidebarFollowersList";
import SidebarTrigger from "./SidebarTrigger";

interface SideBarProps {
  onChange?: (id: string) => void;
}
const SideBar: FC<SideBarProps> = ({ onChange }) => {
  const [activeId, setActiveId] = useState("");
  const handleClick = (e: MouseEvent) => {
    const id = e.currentTarget.id;
    if (activeId === id) {
      setActiveId("");
      return;
    }
    setActiveId(id);
  };
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-screen max-h-screen w-14 flex-col border-r border-neutral-300 bg-neutral-500 pb-4 shadow-lg shadow-neutral-400">
      <div className="mx-2 py-2">
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
              className="group relative mx-3 mb-6 flex items-center gap-x-2 rounded-3xl border-2 border-gray-600 bg-neutral-500 py-2 px-3"
            >
              <input
                placeholder="Tìm kiếm ..."
                type="text"
                className="peer z-10 w-full border-0 bg-transparent p-0 text-sm outline-none ring-0 focus:border-transparent focus:outline-transparent focus:ring-transparent"
              />
              <SearchIconMini className="order-first h-5 w-5 transform text-neutral-200 transition-colors duration-75 ease-in group-hover:text-neutral-100 peer-focus:text-neutral-100" />
              <div className="absolute inset-0 z-0 h-full w-full rounded-3xl ring-neutral-200 peer-focus:ring peer-focus:ring-slate-600"></div>
            </div>
            <SidebarFollowersList
              className="h-full overflow-y-auto border-t-2 border-gray-700 py-4 shadow-inner shadow-gray-900"
              onChange={onChange}
            />
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
