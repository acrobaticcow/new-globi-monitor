import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { useEffect, useRef, useCallback } from "react";
import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { SocketData } from "../../models/realtime.models";
import { useFetchUser } from "./useFetchUser";

export const useSocketQuery = (
  patientId: string,
  options: UseQueryOptions<SocketData, Error, SocketData, QueryKey> = {}
) => {
  const { data: user } = useFetchUser();
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  const turnOff = useCallback(() => {
    const socket = socketRef.current;
    if (!socket || !user) return;
    console.log(socket);
    socket.off("connect");
    socket.off("disconnect");
    socket.off("join-status");
    socket.off("new-records");
    queryClient.removeQueries([user.user_id, patientId, Promise]);
  }, [queryClient, user, patientId, socketRef]);

  useEffect(() => {
    const socket =
      socketRef.current ??
      (socketRef.current = io(
        "https://glassy-totality-324307.uc.r.appspot.com/"
      ));
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
    socket.on("new-records", onNewRecords);
    socket.emit("join", {
      token: user.user_api_key,
      topic,
    });
    // return () => { socket.off("connect"); socket.off("disconnect");
    //   socket.off("join-status");
    //   socket.off("new-records");
    //   queryClient.removeQueries([user.user_id, patientId, Promise]);
    // };
  }, [queryClient, user, patientId, socketRef]);
  return {
    ...useQuery<SocketData, Error>({
      queryKey: [user?.user_id, patientId, Promise],
      enabled: !!user,
      queryFn: () =>
        new Promise<SocketData>(() => {
          const socket = (socketRef.current = io(
            "https://glassy-totality-324307.uc.r.appspot.com/"
          ));
          console.log(socket);
          socket.on("error", () => {
            throw new Error("lỗi kết nỗi socket");
          });
        }),
      staleTime: Infinity,
      keepPreviousData: true,
      ...options,
    }),
    turnOffSocket: turnOff,
  };
};
