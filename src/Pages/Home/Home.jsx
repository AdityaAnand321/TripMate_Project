import { Link } from 'react-router';
import { ROUTES } from '../../Routes/Routes';
import './Home.css';

export default function Home() {
  const login = () => {
    alert("Login button clicked!");
  };

  const signup = () => {
    alert("Signup button clicked!");
  };

  return (
    <div>
      
      <div className="header1">
        <h1>My Dashboard</h1>
        <div className="auth-buttons1">
          <button  ><Link to={ROUTES.LOGIN}>Login</Link></button>
          <button ><Link to={ROUTES.SIGNUP}>Signup</Link></button>
          <button><Link to={ROUTES.ABOUT}>About Us</Link></button>
        </div>
      </div>

 
      <div className="sidebar1">
        <a href="#">Dashboard</a>
        <a href="#">Profile</a>
        <a href="#">Settings</a>
        <a href="#">Logout</a>
      </div>

  
      <div className="main-content1">
        <div className="card1">
          <h2>Welcome</h2>
          <p>This is a simple dashboard layout with login and signup buttons.</p>
        </div>

        <div className="card1">
          hi
        </div>

        <div className="card1">
          hello
        </div>

        <div className="card1">
          hi
        </div>
      </div>
    </div>
  );
}