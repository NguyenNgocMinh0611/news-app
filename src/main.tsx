import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "@/store/Store";
import "@/styles/font-size.scss";

createRoot(document.getElementById("root")!).render(
    <StrictMode>

        <Provider store={store}>
            <App />
        </Provider>

    </StrictMode>,
);
