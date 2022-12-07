import type { FC, MouseEvent } from "react";
import { uuid } from "../../utils/function";
import type { SidebarFollowersItemProps } from "./SidebarFollowersItem";
import SidebarFollowersItem from "./SidebarFollowersItem";
import { useFollowersList } from "../../api/FollowersDataProvider";
interface UserInfoSideBarListProps {
  onChange?: (id: string) => void;
  className?: string;
}

const SidebarFollowersList: FC<UserInfoSideBarListProps> = ({
  onChange,
  className,
}) => {
  const { data, isLoading, error } = useFollowersList();
  const item: SidebarFollowersItemProps[] | undefined = data?.data.map(
    ({ patient_detail: { dob, patient_id, patient_name, image } }) => ({
      id: patient_id,
      name: patient_name,
      dob,
      img: image,
    })
  );
  const handleClick = (e: MouseEvent) => {
    onChange && onChange(e.currentTarget.id);
  };
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;
  return (
    <ul className={className}>
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
