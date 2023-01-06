import { QueryKey, useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { Followers } from "../../models/followers.models";
import { fetchFollowers } from "../patientList.api";
import { useFetchUser } from "./useFetchUser";

export const useFetchFollowers = (
    options: UseQueryOptions<
        Followers,
        Error,
        Followers,
        QueryKey
    > = {}
) => {
    const user = useFetchUser();
    return useQuery({
        queryKey: ["followers", user.data?.user_api_key],
        queryFn: () => fetchFollowers(user.data?.user_api_key),
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
        ...options,
    });
};

export const useSelectFollowers = (ids: string[]) => {
    const user = useFetchUser();
    return useQuery({
        queryKey: ["followers", user.data?.user_api_key],
        queryFn: () => fetchFollowers(user.data?.user_api_key),
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
        select: (data) => {
            // const something = data.data.filter(({ patient_detail: { patient_id } }) =>
            //   ids.find((id) => patient_id === id)
            // );
            const copy = [...data.data];
            const selected = ids.map((id) => {
                const index = copy.findIndex(
                    ({ user_id }) => id === user_id
                );
                const current = copy[index];
                copy.splice(index, 1);
                return current;
            });
            return selected;
        },
    });
};
