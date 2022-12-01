import { useCallback, useState } from "react";
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
  const slideRight = useCallback(
    (id: string) => {
      if (id === activeId) {
        return "translate-x-14 block";
      } else {
        return " -translate-x-full";
      }
    },
    [activeId]
  );
  return (
    <nav className="fixed flex flex-col h-screen z-20 pt-10 pb-4 top-0 max-h-screen left-0 w-14 bg-neutral-500 border-r shadow-lg shadow-neutral-400 border-neutral-300">
      <div className="mx-2 pb-14 border-b border-neutral-300">
        <img
          className="w-full ring-1 ring-neutral-200 bg-neutral-100 aspect-square object-cover object-center rounded-full"
          src="/img/1.globi-logo.png"
          alt="unsplash"
        />
      </div>
      <div className="flex mt-7 flex-col h-full items-center justify-between">
        <div id="main-btn" className="flex flex-col gap-y-4">
          <SideBarItem
            handleClick={handleClick}
            activeId={activeId}
            id="sidebar--btn__chat"
            Icon={<ChatIcon className="sidebar--icon" />}
          >
            <div>chat</div>
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
