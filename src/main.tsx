import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LazyMotion } from "framer-motion";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Chart, { ConfigType } from "./components/Chart/Chart";
import sampleDataGen from "./utils/sampleData";
import { SocketData } from "./models/realtime.models";
export const queryClient = new QueryClient();
const loadFeature = () => import("./framerFeature").then((res) => res.default);
const sampleData: SocketData = sampleDataGen("Nguyen Vu Anh");

const ecgConfig: ConfigType = {
  color: "00FF00",
  WINDOW_POINTS: 250,
  scanBarLength: 40,
  INTERVAL: 15,
  type: "ecg",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LazyMotion features={loadFeature} strict>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* <div className="flex h-screen w-screen items-center justify-center bg-neutral-600">
        <div className="h-1/2 w-1/2 border-neutral-200">
          <Chart data={sampleData} config={ecgConfig} />
        </div>
      </div> */}
    </LazyMotion>
  </React.StrictMode>
);
