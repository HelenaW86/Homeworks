import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
 RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Signin from "./pages/Signin";
import RootLayout from "./RootLayout";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Profile from "./pages/Profile";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
