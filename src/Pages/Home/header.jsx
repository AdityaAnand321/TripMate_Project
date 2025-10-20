import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../../Routes/Routes';
import './Home.css';
import { useLocation } from 'react-router';
import logo from '../../assets/icon/logo.jpeg';
import { Heart, User, ShoppingCart, Search as SearchIcon, X as CloseIcon } from 'lucide-react';
import React, { useState } from 'react';
import Modal from '../../Components/common/Modal';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearFavourites } from '../../redux/favouritesSlice';

function Header({ search, setSearch, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [logoutOpen, setLogoutOpen] = useState(false);
  const favCount = useSelector((state) => state.favourites?.length || 0);
  const dispatch = useDispatch();

  const doLogout = () => {
    // Clear in-memory favourites so UI updates immediately
    dispatch(clearFavourites());
    user.isLogged = "false";
    localStorage.setItem("user", JSON.stringify(user));
    // Optionally do not clear stored favourites; they are user-scoped and will load next login
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
      <div className="header-search" aria-label="Search trips">
  <SearchIcon className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search destinations, trips, places..."
          value={search || ""}
          onFocus={() => {
            if (!isHome) navigate("/");
          }}
          onChange={(e) => setSearch && setSearch(e.target.value)}
          role="searchbox"
          aria-label="Search trips"
          inputMode="search"
          enterKeyHint="search"
        />
        {Boolean(search) && setSearch && (
          <button
            type="button"
            className="clear-btn"
            aria-label="Clear search"
            onClick={() => setSearch("")}
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>

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
                <div className="icon-with-badge">
                  <Heart className="profile-icon" size={24} />
                  {favCount > 0 && (
                    <span className="fav-badge">{favCount}</span>
                  )}
                </div>
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
