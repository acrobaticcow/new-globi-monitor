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
            {data?.data.map(
                ({
                    patient_detail: {
                        dob,
                        patient_id,
                        patient_name,
                        image,
                    },
                }) => {
                    return (
                        <SidebarFollowersItem
                            key={patient_id}
                            dob={dob}
                            name={patient_name}
                            id={patient_id}
                            img={image}
                            status={undefined}
                        />
                    );
                }
            ) ?? "error"}
        </ul>
    );
};

export default SidebarFollowersList;
