import { FC, useEffect, useRef, useState } from "react";
// @ts-ignore
import { draw, init, indicators_data } from "./engine2";
import { SocketData } from "../../models/realtime.models";

export type ConfigType = {
    color: string;
    WINDOW_POINTS: number;
    minVal?: number;
    maxVal?: number;
    STEP?: number;
    scanBarLength: number;
    INTERVAL?: number;
    type: "ecg" | "spo2" | "resp";
    duration: number;
    soundPlayer?: () => void;
};
interface ChartProps {
    data: SocketData | undefined;
}
// const soundPlayer = new BeepWrapper();

const Chart: FC<ChartProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isFirstData, setIsFirstData] = useState(false);

    // init
    useEffect(() => {
        if (canvasRef.current) {
            init(canvasRef.current, 3, 1);
        }
        return () => {};
    }, []);
    // push new data whenever available
    useEffect(() => {
        if (data) {
            let index = 0;
            for (const key in indicators_data) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        indicators_data,
                        key
                    )
                ) {
                    //@ts-ignore
                    const element: number[] = indicators_data[key];
                    switch (index) {
                        case 0:
                            element.push(...data.wave.ecg_wave);
                            break;
                        case 1:
                            element.push(...data.wave.resp_wave);
                            break;
                        case 2:
                            element.push(...data.wave.spo2_wave);
                            break;
                        default:
                            console.log("can not find dataPool");
                    }
                    index++;
                }
                setIsFirstData((prev) => (!prev ? true : prev));
            }
        }

        return () => {
            for (const key in indicators_data) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        indicators_data,
                        key
                    )
                ) {
                    //@ts-ignore
                    const element: number[] = indicators_data[key];
                    element.splice(0, element.length);
                }
            }
        };
    }, [data]);

    useEffect(() => {
        if (isFirstData) {
            draw();
        }
    }, [isFirstData]);

    return (
        <div
            id="container"
            ref={containerRef}
            className="relative m-auto h-[476px] w-[540px] overflow-auto"
        >
            <canvas
                ref={canvasRef}
                id="canvas"
                width={540}
                height={476}
                className=""
            ></canvas>
            <div
                id="overlay"
                className="absolute inset-0 z-10 bg-transparent"
            ></div>
        </div>
    );
};

export default Chart;
