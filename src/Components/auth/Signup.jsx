import './Signup.css';
import { useNavigate } from 'react-router';

export default function Signup(){

  const navigate=useNavigate();
  const goToLogin=()=>{
    navigate('/login');
  }
  return(
  <div className="signup-container">
    <div className="left-panel">
      <h2>Welcome Back!</h2>
      <p>To keep connected with us, please login with your personal info</p>
      <button className="ghost" onClick={goToLogin}>Sign In</button>
    </div>
    <div className="right-panel">
      <form>
        <h2>Create Account</h2> 
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="form-button">Sign Up</button>
      </form>
    </div>
  </div>
  );
}