import './Login.css';
import { useNavigate } from 'react-router';


import Signup from './Signup';
export default function Login(){
  const navigate=useNavigate();
  const goToSignup=()=>{
    navigate('/signup');
  }
  return( 
     <div className="container">
    <div className="signin">
      <form action="">
      <h2>Sign In</h2>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forgot Your Password</a>
      <button className="signin-btn">SIGN IN</button>
      </form>
    </div>
    <div className="signup">
      <h2>Hello, Friend!</h2>
      <p>Enter your details and start journey with us</p>
      <button className="signup-btn" onClick={goToSignup}>SIGN UP</button>
    </div>
  </div>

  );

}