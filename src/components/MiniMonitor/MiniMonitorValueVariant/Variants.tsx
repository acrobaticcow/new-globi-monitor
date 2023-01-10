import type { FC } from "react";
import { useCustomizeValueInterval } from "../../../hooks/useCustomizeValueInteral";
import { SocketData } from "../../../models/realtime.models";
import MiniMonitorValue from "./MiniMonitorValue";

type BaseProps = {
    isLoading: boolean;
    duration: number | undefined;
};

export type MiniNibpParam = {
    sys: SocketData["nibp_data"]["sys"];
    dia: SocketData["nibp_data"]["dia"];
};
interface NibpProps extends BaseProps {
    param: MiniNibpParam | undefined;
}
export const Nibp: FC<NibpProps> = ({
    duration,
    isLoading,
    param,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );

    return (
        <MiniMonitorValue
            isLoading={isLoading}
            name="sys / dia"
            unit="mmHg"
            value={currentData?.sys[index]}
            value2={currentData?.dia[index] ?? null}
            type="nibp"
            className="col-span-2"
        />
    );
};

export type MiniSpo2Param = {
    spo2: SocketData["spo2_data"]["spo2_point"]["values"];
    pr: SocketData["spo2_data"]["pr"]["values"];
};
interface Spo2Props extends BaseProps {
    param: MiniSpo2Param | undefined;
}
export const Spo2: FC<Spo2Props> = ({
    duration = 5000,
    param,
    isLoading,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );

    return (
        <>
            <MiniMonitorValue
                isLoading={isLoading}
                name="resp"
                unit="brpm"
                value={currentData?.spo2[index]}
                type="spo2"
            />
            <MiniMonitorValue
                isLoading={isLoading}
                name="hr"
                unit="bpm"
                value={currentData?.pr[index]}
                type="spo2"
            />
        </>
    );
};

export type MiniTempParam = {
    temp: SocketData["temp_data"]["temp"];
};
interface TempProps extends BaseProps {
    param: MiniTempParam | undefined;
}
export const Temp: FC<TempProps> = ({
    duration = 5000,
    param,
    isLoading,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );

    return (
        <MiniMonitorValue
            isLoading={isLoading}
            name="resp"
            unit="brpm"
            value={
                currentData?.temp
                    ? currentData?.temp[index]
                    : undefined
            }
            type="temp"
        />
    );
};

export type MiniEcgParam = {
    rr: SocketData["ecg_data"]["rr"]["values"];
    hr: SocketData["ecg_data"]["hr"]["values"];
};
interface EcgProps extends BaseProps {
    param: MiniEcgParam | undefined;
}
export const Ecg: FC<EcgProps> = ({
    duration = 5000,
    param,
    isLoading,
}) => {
    const { currentData, index } = useCustomizeValueInterval(
        param,
        duration
    );

    return (
        <>
            <MiniMonitorValue
                isLoading={isLoading}
                name="resp"
                unit="brpm"
                value={currentData?.rr[index]}
                type="ecg"
            />
            <MiniMonitorValue
                isLoading={isLoading}
                name="hr"
                unit="bpm"
                value={currentData?.hr[index]}
                type="ecg"
            />
        </>
    );
};
