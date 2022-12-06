import type { SexType } from "@faker-js/faker";
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
export type Range = {
  alert: boolean;
  min: number;
  max: number;
};
export type UsernFollowerDetail = {
  user_id: string;
  user_phone: string;
  user_name: string;
  is_disabled: boolean;
  fcm_token: string;
  created_at: number;
  updated_at: number;
  password: string;
  roles: Array<"user" | "admin" | "physician">;
  is_logged_in: boolean;
  last_logged_status_at: number;
  wrong_password_count: number;
  last_password_attempt_at: number;
  image: string;
  updated_by: string;
  created_by: string;
  source: string;
  logo: string;
};

// const obj: FollowersDataFaker = {
//   user_detail: {
//     stest: ["admin", "physician"]
//   }
// }

export interface FollowersData {
  code: number;
  data: {
    request_type: string;
    user_detail: UsernFollowerDetail;
    patient_detail: {
      user_id: string;
      patient_id: string;
      patient_name: string;
      health_insurance_code: string;
      created_at: number;
      updated_at: number;
      is_disabled: boolean;
      dob: string;
      gender: SexType;
      code: string;
      address: string;
      temp_range: Range;
      hr_range: Range;
      nibp_range: {
        low_pressure: Range;
        high_pressure: Range;
      };
      spo2_range: Range;
      pr_range: Range;
      resp_range: Range;
      alarm_interval: number;
      auto_save: number;
      ethnic: string;
      religion: string;
      relation_with_me: string;
      occupation: string;
      nationality: string;
      phone: number;
      is_default: boolean;
      image: string;
      device_mode: "Baby" | "Children" | "Adult";
      device_mode_value: number;
      followers: [
        {
          id: string;
          is_accepted: boolean;
          created_at: number;
          updated_at: number;
          user_id: string;
          shared_infos: any[];
          request_type: string;
        }
      ];
      updated_by: string;
      partner: string;
      patient_partner_id: string;
      allergies: string;
      pregnancy_status: boolean;
      special_needs: string;
      patient_state: string;
      patient_age: number;
      patient_weight: number;
      patient_height: number;
      last_record_created_at: number;
    };
    follower_detail: UsernFollowerDetail;
    follow_request: {
      id: string;
      is_accepted: boolean;
      created_at: number;
      updated_at: number;
      user_id: string;
      shared_infos: [];
      request_type: "SHARE_REQUEST";
    };
  }[];
}
