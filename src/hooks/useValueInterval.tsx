import { useState, useEffect, useMemo } from "react";
import { useSocketQuery } from "../api/hooks/useSocketSubscription";
import { SocketData } from "../models/realtime.models";

type ExtractedParam = {
  resp: number[];
  hr: number[];
  sys: number[];
  dia: number[];
  cuff: number[];
  map: number[];
  spo2: number[];
  pr: number[];
  temp: number[];
  spo2St: number[];
  ecgSt: number[];
  tempSt: number[];
  nibpSt: number[];
  warning: string[];
};

type Value = {
  resp: number;
  hr: number;
  sys: number;
  dia: number;
  cuff: number;
  map: number;
  spo2: number;
  pr: number;
  temp: number;
  warning: string;
  spo2St: string;
  ecgSt: string;
  tempSt: string;
  nibpSt: string;
};

const translatorForSpo2 = (status: number) => {
  switch (status) {
    case 0:
      return "";
    case 1:
      return "Chưa gắn cảm biến SPO2";
    case 2:
      return "Chưa kẹp vào ngón tay";
    case 3:
      return "Đang tìm kiếm tín hiệu";
    case 4:
      return "Hết thời gian tìm kiếm tín hiệu";
    default:
      return "--";
  }
};
const translatorForTemp = (status: number) => {
  switch (status) {
    case 0:
      return "";
    case 1:
      return "Chưa gắn cảm biến nhiệt độ";
    default:
      return "--";
  }
};
const translatorForNibp = (status: number) => {
  switch (status) {
    case 0:
      return "";
    case 1:
      return "Trong quá trình kiểm tra";
    case 2:
      return "Đã dừng kiểm tra";
    case 3:
      return "Bảo vệ quá áp";
    case 4:
      return "Vòng bít quá lỏng hoặc chưa gắn";
    case 5:
      return "Hết thời gian kiểm tra";
    case 6:
      return "Đã xảy ra lỗi trong quá trình kiểm tra";
    case 7:
      return "Phát hiện nhiễu trong quá trình kiểm tra";
    case 8:
      return "Kết quả kiểm tra nằm ngoài phạm vi";
    case 9:
      return "Mô-đun đang khởi tạo";
    case 10:
      return "Mô-đun đã khởi tạo";
    default:
      return "--";
  }
};

export const useSocketValueInterval = (patientId: string) => {
  const { data, isLoading, error } = useSocketQuery(patientId);
  const [index, setIndex] = useState(0);

  const currentParam = useMemo(() => {
    if (!data) return;
    const extractedParam = {
      hr: data.param.ecg_param.hr,
      resp: data.param.ecg_param.resp,
      pr: data.param.spo2_param.pr,
      spo2: data.param.spo2_param.spo2,
      cuff: data.param.nibp_param.cuff,
      dia: data.param.nibp_param.dia,
      map: data.param.nibp_param.map,
      sys: data.param.nibp_param.sys,
      temp: data.param.temp_param.temp,
      ecgSt: data.param.ecg_param.st,
      spo2St: data.param.spo2_param.status,
      tempSt: data.param.temp_param.status,
      nibpSt: data.param.nibp_param.status,
      warning: data.warning.warning,
    } as ExtractedParam;

    const paramEntries = Object.entries(extractedParam);
    const currentEntry = paramEntries.map(([key, value]) => {
      let currentValue = value[index] as string | number;
      const splittedKey = key.split("St");
      if (splittedKey.length > 1) {
        switch (splittedKey[0]) {
          case "ecg":
            currentValue = translatorForSpo2(Number(value[index]));
            break;
          case "spo2":
            currentValue = translatorForSpo2(Number(value[index]));
            break;
          case "temp":
            currentValue = translatorForTemp(Number(value[index]));
            break;
          case "nibp":
            currentValue = translatorForNibp(Number(value[index]));
            break;
          default:
            break;
        }
      }

      return [key, currentValue ?? value[index - 1]];
    });
    const result = Object.fromEntries(currentEntry) as Value;
    return result;
  }, [data, index]);

  useEffect(() => {
    if (!data) return;
    const elapsed = data.to - data.from;
    const intervalId = setInterval(() => {
      setIndex((prev) => {
        const current = prev + 1;
        if (current > elapsed) {
          clearInterval(intervalId);
          return prev;
        }
        return current;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
      setIndex(0);
    };
  }, [data]);

  return { currentParam, isLoading, error };
};
