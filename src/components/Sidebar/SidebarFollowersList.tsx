import { FC, MouseEvent } from "react";
import { useState, useEffect } from "react";
import { uuid } from "../../utils/function";
import type { SidebarFollowersItemProps } from "./SidebarFollowersItem";
import SidebarFollowersItem from "./SidebarFollowersItem";
import { useFollowersList } from "../../api/FollowersDataProvider";
import { Followers } from "../../models/realtime.models";
interface UserInfoSideBarListProps {
  onChange?: (id: string) => void;
}

const SidebarFollowersList: FC<UserInfoSideBarListProps> = ({ onChange }) => {
  const { data, isLoading, error } = useFollowersList();
  const [item, setItem] = useState<SidebarFollowersItemProps[]>();
  useEffect(() => {
    if (isLoading || !data) return;
    const requiredData: SidebarFollowersItemProps[] = data.data.map(
      ({ patient_detail: { dob, patient_id, patient_name, image } }) => ({
        id: patient_id,
        name: patient_name,
        dob,
        img: image,
      })
    );
    setItem(requiredData);
  }, [isLoading]);
  const handleClick = (e: MouseEvent) => {
    onChange && onChange(e.currentTarget.id);
  };
  if (isLoading) return <div>Loading</div>;
  return (
    <ul>
      {item?.map((prop) => {
        return (
          <SidebarFollowersItem
            key={uuid()}
            {...prop}
            handleClick={handleClick}
          />
        );
      }) ?? "error"}
    </ul>
  );
};

export default SidebarFollowersList;
