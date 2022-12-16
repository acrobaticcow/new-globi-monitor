import type { Socket } from "socket.io-client";
import { useEffect, useCallback, useContext } from "react";
import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { SocketData } from "../../models/realtime.models";
import { useFetchUser } from "./useFetchUser";
import {
  SocketContext,
  SocketContextType,
} from "../../hooks/useSocketProvider";

export const useSocketQuery = (
  patientId: string,
  options: UseQueryOptions<SocketData, Error, SocketData, QueryKey> = {}
) => {
  const { data: user } = useFetchUser();
  const queryClient = useQueryClient();
  const { socket } = useContext(SocketContext) as SocketContextType;

  const onError = (err: any) => {
    console.log(err);
  };
  const onConnect = () => {
    console.log("connected");
  };
  const onDisconnect = useCallback(
    (reason: Socket.DisconnectReason) => {
      console.log("disconnect reason", reason);
      if (reason === "io server disconnect" && socket) {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
    },
    [socket]
  );
  const onJoinStatus = (status: string) => {
    console.log(`join-status: ${status}`);
  };
  const onNewRecords = useCallback(
    (res: SocketData) => {
      if (!user) return;
      queryClient.setQueryData([user.user_id, patientId, Promise], res);
    },
    [patientId, queryClient, user]
  );
  const turnOff = useCallback(() => {
    if (!socket || !user) return;
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off("error", onError);
    socket.off("join-status", onJoinStatus);
    socket.off("new-records", onNewRecords);
    queryClient.removeQueries([user.user_id, patientId, Promise]);
  }, [queryClient, user, patientId, onNewRecords, socket, onDisconnect]);

  useEffect(() => {
    if (!user || !socket) return;
    const topic = [user.user_id, patientId].join(".");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);
    socket.on("join-status", onJoinStatus);
    socket.on("new-records", onNewRecords);
    socket.emit("join", {
      token: user.user_api_key,
      topic,
    });
  }, [queryClient, user, patientId, onNewRecords, socket, onDisconnect]);

  return {
    ...useQuery<SocketData, Error>({
      queryKey: [user?.user_id, patientId, Promise],
      enabled: !!user,
      queryFn: () => new Promise<SocketData>(() => {}),
      staleTime: Infinity,
      ...options,
    }),
    turnOffSocket: turnOff,
  };
};
