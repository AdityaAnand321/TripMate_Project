import { createBrowserRouter } from "react-router";
import { ROUTES } from "./Routes";
import Home from "../Pages/Home/Home";
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";
import About from "../Pages/About/About";
import Profile from "../Pages/Home/Profile";
import Favourite from "../Pages/Home/Favourite";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Pages/Home/Dashboard";
import Details from "../Pages/Home/Details";
import Booked from "../Pages/ShowBooking/show"
import Product from "../Components/ShowProduct/Product"
const appRouter = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE.path,
    element: <Home />,
    title: ROUTES.HOMEPAGE.title,
    children:[
      
      {path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "favourite", element: <Favourite /> },
      { path: "contact", element: <Contact /> },
      {path:"booked",element:<Booked/>},
      {path:"about",element:<About/>},
      {path:"product",element:<Product/>},
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
  {
    path:ROUTES.CONTACT.path,
    element:<Contact/>,
    title:ROUTES.CONTACT.title,
  },
  {
    path:ROUTES.PRODUCT.path,
    element:<Product/>,
    title:ROUTES.PRODUCT.title,
  }

]);

export default appRouter;