/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "react-bootstrap";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { Store } from "./store/Store";
const ClientID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId={ClientID}>
        <AppRouter />
      </GoogleOAuthProvider>
    </Provider>
  </ThemeProvider>
);
