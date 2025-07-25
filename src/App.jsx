 import {
   RouterProvider,
} from 'react-router';
import Home from './Pages/Home/Home';
import appRouter from './Routes/appRouter';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
     <>
    <ToastContainer autoClose={1500} limit={10} />
            <RouterProvider router={appRouter} />
    </>      
  );
}

export default App;
