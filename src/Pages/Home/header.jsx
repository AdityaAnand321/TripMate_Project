import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../../Routes/Routes';
import './Home.css';
import { useLocation } from 'react-router';
import logo from '../../assets/icon/logo.jpeg';
import { Heart, User, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import Modal from '../../Components/common/Modal';
import { FaSignOutAlt } from 'react-icons/fa';

function Header({ search, setSearch, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [logoutOpen, setLogoutOpen] = useState(false);

  const doLogout = () => {
    user.isLogged = "false";
    localStorage.setItem("user", JSON.stringify(user));
    setLogoutOpen(false);
    window.location.reload();
  };

  return (
    <div className="header1">
      {/* Header */}
      <Link to="/" onClick={() => setSearch && setSearch("") }>
        <img src={logo} alt="" style={{ height: "50px" }} />
      </Link>

      <div className="headbtn">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      {/* Search Box */}
      <input
        type="search"
        style={{ padding: "5px", width: "300px" }}
        placeholder="Search for trips"
        value={search || ""}
        onFocus={() => {
          if (!isHome) navigate("/");
        }}
        onChange={(e) => setSearch && setSearch(e.target.value)}
      />

      <div className="auth-buttons1">
        {user && user.isLogged === "true" ? (
          <div className="lastbtn">
            <Link to="/booked">
              <div className="profile-button">
                <ShoppingCart className="profile-icon" />
                <p className="profile-text">Bookings</p>
              </div>
            </Link>

            <Link to="/favourite">
              <div className="profile-button">
                <Heart className="profile-icon" size={24} />
                <p className="profile-text">Favourites</p>
              </div>
            </Link>

            <Link to="/profile">
              <div className="profile-button">
                <User className="profile-icon" />
                <p className="profile-text">Profile</p>
              </div>
            </Link>

            <div>
              <span style={{ color: "black" }}> {user.name}</span>
              <button onClick={() => setLogoutOpen(true)}>Logout</button>
            </div>
          </div>
        ) : (
          <>
            <button>
              <Link to={ROUTES.LOGIN.path} className="log">
                Login
              </Link>
            </button>
            <button>
              <Link to={ROUTES.SIGNUP.path} className="log">
                Signup
              </Link>
            </button>
          </>
        )}
      </div>
    {/* Logout confirm modal */}
    <Modal
      isOpen={logoutOpen}
      title={(
        <span style={{display:'flex',alignItems:'center',gap:8}}>
          <FaSignOutAlt style={{color:'#ef4444'}}/> Sign out
        </span>
      )}
      onClose={() => setLogoutOpen(false)}
      actions={(
        <div style={{display:'flex',gap:10}}>
          <button
            onClick={() => setLogoutOpen(false)}
            style={{
              background:'#f3f4f6', color:'#111827', border:'none', padding:'10px 14px',
              borderRadius:10, cursor:'pointer', fontWeight:700
            }}
          >
            Cancel
          </button>
          <button
            onClick={doLogout}
            style={{
              background:'linear-gradient(90deg,#ef4444,#dc2626)', color:'#fff', border:'none', padding:'10px 14px',
              borderRadius:10, cursor:'pointer', fontWeight:800
            }}
          >
            Yes, Logout
          </button>
        </div>
      )}
    >
      <div style={{color:'#374151'}}>
        Are you sure you want to logout from TripMate? You can always sign back in later.
      </div>
    </Modal>
    </div>
  );
}

export default Header;
