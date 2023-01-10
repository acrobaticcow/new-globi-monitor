import type { FC } from "react";
import { Followers } from "../../../models/followers.models";
import { SocketData } from "../../../models/realtime.models";
import { ArrayElement } from "../../../models/utils.models";
import { VitalMonitorBlock } from "./VitalCard";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { FluentTemperature16Filled, HeartIcon } from "../../Icons";
import { modeIconTranslatorForNibp } from "../../../utils/paramTranslator";

interface BaseProps {
    follower: ArrayElement<Followers["data"]>;
    duration: number | undefined;
}

export type EcgParam = {
    rr: SocketData["ecg_data"]["rr"]["values"];
    hr: SocketData["ecg_data"]["hr"]["values"];
    status: SocketData["ecg_data"]["status"]["values"];
};
interface EcgProps extends BaseProps {
    param: EcgParam | undefined;
}
export const Ecg: FC<EcgProps> = ({
    follower,
    param,
    duration = 5000,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );

    return (
        <VitalMonitorBlock
            Icon={<HeartIcon className=" h-5 w-5 " />}
            type="ecg"
            isPing
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.resp_range.max,
                    minRange: follower.resp_range.min,
                    sub: "bpm",
                    title: "resp",
                    value: currentData?.rr[index],
                },
                {
                    maxRange: follower.hr_range.max,
                    minRange: follower.hr_range.min,
                    sub: "bpm",
                    title: "hr",
                    value: currentData?.hr[index],
                },
            ]}
        />
    );
};

export type NibpParam = {
    sys: SocketData["nibp_data"]["sys"];
    dia: SocketData["nibp_data"]["dia"];
    status: SocketData["nibp_data"]["status"];
    map: SocketData["nibp_data"]["map"];
    cuff: SocketData["nibp_data"]["cuff"];
    mode: SocketData["nibp_data"]["patient_mode"];
};
interface NibpProps extends BaseProps {
    param: NibpParam | undefined;
}
export const Nibp: FC<NibpProps> = ({
    follower,
    param,
    duration = 5000,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );

    return (
        <VitalMonitorBlock
            Icon={
                currentData && modeIconTranslatorForNibp(param?.mode)
            }
            type="nibp"
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.nibp_range.high_pressure.max,
                    minRange: follower.nibp_range.high_pressure.min,
                    maxRange2: follower.nibp_range.low_pressure.max,
                    minRange2: follower.nibp_range.low_pressure.min,
                    value: currentData?.sys[index],
                    value2: currentData?.dia[index] ?? null,
                    sub: "nibp",
                    title: "sys/dia",
                },

                {
                    className: "flex flex-col items-end",
                    maxRange: undefined,
                    minRange: undefined,
                    value:
                        currentData?.status[index] !== 1
                            ? currentData?.map[index]
                            : currentData?.cuff[index],
                    direction: "left",
                    showRange: false,
                    sub: "mmHg",
                    title:
                        currentData?.status[index] !== 1
                            ? "map"
                            : "cuff",
                },
            ]}
        />
    );
};

export type Spo2Param = {
    spo2: SocketData["spo2_data"]["spo2_point"]["values"];
    pr: SocketData["spo2_data"]["pr"]["values"];
    status: SocketData["spo2_data"]["status"]["values"];
};
interface Spo2Props extends BaseProps {
    param: Spo2Param | undefined;
}
export const Spo2: FC<Spo2Props> = ({
    follower,
    param,
    duration = 5000,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );
    console.log(currentData);

    return (
        <VitalMonitorBlock
            Icon={<HeartIcon className="h-5 w-5" />}
            type="spo2"
            isPing
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.spo2_range.max,
                    minRange: follower.spo2_range.min,
                    sub: "%",
                    title: "spo2",
                    value: currentData?.spo2[index],
                },
                {
                    maxRange: follower.pr_range.max,
                    minRange: follower.pr_range.min,
                    sub: "bpm",
                    title: "pr",
                    value: currentData?.pr[index],
                },
            ]}
        />
    );
};
export type TempParam = {
    temps: SocketData["temp_data"]["temp"];
    status: SocketData["temp_data"]["status"];
};
interface TempProps extends BaseProps {
    param: TempParam | undefined;
}
export const Temp: FC<TempProps> = ({
    follower,
    param,
    duration = 5000,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );

    return (
        <VitalMonitorBlock
            Icon={<FluentTemperature16Filled className="h-5 w-5" />}
            type="temp"
            status={currentData?.status[index]}
            childrenProps={[
                {
                    maxRange: follower.temp_range.max,
                    minRange: follower.temp_range.min,
                    value: currentData?.temps[index],
                    sub: "°C",
                    title: "Temp 1",
                },
            ]}
        />
    );
};
