import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { Followers } from "../../models/followers.models";
import { fetchFollowers } from "../patientList.api";

export const useFetchFollowers = (
  options?: UseQueryOptions<Followers, any, Followers>
) =>
  useQuery({
    queryKey: ["followers"],
    queryFn: fetchFollowers,
    staleTime: 1000 * 60 * 5,
    ...options,
  });

export const useSelectFollowers = (ids: string[]) =>
  useQuery({
    queryKey: ["followers"],
    queryFn: fetchFollowers,
    select: (data) => {
      const something = data.data.filter(({ patient_detail: { patient_id } }) =>
        ids.find((id) => patient_id === id)
      );
      return something;
    },
  });
