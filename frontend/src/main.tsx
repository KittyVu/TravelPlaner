import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import Home from "./pages/Home.tsx";
import User from "./pages/User.tsx";
import Trips from "./pages/Trips.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Contact from "./pages/Contact.tsx";
import TripDetail from "./pages/TripDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/user", element: <User /> },
      { path: "/trips", element: <Trips /> },
       { path: "/tripdetail/:id", element: <TripDetail /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
