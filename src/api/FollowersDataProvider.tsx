import { useState, useEffect, createContext, useContext } from "react";
import { FollowersData } from "../models/realtime.models";

type FollowersContext = {
  data: FollowersData | undefined;
  error: string | undefined;
  isLoading: boolean;
};
interface FollowersDataProviderProps {
  children: any;
}

const Context = createContext<FollowersContext>({
  data: undefined,
  error: undefined,
  isLoading: true,
});

export const FollowersDataProvider = ({
  children,
}: FollowersDataProviderProps) => {
  const [data, setData] = useState<FollowersData>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchFollowers = async () => {
      const res = await fetch(
        "https://covi-life-djgdyxgtha-el.a.run.app/followers/request_details?accepted=true&type=FOLLOW_REQUEST'",
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzI4OTM0NjQ3OTQuMzU5LCJpYXQiOjE2NzAzMDE0NTk3OTQuMzcyLCJzdWIiOiI2MzVlMzg5Ni02ZWM2LTExZWQtOTMwNy02ZmZlYWViNGQ3ZTEiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImZjbV90b2tlbiI6ImRIZHp2eW9xUm5XSm1MMDZoLTJGSmY6QVBBOTFiR25aeE8tY00xaFkxcU0zSDF0R0NXYnVETmlKTlhIWGJCN1dvVWpjM2pVNmpnOVh6VTEydmNUazRrVWxESEhYdUV4OTVQSEYzOFBEUkZyTHEtQzR2TWRPNV9YLUhYTjhYUC1ac2hLaXA5VmxNNTRPQmhiMFlQbHZVai1OT1NaUnF0eTdFbWEifQ.T-7KCoWFsH2yNmAf4zTNRlBEEdYfF3bc0eQuntVZTd8",
          },
          signal: abortController.signal,
        }
      );
      if (!res.ok) {
        setError(`Error happen: status ${res.status}`);
        console.log(`Error happen: status ${res.status}`);
        throw new Error(`Error happen: status ${res.status}`);
      }
      const followersData: FollowersData = await res.json();
      setData(followersData);
      setIsLoading(false);
    };
    fetchFollowers();
    return () => abortController.abort();
  }, []);

  return (
    <Context.Provider value={{ data, isLoading, error }}>
      {children}
    </Context.Provider>
  );
};

export const useFollowersList = () => useContext(Context);
