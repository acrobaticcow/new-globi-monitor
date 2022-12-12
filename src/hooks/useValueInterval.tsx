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
};

export const useSocketValueInterval = (patientId: string) => {
  const { data, isLoading, error } = useSocketQuery(patientId);
  const [index, setIndex] = useState(0);

  const currentParam = useMemo(() => {
    if (!data) return;
    const extractedParam = {
      cuff: data.param.nibp_param.cuff,
      dia: data.param.nibp_param.dia,
      hr: data.param.ecg_param.hr,
      map: data.param.nibp_param.map,
      pr: data.param.spo2_param.pr,
      resp: data.param.ecg_param.resp,
      spo2: data.param.spo2_param.spo2,
      sys: data.param.nibp_param.sys,
      temp: data.param.temp_param.temp,
      warning: data.warning.warning,
    } as ExtractedParam;
    const paramEntries = Object.entries(extractedParam);
    const currentEntry = paramEntries.map(([key, value]) => [
      key,
      value[index],
    ]);
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
          return 0;
        }
        return current;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [data]);

  return { currentParam, isLoading, error };
};
