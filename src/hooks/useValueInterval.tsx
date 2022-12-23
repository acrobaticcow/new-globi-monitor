import { useState, useEffect, useMemo } from "react";
import { useSocketQuery } from "../api/hooks/useSocketSubscription";

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
  nibpMode: number[];
};

export type CurrentParam = {
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
  spo2St: number;
  ecgSt: number;
  tempSt: number;
  nibpSt: number;
  nibpMode: number;
};

export const useSocketValueInterval = (patientId: string) => {
  const { data, isLoading, error } = useSocketQuery(patientId);

  const [index, setIndex] = useState(0);

  const paramEntries = useMemo(() => {
    if (!data) return;
    /**
     * Hàm này sẽ format package, sẽ thống nhất sẽ hiển thị với interval mà data được gửi trong 5s môt. Nên
     */
    const extractedParam = {
      hr: data.param.ecg_param.hr,
      resp: data.param.ecg_param.resp,
      pr: data.param.spo2_param.pr,
      spo2: data.param.spo2_param.spo2,
      cuff: data.param.nibp_param.cuff,
      dia: data.param.nibp_param.dia,
      map: data.param.nibp_param.map.filter(
        (_, index) => index === 0 || index % 2 === 0
      ),
      sys: data.param.nibp_param.sys,
      temp: data.param.temp_param.temp
        .filter((_, i) => [9, 19, 29, 39, 49].includes(i))
        .map((value) => Number(value.toFixed(1))),
      ecgSt: data.param.ecg_param.status,
      spo2St: data.param.spo2_param.status,
      tempSt: data.param.temp_param.status.filter((_, i) =>
        [9, 19, 29, 39, 49].includes(i)
      ),
      nibpSt: data.param.nibp_param.status.filter(
        (_, index) => index === 0 || index % 2 === 0
      ),
      warning: data.warning.warning,
      nibpMode: data.param.nibp_param.patient_mode,
    } as ExtractedParam;

    const paramEntries = Object.entries(extractedParam);
    return paramEntries;
  }, [data]);

  const currentParam = useMemo(() => {
    if (!paramEntries) return;
    const currentEntry = paramEntries.map(([key, value]) => {
      let currentValue = value[index] as string | number;
      return [key, currentValue ?? value[index - 1]];
    });
    const result = Object.fromEntries(currentEntry) as CurrentParam;
    return result;
  }, [index, paramEntries]);

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
      // setIndex(0);
    };
  }, [data]);

  return { currentParam, isLoading, error };
};
