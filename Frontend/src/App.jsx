import { RouterProvider } from 'react-router-dom';
import appRouter from './Routes/appRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGate from './Routes/AuthGate';
function App() {
  return (
    <>
    
    <ToastContainer autoClose={1500} limit={10} />
    <AuthGate>
      <RouterProvider router={appRouter} />
    </AuthGate>

    </>
  );
}
export default App;