import './Login.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Dashboard from '../../Pages/Home/Dashboard';
import { FaEnvelope, FaLock, FaPlaneDeparture } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import {Signup} from './Signup';

export default function Login(){
  const navigate=useNavigate();

  const goToSignup=()=>{
    navigate('/signup');
  }
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser=JSON.parse(localStorage.getItem('user'));

    if(savedUser &&(email===savedUser.email && password===savedUser.password)){
      savedUser.isLogged = "true";
      localStorage.setItem("user", JSON.stringify(savedUser));
      navigate('/');

    }else{
      toast.error("Invalid Email or Password");
      setErrorMsg('Invalid email or password');
    }
  };
  return( 
    <div className="loginbody">
      <div className="container auth-grid">
        {/* Left: Form */}
        <div className="signin">
          <div className="brand">
            <FaPlaneDeparture />
            <span>TripMate</span>
          </div>
          <h2 className="title">Welcome back</h2>
          <p className="subtitle">Sign in to continue your journey</p>
          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <span className="input-icon"><FaEnvelope /></span>
              <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <span className="input-icon"><FaLock /></span>
              <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            {/* Forgot password removed as requested */}
            {errorMsg && <p className="error-text">{errorMsg}</p>}
            <button className="signin-btn" type="submit">Sign In</button>
          </form>
        </div>

        {/* Right: Call to action */}
        <div className="signup cta-pane">
          <div className="cta-overlay">
            <h2>Hello, Traveler!</h2>
            <p>New here? Create an account and start planning your next getaway.</p>
            <button className="signup-btn" onClick={goToSignup}>Create Account</button>
          </div>
        </div>
      </div>

      {/* Forgot password flow removed */}
    </div>
  );

}