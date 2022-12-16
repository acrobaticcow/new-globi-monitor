import type { FC } from "react";
import { useEffect, useRef, useCallback } from "react";
// @ts-ignore
import {
  LayoutUtil,
  // BeepWrapper,
  IndicatorRenderer,
  ZoomHandler,
} from "./engine.js";
import { SocketData } from "../../models/realtime.models.js";
import {
  ExitFullScreenMiniIcon,
  FullScreenMiniIcon,
  XMarkIcon,
} from "../Icons.js";

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
// const soundPlayer = new BeepWrapper();

const Chart: FC<ChartProps> = ({ data, config }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<any>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const zoomHandlerRef = useRef<any>(null);
  const zoomModalRef = useRef<HTMLDivElement>(null);
  // const [isShowZoomModal, setIsShowZoomModal] = useState(false);

  // init
  useEffect(() => {
    const parent = parentRef.current;
    const modalContent = modalContentRef.current;
    const chartWrapper = chartWrapperRef.current;
    const zoomModal = zoomModalRef.current;
    const chart = chartRef.current;
    if (!parent || !modalContent || !chartWrapper || !chart || !zoomModal)
      return;
    LayoutUtil.enableDrag(modalContentRef.current);
    const render = (renderRef.current = new IndicatorRenderer(chart, config));

    const zoom = (
      data: unknown,
      numPoints: number,
      minVal: number,
      maxVal: number,
      startIdx: number,
      endIdx: number
    ) => {
      console.log("anything");
      zoomModal.style.display = "block";
      const zoomHandler = (zoomHandlerRef.current = new ZoomHandler(
        modalContent,
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
    const zoomModal = zoomModalRef.current;
    const zoomHandler = zoomHandlerRef.current;
    const modalContent = modalContentRef.current;
    if (!zoomModal || !zoomHandler || !modalContent) return;

    zoomModal.style.display = "none";
    zoomHandler.cleanup();
    const zoomCanvas = document.getElementById("zoom-canvas"),
      zoomDetail = document.getElementById("zoom-detail");
    if (!zoomCanvas || !zoomDetail) {
      console.log("cant find 'zoom-canvas' and 'zoom-detail' element");
      return;
    }
    modalContent.removeChild(zoomDetail);
    modalContent.removeChild(zoomCanvas);
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
        <div
          ref={zoomModalRef}
          id="zoomModal"
          className="fixed left-0 top-0 z-30 hidden h-full w-full cursor-move overflow-auto bg-neutral-600/40 pt-24"
        >
          <div
            ref={modalContentRef}
            className="absolute m-auto flex aspect-video w-2/5 flex-col justify-between rounded-md border border-neutral-300 bg-neutral-400 px-4 py-2 shadow-xl shadow-neutral-500"
            id="model-content"
          >
            <div className="inset-0 flex items-center justify-between">
              <button
                className="group peer rounded-full shadow-neutral-100"
                onClick={unzoom}
              >
                <XMarkIcon className="order-last h-6 w-6 text-neutral-200 shadow-neutral-300 transition-colors duration-200 ease-in group-hover:text-neutral-100/80 group-hover:shadow-md" />
              </button>
              <p className="order-first text-lg font-bold leading-none tracking-wide transition-colors duration-200 ease-in peer-hover:text-neutral-200">
                Zoom in
              </p>
            </div>
          </div>
        </div>
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 hidden h-screen w-screen bg-black"
          id="overlay"
        >
          <div
            id="maximize-canvas-container"
            className="absolute inset-0 z-50 bg-inherit"
          ></div>
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
            className="relative h-full w-full overflow-hidden"
            id="left-pane"
          >
            <div className="absolute left-2 top-2 z-20 text-lg font-semibold uppercase leading-none text-neutral-100">
              {config.type}
            </div>
            <button
              className="absolute top-2 right-2 z-20 text-neutral-200 transition-all hover:text-neutral-100  active:scale-90 active:text-neutral-100"
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
