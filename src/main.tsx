import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import routes from "./router/routes.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App routes={routes} />
  </StrictMode>
);
