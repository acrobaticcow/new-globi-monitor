import { FC, MouseEvent } from "react";
import { useState, useEffect } from "react";
import { uuid } from "../../utils/function";
import type { SidebarPatientItemProps } from "./SidebarPatientItem";
import SidebarPatientItem from "./SidebarPatientItem";
interface UserInfoSideBarListProps {
  itemProps: SidebarPatientItemProps[];
  onChange?: (id: string) => void;
}

const SidebarPatientList: FC<UserInfoSideBarListProps> = ({
  itemProps,
  onChange,
}) => {
  const handleClick = (e: MouseEvent) => {
    onChange && onChange(e.currentTarget.id);
  };
  return (
    <ul>
      {itemProps.map((prop) => {
        return (
          <SidebarPatientItem
            key={uuid()}
            {...prop}
            handleClick={handleClick}
          />
        );
      })}
    </ul>
  );
};

export default SidebarPatientList;
