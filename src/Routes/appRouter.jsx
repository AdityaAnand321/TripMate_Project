import { createBrowserRouter } from "react-router";
import { ROUTES } from "./Routes";
import Home from "../Pages/Home/Home";
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";
import About from "../Pages/About/About";
import Profile from "../Pages/Home/Profile";
import Favourite from "../Pages/Home/Favourite";
import Setting from "../Pages/Home/Setting";
import Dashboard from "../Pages/Home/Dashboard";
import Details from "../Pages/Home/Details";
import Booked from "../Pages/ShowBooking/show"

const appRouter = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE.path,
    element: <Home />,
    title: ROUTES.HOMEPAGE.title,
    children:[
      
      {path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "favourite", element: <Favourite /> },
      { path: "settings", element: <Setting /> },
      {path:"booked",element:<Booked/>},
    ],
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
  {
    path:ROUTES.DETAILS.path,
    element:<Details/>,
    title:ROUTES.DETAILS.title,
  },
]);

export default appRouter;