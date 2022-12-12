import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { fetchAuth } from "../auth.api";
import type { SocketData } from "../../models/realtime.models";
import { useFetchUser } from "./useFetchUser";

export const useSocketSubscription = (patientId: string) => {
  const { data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
  });
  const [data, setData] = useState<SocketData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!user) return;
    const { user_api_key, user_id } = user;
    const topic = `${user_id}.${patientId}`;
    const socket = io("https://glassy-totality-324307.uc.r.appspot.com/");
    const onConnect = () => {
      console.log("connected");
      setIsFetching(false);
    };
    const onDisconnect = (reason: Socket.DisconnectReason) => {
      console.log("disconnect reason", reason);
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      setIsFetching(true);
    };
    const onError = (err: any) => {
      console.log(err);
      setError(err);
      setIsLoading(false);
      setIsFetching(false);
    };
    const onJoinStatus = (status: string) => {
      console.log(`join-status: ${status}`);
    };
    const onNewRecords = (res: SocketData) => {
      setData(res);
      setIsLoading(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);
    socket.on("join-status", onJoinStatus);

    socket.emit("join", {
      token: user_api_key,
      topic,
    });
    socket.on("new-records", onNewRecords);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join-status", onJoinStatus);
      socket.off("new-records", onNewRecords);
    };
  }, [patientId, user]);
  return { data, isLoading, error, isFetching };
};

export const useSocketQuery = (
  patientId: string,
  options: UseQueryOptions<SocketData, Error, SocketData, QueryKey> = {}
) => {
  const { data: user } = useFetchUser();
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = socketRef.current;
    if (!user || !socket) return;
    const topic = [user.user_id, patientId].join(".");
    const onConnect = () => {
      console.log("connected");
    };
    const onDisconnect = (reason: Socket.DisconnectReason) => {
      console.log("disconnect reason", reason);
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
    };
    const onError = (err: any) => {
      console.log(err);
    };
    const onJoinStatus = (status: string) => {
      console.log(`join-status: ${status}`);
    };
    const onNewRecords = (res: SocketData) => {
      queryClient.setQueryData([user.user_id, patientId, Promise], res);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);
    socket.on("join-status", onJoinStatus);

    // console.log("user_id:", user_id);
    socket.emit("join", {
      token: user.user_api_key,
      topic,
    });
    socket.on("new-records", onNewRecords);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join-status", onJoinStatus);
      socket.off("new-records", onNewRecords);
    };
  }, [queryClient, user, patientId, socketRef]);
  return useQuery<SocketData, Error>({
    queryKey: [user?.user_id, patientId, Promise],
    enabled: !!user,
    queryFn: () =>
      new Promise<SocketData>(() => {
        const socket = (socketRef.current = io(
          "https://glassy-totality-324307.uc.r.appspot.com/"
        ));
        socket.on("error", () => {
          throw new Error("lỗi kết nỗi socket");
        });
      }),
    staleTime: Infinity,
    ...options,
  });
};
