import './Signup.css';
import { useNavigate } from 'react-router';
import {useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaLock, FaGlobeAsia } from 'react-icons/fa';

export default function Signup(){

  const navigate=useNavigate();

  const goToLogin=()=>{
    navigate('/login');
  }
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[isLogged,LoggedIn]=useState('false');

const handleSignup=(e)=>{
  e.preventDefault();//isse form submit hone pe page reload nahi hoga

  const userData={
    name: name,
    email: email,
    password: password,
    isLogged:"false",
  };
  localStorage.setItem('user', JSON.stringify(userData));
  toast.success("Signup successful! You can now login.");
  navigate('/login');  
  
}
  
  return( 
    <div id="body1" className="signup-body">
      <div className="signup-container grid">
        {/* Left CTA */}
        <div className="left-panel cta">
          <div className="overlay">
            <h2><FaGlobeAsia /> Join TripMate</h2>
            <p>Plan epic trips, track bookings, and uncover hidden gems around the world.</p>
            <button className="ghost" onClick={goToLogin}>I already have an account</button>
          </div>
        </div>

        {/* Right form */}
        <div className="right-panel">
          <form onSubmit={handleSignup} className="signup-form">
            <h2>Create your account</h2> 
            <div className="input-group">
              <span className="input-icon"><FaUser /></span>
              <input type="text" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="input-group">
              <span className="input-icon"><FaEnvelope /></span>
              <input type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="input-group">
              <span className="input-icon"><FaLock /></span>
              <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <button className="form-button" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}