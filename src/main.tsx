import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LazyMotion } from "framer-motion";
import "./index.css";
const loadFeature = () => import("./framerFeature").then((res) => res.default);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LazyMotion features={loadFeature} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>
);
