import { Link } from 'react-router';
import { ROUTES } from '../../Routes/Routes';
import './Home.css';
import place from '../../Api/detail';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router';
import logo from '../../assets/icon/logo.jpeg';  
import Product from '../../Components/ShowProduct/Product';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation(); 
  return (
    <div>
      {/* Header */}
      <div className="header1">
        <Link to="/dashboard">
          <img src={logo} alt="" style={{ height: '50px' }} />
        </Link>
        <div className='headbtn'>
          <Link to="/profile">Profile</Link>
          <Link to="/favourite">Favourite</Link>
          <Link to="/settings">Setting</Link>
          <Link>Offers</Link>
          <Link to="/booked">Booking History</Link>
        </div>
        <input type="search" style={{ padding: '5px', width: '300px' }} placeholder='Search for trips' />

        <div className="auth-buttons1">
          {user && user.isLogged === "true" ? (
            <>
              <span style={{ color: 'black' }}>Welcome, {user.name}</span>
              <button
                onClick={() => {
                  user.isLogged = "false";
                  localStorage.setItem("user", JSON.stringify(user));
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button>
                <Link to={ROUTES.LOGIN.path}>Login</Link>
              </button>
              <button>
                <Link to={ROUTES.SIGNUP.path}>Signup</Link>
              </button>
              <button>
                <Link to={ROUTES.ABOUT.path}>About Us</Link>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="main-content1">
        {location.pathname === '/' || location.pathname === '/home' || location.pathname === '/dashboard' ? (
          <>
             <Product items={place}/>  
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
