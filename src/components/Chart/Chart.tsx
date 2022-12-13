import type { FC } from "react";
import { useEffect, useState, useRef, useCallback } from "react";
// @ts-ignore
import {
  LayoutUtil,
  BeepWrapper,
  IndicatorRenderer,
  ZoomHandler,
} from "./engine.js";
import { SocketData } from "../../models/realtime.models.js";
import { ExitFullScreenMiniIcon, FullScreenMiniIcon } from "../Icons.js";

export type ConfigType = {
  color: string;
  WINDOW_POINTS: number;
  // STEP: number;
  scanBarLength: number;
  INTERVAL: number;
  type: "ecg" | "spo2" | "resp";
  soundPlayer?: () => void;
};
interface ChartProps {
  data: SocketData | undefined;
  config: ConfigType;
}
const soundPlayer = new BeepWrapper();
const visualContext = {
  ecg: {
    color: "00FF00",
    WINDOW_POINTS: 250,
    scanBarLength: 40,
    INTERVAL: 15,
    soundPlayer: soundPlayer,
  },
  spo2: {
    color: "FFFF00",
    WINDOW_POINTS: 50,
    scanBarLength: 40,
    INTERVAL: 150,
    soundPlayer: soundPlayer,
  },
  resp: {
    color: "00FFFF",
    WINDOW_POINTS: 50,
    scanBarLength: 40,
    INTERVAL: 100,
    soundPlayer: soundPlayer,
  },
  ecg_sound: {
    color: "00FF00",
    WINDOW_POINTS: 250,
    scanBarLength: 40,
    INTERVAL: 15,
    soundPlayer: soundPlayer,
  },
};

const Chart: FC<ChartProps> = ({ data, config }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<any>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const zoomHandlerRef = useRef<any>(null);
  // const [isShowZoomModal, setIsShowZoomModal] = useState(false);

  // init
  useEffect(() => {
    const parent = parentRef.current;
    const modal = modalContentRef.current;
    const chartWrapper = chartWrapperRef.current;
    const chart = chartRef.current;
    if (!parent || !modal || !chartWrapper || !chart) return;
    LayoutUtil.enableDrag(modalContentRef.current);
    const render = (renderRef.current = new IndicatorRenderer(chart, config));

    const zoom = (
      data: SocketData["wave"],
      numPoints: number,
      minVal: number,
      maxVal: number,
      startIdx: number,
      endIdx: number
    ) => {
      console.log("anything");
      // tìm zôm handler,
      const modal = modalContentRef.current;
      if (!modal) return;
      modal.style.display = "block";
      // setIsShowZoomModal(true);
      const zoomHandler = (zoomHandlerRef.current = new ZoomHandler(
        modal,
        data
      ));
      zoomHandler.numPoints = numPoints;
      zoomHandler.minVal = minVal;
      zoomHandler.maxVal = maxVal;
      zoomHandler.startIdx = startIdx;
      zoomHandler.endIdx = endIdx;
      zoomHandler.render();
    };

    render.registerZoomFn(zoom);

    return () => {
      if (!chart.lastChild) return;
      while (chart.firstChild) {
        chart.removeChild(chart.lastChild);
      }
    };
  }, [config]);

  useEffect(() => {
    const render = renderRef.current;
    if (!render || !data) return;

    render.dataSrc = data.wave[`${config.type}_wave`];
    render.render();
  }, [data, config]);

  const maximize = useCallback(() => {
    const chart = chartRef.current;
    const overlay = overlayRef.current;
    if (!overlay || !chart) return;
    overlay.style.display = "block";
    const overlayChartWrapper = overlay.firstChild!;
    if (!chart.lastChild) return;
    while (chart.firstChild) {
      const canvas = chart.removeChild(chart.lastChild) as HTMLCanvasElement;
      canvas.style.width = `${overlay.clientWidth}px`;
      canvas.style.height = `${overlay.clientHeight}px`;
      overlayChartWrapper.appendChild(canvas);
    }
  }, []);

  const minimize = useCallback(() => {
    const chart = chartRef.current;
    const overlay = overlayRef.current;
    if (!overlay || !chart) return;
    overlay.style.display = "none";
    const overlayChartWrapper = overlay.firstChild!;
    if (!overlayChartWrapper.lastChild) return;
    while (overlayChartWrapper.firstChild) {
      const canvasOfOverlayChartWrapper = overlayChartWrapper.removeChild(
        overlayChartWrapper.lastChild
      ) as HTMLCanvasElement;
      canvasOfOverlayChartWrapper.style.width = `${chart.clientWidth}px`;
      canvasOfOverlayChartWrapper.style.height = `${chart.clientHeight}px`;
      chart.appendChild(canvasOfOverlayChartWrapper);
    }
  }, []);

  const unzoom = () => {
    const modal = modalContentRef.current;
    const zoomHandler = zoomHandlerRef.current;
    if (!modal || !zoomHandler) return;

    // setIsShowZoomModal(false);
    modal.style.display = "none";
    zoomHandler.cleanup();
    const zoomCanvas = document.getElementById("zoom-canvas"),
      zoomDetail = document.getElementById("zoom-detail");
    if (!zoomCanvas || !zoomDetail) {
      console.log("cant find 'zoom-canvas' and 'zoom-detail' element");
      return;
    }
    modal.removeChild(zoomDetail);
    modal.removeChild(zoomCanvas);
    // zoomHandlerRef.current = null; // exp
  };

  return (
    <div ref={parentRef} className="relative h-full w-full">
      {/* <div className="sound-request">
        <p>This webpage would like to play sounds</p>
        <p className="buttons">
          <button value="0">Block</button>
          <button value="1">Allow</button>
        </p>
      </div> */}
      <div className="h-full w-full" id="main-div">
        <div id="zoomModal" className="hidden">
          <div
            ref={modalContentRef}
            className="modal-content"
            id="model-content"
          >
            <strong>Zoom in</strong>
            <span className="close" onClick={unzoom}>
              &times;
            </span>
          </div>
        </div>
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 hidden h-screen w-screen bg-black"
          id="overlay"
        >
          <div className="absolute inset-0 z-40 bg-inherit"></div>
          <button
            className="absolute top-2 right-2 z-50 text-neutral-200 transition-all hover:text-neutral-100  active:scale-90 active:text-neutral-100"
            onClick={minimize}
          >
            <ExitFullScreenMiniIcon className="h-5 w-5" />
          </button>
        </div>
        <div id="container" className="relative h-full w-full">
          <div
            ref={chartWrapperRef}
            className="relative h-full w-full overflow-x-auto overflow-y-auto"
            id="left-pane"
          >
            <button
              className="absolute top-2 right-2 z-30 text-neutral-200 transition-all hover:text-neutral-100  active:scale-90 active:text-neutral-100"
              onClick={maximize}
            >
              <FullScreenMiniIcon className="h-5 w-5" />
            </button>
            <div ref={chartRef} className="relative h-full w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
