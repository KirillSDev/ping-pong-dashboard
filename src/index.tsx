import { App } from "./App";
import { createRoot } from "react-dom/client";
import './styles.scss'

const rootContainer = document.getElementById("app");
createRoot(rootContainer).render(<App/>);
