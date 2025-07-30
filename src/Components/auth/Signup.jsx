import './Signup.css';
import { useNavigate } from 'react-router';
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  <div id="body1">
    <div className="signup-container">
      <div className="left-panel">
        <h2>Welcome Back!</h2>
        <p>To keep connected with us, please login with your personal info</p>
        <button className="ghost" onClick={goToLogin}>Sign In</button>
      </div>
      <div className="right-panel">
        <form onSubmit={handleSignup}>
          <h2>Create Account</h2> 
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          <button className="form-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
  );
}