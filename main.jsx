
import React from "react";
import ReactDOM from "react-dom/client";
import WallpaperHub from "./WallpaperHub";
import "./index.css";
import { ThemeProvider } from "./components/theme/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <WallpaperHub />
    </ThemeProvider>
  </React.StrictMode>
);
