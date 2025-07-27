import { createBrowserRouter } from "react-router";
import { ROUTES, ROUTES_CONFIG } from "./Routes";

import Home from "../Pages/Home/Home";
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";
import About from "../Pages/About/About";
import Dashboard from "../Pages/Home/Dashboard";

 
const appRouter = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE,
    element: <Home />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    title: ROUTES_CONFIG.LOGIN.title,
  },
  // {
  //   path: '',
  //   element: <Dashboard />,
  //   title: ROUTES_CONFIG.DASHBOARD.title,
  // },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
    title: ROUTES_CONFIG.SIGNUP.title,
  },
  {
    path: ROUTES.ABOUT,
    element: <About />,
    title: ROUTES_CONFIG.ABOUT.title,
  },
]);

export default appRouter;
