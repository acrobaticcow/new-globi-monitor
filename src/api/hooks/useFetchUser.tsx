import { useQuery } from "@tanstack/react-query";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { UserData } from "../../models/auth.models";
import { fetchAuth } from "../auth.api";

export const useFetchUser = (
  options: UseQueryOptions<UserData, Error, UserData, QueryKey> = {}
) =>
  useQuery<UserData, Error>({
    queryKey: ["user"],
    queryFn: fetchAuth,
    staleTime: Infinity,
    ...options,
  });
