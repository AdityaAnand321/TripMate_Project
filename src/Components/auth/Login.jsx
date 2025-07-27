import './Login.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Dashboard from '../../Pages/Home/Dashboard';

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

    if(email===savedUser.email && password===savedUser.password){
      navigate('/');
    }else{
      setErrorMsg('Invalid email or password');
    }
  };
  return( 
    <div className="loginbody">
     <div className="container">
    <div className="signin">
      <form onSubmit={handleLogin}>
      <h2>Sign In</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      <a href="#">Forgot Your Password</a> 
    
      {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
      <button className="signin-btn" type="submit">SIGN IN</button>
      </form>
    </div>
    <div className="signup">
      <h2>Hello, Friend!</h2>
      <p>Enter your details and start journey with us</p>
      <button className="signup-btn" onClick={goToSignup}>SIGN UP</button>
    </div>
  </div>
  </div>


  );

}