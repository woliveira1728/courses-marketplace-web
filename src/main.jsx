import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./styles/globalStyles.scss";
import { UserProvider } from "./providers/UserContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <ToastContainer />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
