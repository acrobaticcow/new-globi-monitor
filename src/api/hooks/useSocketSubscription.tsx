import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import type {
    QueryKey,
    UseQueryOptions,
} from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SocketData } from "../../models/realtime.models";
import { useFetchUser } from "./useFetchUser";

/**
 * This func is not like other custom useQuery Hook,
 * it still use useEffect to connect to socket, so when it get unmount
 * the cleanup func will be call and terminated any socket event listener and clear the cache.
 * ! so do not call this func everywhere to get the cache
 * * only call it once, and if you want to access the cache else where then use useQuery with the correct key and empty queryFn just like below.
 */
type Param = {
    rr: SocketData["ecg_data"]["rr"]["values"];
    hr: SocketData["ecg_data"]["hr"]["values"];
    spo2: SocketData["spo2_data"]["spo2_point"]["values"];
    pr: SocketData["spo2_data"]["pr"]["values"];
    temp: SocketData["temp_data"]["temp"];
    sys: SocketData["nibp_data"]["sys"];
    dia: SocketData["nibp_data"]["dia"];
    map: SocketData["nibp_data"]["map"];
    cuff: SocketData["nibp_data"]["cuff"];
    ecgStatus: SocketData["ecg_data"]["status"]["values"];
    spo2Status: SocketData["spo2_data"]["status"]["values"];
    nibpStatus: SocketData["nibp_data"]["status"];
    tempStatus: SocketData["temp_data"]["status"];
};
type KeyParam = keyof Param;

export const useSocketQuery = (
    patientId: string | undefined,
    options: UseQueryOptions<
        SocketData,
        Error,
        SocketData,
        QueryKey
    > = {}
) => {
    const { data: user } = useFetchUser();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!user) return;
        const topic = patientId;
        const socket = io(
            "https://globicare-monitor-dot-glassy-totality-324307.uc.r.appspot.com",
            {
                extraHeaders: {
                    Authorization: `Bearer ${user.user_api_key}`,
                },
            }
        );
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("error", onError);
        socket.on("join-status", onJoinStatus);
        socket.on("new-records", onNewRecords);
        socket.emit("join", {
            // token: user.user_api_key,
            topic,
        });
        function onDisconnect(reason: Socket.DisconnectReason) {
            console.log("disconnect reason", reason);
            if (reason === "io server disconnect" && socket) {
                // the disconnection was initiated by the server, you need to reconnect manually
                socket.connect();
            }
        }
        function onError(error: any) {
            console.log(error);
        }
        function onConnect() {
            console.log("connected");
        }
        function onJoinStatus(status: string) {
            console.log(`join-status: ${status}`);
        }
        function onNewRecords(res: SocketData) {
            // const param: Param = {
            //     dia: res.nibp_data.dia,
            //     sys: res.nibp_data.sys,
            //     cuff: res.nibp_data.cuff,
            //     map: res.nibp_data.map,
            //     hr: res.ecg_data.hr.values,
            //     rr: res.ecg_data.rr.values,
            //     pr: res.spo2_data.pr.values,
            //     spo2: res.spo2_data.spo2_point.values,
            //     temp: res.temp_data.temp,
            //     ecgStatus: res.ecg_data.status.values,
            //     spo2Status: res.spo2_data.status.values,
            //     nibpStatus: res.nibp_data.status,
            //     tempStatus: res.temp_data.status,
            // };
            // let key: KeyParam;
            // for (key in param) {
            //     param[key]
            // }

            if (user)
                queryClient.setQueryData(
                    [user.user_id, patientId, Promise],
                    res
                );
        }
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("error", onError);
            socket.off("join-status", onJoinStatus);
            socket.off("new-records", onNewRecords);
            queryClient.removeQueries([
                user.user_id,
                patientId,
                Promise,
            ]);
        };
    }, [patientId, queryClient, user]);

    return useQuery<SocketData, Error>({
        queryKey: [user?.user_id, patientId, Promise],
        enabled: !!user,
        queryFn: () => new Promise<SocketData>(() => {}),
        staleTime: Infinity,
        cacheTime: 0,
        ...options,
    });
};
