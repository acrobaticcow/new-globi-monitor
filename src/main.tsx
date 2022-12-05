import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LazyMotion } from "framer-motion";
import "./index.css";
import MiniMonitor from "./components/MiniMonitor/MiniMonitor";
const loadFeature = () => import("./framerFeature").then((res) => res.default);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LazyMotion features={loadFeature} strict>
      <App />
      {/* <div className="flex h-screen w-screen items-center justify-center bg-neutral-600">
        <MiniMonitor name="Nguyễn Vxu Anh Anh Anh" dob="18/12/2000" img="" />
      </div> */}
    </LazyMotion>
  </React.StrictMode>
);
