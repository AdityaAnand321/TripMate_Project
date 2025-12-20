import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFavourites } from '../../redux/favouritesSlice';
import { setBookings } from '../../redux/Boooking';
import { setUser } from '../../redux/authSlice';
import api from '../../Api/client';
import { FaEnvelope, FaLock, FaPlaneDeparture } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import {Signup} from './Signup';

export default function Login({ defaultMode = 'user' }){
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const goToSignup=()=>{
    navigate('/signup');
  }
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [mode, setMode] = useState(defaultMode === 'admin' ? 'admin' : 'user'); // 'user' | 'admin'

  const handleLogin = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const data = await api.post('/api/users/login', { email, password });
        const user = data && data.user;
        if (!user) {
          toast.error('Invalid email or password');
          setErrorMsg('Invalid email or password');
          return;
        }

        const session = { name: user.name || '', email: user.email, isAdmin: !!user.isAdmin, isLogged: true };
        if (mode === 'admin' && !session.isAdmin) {
          toast.error('This account is not an admin');
          setErrorMsg('This account is not an admin');
          return;
        }

        dispatch(setUser(session));
        const emailAddr = user.email;
        try {
          const [favs = [], bookings = []] = await Promise.all([
            api.get(`/api/favourites/${encodeURIComponent(emailAddr)}`).catch(() => []),
            api.get(`/api/bookings/${encodeURIComponent(emailAddr)}`).catch(() => []),
          ]);
          dispatch(setFavourites(favs || []));
          dispatch(setBookings(bookings || []));
        } catch (err) {
          console.error('Hydration after login failed', err);
        }
        navigate(mode === 'admin' ? '/admin/dashboard' : '/');
      } catch (err) {
        // Distinguish invalid creds vs server/network
        if (err && err.status === 401) {
          toast.error('Invalid email or password');
          setErrorMsg('Invalid email or password');
        } else if (err && err.status === 403) {
          toast.error('Access denied');
          setErrorMsg('Access denied');
        } else {
          console.error('Login error', err);
          toast.error('Cannot reach server. Please try again.');
          setErrorMsg('Server unreachable');
        }
      }
    })();
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
          {/* Mode toggle: User vs Admin */}
          <div style={{display:'flex',gap:10,marginTop:10,marginBottom:10}}>
            <button
              type="button"
              onClick={() => setMode('user')}
              style={{
                padding:'8px 12px', borderRadius:8, border:'1px solid #e5e7eb', cursor:'pointer',
                background: mode==='user' ? '#111827' : '#ffffff', color: mode==='user' ? '#ffffff' : '#111827', fontWeight:700
              }}
            >
              Login as User
            </button>
            <button
              type="button"
              onClick={() => setMode('admin')}
              style={{
                padding:'8px 12px', borderRadius:8, border:'1px solid #e5e7eb', cursor:'pointer',
                background: mode==='admin' ? '#111827' : '#ffffff', color: mode==='admin' ? '#ffffff' : '#111827', fontWeight:700
              }}
            >
              Login as Admin
            </button>
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
            {/* Admin account creation removed */}
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