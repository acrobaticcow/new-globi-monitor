import type { sampleFollowers_Data } from "../utils/sampleData";

export interface SocketData {
  patient_id: string;
  from: number;
  to: number;
  wave: {
    ecg_wave: Array<number>;
    spo2_wave: Array<number>;
    resp_wave: Array<number>;
  };
  param: {
    ecg_param: {
      signal: Array<number>;
      lead: Array<number>;
      gain: Array<number>;
      filter: Array<number>;
      resp: Array<number>;
      hr: Array<number>;
      st: Array<number>;
    };
    nibp_param: {
      patient_mode: Array<number>;
      test_result: Array<number>;
      status: Array<number>;
      cuff: Array<number>;
      sys: Array<number>;
      map: Array<number>;
      dia: Array<number>;
    };
    spo2_param: {
      status: Array<number>;
      spo2: Array<number>;
      pr: Array<number>;
    };
    temp_param: {
      status: Array<number>;
      temp: Array<number>;
    };
    ecg_peak: {
      time: Array<number>;
      peak: Array<number>;
    };
    spo2_peak: {
      time: Array<number>;
      peak: Array<number>;
    };
  };
  device: {
    bluetooth: {
      name: Array<string>;
      status: Array<number>;
    };
    battery: {
      charging: Array<number>;
      level: Array<number>;
    };
  };
  warning: {
    warning: Array<string>;
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
