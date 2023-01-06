import type { FC } from "react";
import SidebarFollowersItem from "./SidebarFollowersItem";
import { useFetchFollowers } from "../../api/hooks/useFetchPatients";
import clsx from "clsx";
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
    return (
        <ul className={clsx("space-y-1", className)}>
            {data?.data.map(({ user_name, user_id, image, dob }) => {
                return (
                    <SidebarFollowersItem
                        key={user_id}
                        dob={dob}
                        name={user_name}
                        id={user_id}
                        img={image}
                        status={undefined}
                    />
                );
            }) ?? "error"}
        </ul>
    );
};

export default SidebarFollowersList;
