import type { FC } from "react";
import { useEffect, useRef } from "react";
// @ts-ignore
import { IndicatorRenderer } from "./engine.js";
import sampleDataGen from "../../utils/sampleData";
const sampleData = sampleDataGen();

export type Config = {
  color: string;
  WINDOW_POINTS: number;
  STEP: number;
  scanBarLength: number;
  INTERVAL: number;
  type: "ecg" | "spo2" | "resp";
};
interface ChartProps {
  config: Config;
}

const Chart: FC<ChartProps> = ({ config }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!parentRef) return;
    const monitorRenderer = new IndicatorRenderer(parentRef.current, config);
    monitorRenderer.render(sampleData.wave[`${config.type}_wave`]);
  }, [parentRef]);

  return <div ref={parentRef} className="relative h-[200px] w-full"></div>;
};

export default Chart;
