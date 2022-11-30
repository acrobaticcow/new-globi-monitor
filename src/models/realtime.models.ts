import type { sampleFollowers_Data } from "../utils/sampleData";

export interface DataMonitoring {
  token: string | null;
  topic: string | null;
  data: {
    patient_id: string | null;
    from: number;
    to: number;
    wave: {
      ecg_wave: Array<number>;
      spo2_wave: Array<number>;
      resp_wave: Array<number>;
    };
    param: {
      ecg_param: {
        time: Array<number>;
        signal: Array<any>;
        lead: Array<any>;
        gain: Array<any>;
        filter: Array<any>;
        resp: Array<any>;
        hr: Array<any>;
        st: Array<any>;
        // status: Array<any>;
        warning: Array<any>;
      };
      nibp_param: {
        time: Array<number>;
        patient_mode: Array<any>;
        test_result: Array<any>;
        status: Array<any>;
        cuff: Array<number>;
        sys: Array<number>;
        map: Array<number>;
        dia: Array<number>;
        warning: Array<any>;
      };
      spo2_param: {
        time: Array<number>;
        status: Array<number>;
        spo2: Array<number>;
        pr: Array<number>;
        warning: Array<any>;
      };
      temp_param: {
        time: Array<number>;
        status: Array<any>;
        temp: Array<number>;
        warning: Array<any>;
      };
      ecg_peak: {
        time: Array<number>;
        peak: Array<any>;
      };
      spo2_peak: {
        time: Array<number>;
        peak: Array<any>;
      };
    };
    device: {
      bluetooth: {
        time: Array<number>;
        name: Array<string>;
        status: Array<any>;
      };
      battery: {
        time: Array<number>;
        charging: Array<any>;
        level: Array<any>;
      };
    };
    warning: {
      time: Array<number>;
      warning: Array<any>;
    };
  };
}

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
export type Ecg_param = DataMonitoring["data"]["param"]["ecg_param"];
export type Spo2_param = DataMonitoring["data"]["param"]["spo2_param"];
export type Temp_param = DataMonitoring["data"]["param"]["temp_param"];
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

export interface Followers {
  code: number;
  data: Array<Followers_Data>;
}
