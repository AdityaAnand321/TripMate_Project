import { createBrowserRouter, Navigate } from "react-router-dom";
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
import ScrollToTopWrapper from "./ScrollToTop";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminUsers from "../Pages/Admin/AdminUsers";
import AdminTrips from "../Pages/Admin/AdminTrips";
import AdminUserDetail from "../Pages/Admin/AdminUserDetail";
import RequireAdmin from "./RequireAdmin";
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
  // Support /home by redirecting to root to avoid blank page
  {
    path: "/home",
    element: <Navigate to="/" replace />,
    title: "Home",
  },
  {
    path: ROUTES.LOGIN.path,
    element: <Login />,
    title: ROUTES.LOGIN.title,
  },
  // Dedicated admin login route with admin mode preselected
  {
    path: '/admin/login',
    element: <Login defaultMode="admin" />,
    title: 'Admin Login',
  },
  {
    path: ROUTES.SIGNUP.path,
    element: <Signup />,
    title: ROUTES.SIGNUP.title,
  },
  {
    path: '/admin/dashboard',
    element: (
      <RequireAdmin>
        <AdminDashboard />
      </RequireAdmin>
    ),
    title: 'Admin Dashboard',
  },
  {
    path: '/admin/users',
    element: (
      <RequireAdmin>
        <AdminUsers />
      </RequireAdmin>
    ),
    title: 'Admin Users',
  },
  {
    path: '/admin/users/:email',
    element: (
      <RequireAdmin>
        <AdminUserDetail />
      </RequireAdmin>
    ),
    title: 'Admin User Detail',
  },
  {
    path: '/admin/trips',
    element: (
      <RequireAdmin>
        <AdminTrips />
      </RequireAdmin>
    ),
    title: 'Admin Trips',
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