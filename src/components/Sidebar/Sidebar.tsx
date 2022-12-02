import { useState } from "react";
import type { FC, MouseEvent } from "react";
import { ChatIcon, ContactIcon, SettingIcon } from "../Icons";
import SideBarItem from "./SidebarItem";

interface SideBarProps {}
const SideBar: FC<SideBarProps> = () => {
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
          <SideBarItem
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
          </SideBarItem>
          <SideBarItem
            handleClick={handleClick}
            activeId={activeId}
            id="sidebar--btn__contact"
            Icon={<ContactIcon className="sidebar--icon" />}
          >
            <div>contact</div>
          </SideBarItem>
        </div>
        <div id="support-btn" className="">
          <SideBarItem
            handleClick={handleClick}
            activeId={activeId}
            id="sidebar--btn__setting"
            Icon={<SettingIcon className="sidebar--icon" />}
          >
            <div>setting</div>
          </SideBarItem>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
