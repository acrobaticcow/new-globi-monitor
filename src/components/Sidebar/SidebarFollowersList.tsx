import type { FC } from "react";
import type { SidebarFollowersItemProps } from "./SidebarFollowersItem";
import SidebarFollowersItem from "./SidebarFollowersItem";
import { useFetchFollowers } from "../../api/hooks/useFetchPatients";
interface UserInfoSideBarListProps {
  onChange?: (id: string) => void;
  className?: string;
}

const SidebarFollowersList: FC<UserInfoSideBarListProps> = ({
  onChange,
  className,
}) => {
  const { data, isLoading, error } = useFetchFollowers();
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;
  const item: SidebarFollowersItemProps[] | undefined = data?.data.map(
    ({ patient_detail: { dob, patient_id, patient_name, image } }) => ({
      id: patient_id,
      name: patient_name,
      dob,
      img: image,
    })
  );
  return (
    <ul className={className}>
      {item?.map((prop) => {
        return <SidebarFollowersItem key={prop.id} {...prop} />;
      }) ?? "error"}
    </ul>
  );
};

export default SidebarFollowersList;
