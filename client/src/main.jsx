import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContextProvider from "./Utils/AppContextProvider.jsx";
import AppQueryProvider from "./Utils/reactQuery/client.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <AppQueryProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AppQueryProvider>
    </AppContextProvider>
  </React.StrictMode>
);
