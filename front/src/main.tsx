import { createRoot } from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css"; // AntD 5 recommended reset
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
