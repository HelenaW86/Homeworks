import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
 RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import './scss/style.scss';
import App from "./App";
import Signin from "./pages/Signin";
import RootLayout from "./RootLayout";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor  } from "./store/store";
import { Questions } from "./pages/Questions";
import { PracticeOn } from "./pages/PracticeOn";


const router = createBrowserRouter(
  createRoutesFromElements(
  
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/questions/:theme/:name" element={<PracticeOn />} />
      <Route path="*" element={<Error />} />
    </Route>

  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
