import type { sampleFollowers_Data } from "../utils/sampleData";

type Wave = {
    frequency: number;
    values: number[];
};
export type SocketData = {
    user_id: string;
    from_ts: number;
    to_ts: number;
    study_id: string;
    ecg_data: {
        rr_wave: Wave;
        ecg_wave: {
            frequency: number;
            Lead_I: number[];
        };
        signal: Wave;
        status: Wave;
        gain: Wave;
        filter: Wave;
        hr: Wave;
        rr: Wave;
        st: Wave;
        peak: number[];
        /**
         * 0: Lead3 mode, sampling Lead I
         * 1: Lead3 mode, sampling Lead II (measure RA-LL，driving by LA)
         * 3: Lead5 mode, default settings during module power on
         */
        mode: 0 | 1 | 3;
        /**
         * 0: ANALYSIS
         * 1: NORMAL
         * 2: ASYSTOLE
         * 3: VFIB/VTAC
         * 4: R ON T
         * 5: MULTI PVCS
         * 6: COUPLE PVCS
         * 7: PVC
         * 8: BIGERMINY
         * 9: TRIGERMINY
         * 10:  TACHYCARDIA
         * 11:  BRADYCARDIA
         * 12:  MISSED BEATS
         */
        arr: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    };
    spo2_data: {
        spo2_wave: Wave;
        spo2_point: Wave;
        pr: Wave;
        status: Wave;
    };
    temp_data: {
        frequency: number;
        status: number[];
        temp: number[];
    };
    nibp_data: {
        time: number[];
        frequency: number[];
        patient_mode: number;
        status: number[];
        cuff: number[];
        sys: number[];
        map: number[];
        dia: number[];
    };
    device_data: {
        device_info: {
            id: string | null;
            serial_number: string | null;
        };
        bluetooth: {
            name: string | null;
            status: number | null;
        };
        battery: {
            frequency: number | null;
            charging: number[];
            level: number[];
        };
    };
    warning: {
        time: number[];
        warning: number[];
    };
};

export type Bluetooth = {
    name: string[];
    status: number[];
    time: number[];
};
export type Battery = {
    charging: number[];
    level: number[];
    time: number[];
};
// export type Ecg_param = DataMonitoring["data"]["param"]["ecg_param"];
// export type Spo2_param = DataMonitoring["data"]["param"]["spo2_param"];
// export type Temp_param = DataMonitoring["data"]["param"]["temp_param"];
export interface MonitorData {
    device: {
        battery: Battery;
        bluetooth: Bluetooth;
    };
    from: number;
    to: number;
    param: {};
}
export interface Token {
    code: number;
    user_api_key: string; // aka user token
    user_id: string;
    user_names: string;
    user_roles: string[];
}
export interface socketCntArg {
    user_id: string;
    user_api_key: string;
    patient_id: string;
}

export type Followers_Data = typeof sampleFollowers_Data;

// export interface Followers {
//   code: number;
//   data: Array<Followers_Data>;
// }

// const obj: FollowersDataFaker = {
//   user_detail: {
//     stest: ["admin", "physician"]
//   }
// }
