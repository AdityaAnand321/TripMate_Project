 import {
   RouterProvider,
} from 'react-router';
import Home from './Pages/Home/Home';
import appRouter from './Routes/appRouter'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
     <>
    <ToastContainer autoClose={1500} limit={10} />
            <RouterProvider router={appRouter} />
            
    </>      
  );
}

export default App;
