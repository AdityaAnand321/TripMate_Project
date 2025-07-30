import { createBrowserRouter } from "react-router";
import { ROUTES } from "./Routes";

import Home from "../Pages/Home/Home";
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";
import About from "../Pages/About/About";
 
 
const appRouter = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE.path,
    element: <Home />,
    title: ROUTES.HOMEPAGE.title,
  },
  {
    path: ROUTES.LOGIN.path,
    element: <Login />,
    title: ROUTES.LOGIN.title,
  },
  {
    path: ROUTES.SIGNUP.path,
    element: <Signup />,
    title: ROUTES.SIGNUP.title,
  },
  {
    path: ROUTES.ABOUT.path,
    element: <About />,
    title: ROUTES.ABOUT.title,
  },
]);

export default appRouter;
