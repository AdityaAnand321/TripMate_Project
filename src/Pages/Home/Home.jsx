import { Link } from 'react-router';
import { ROUTES } from '../../Routes/Routes';
import './Home.css';
import place from '../../Api/detail';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router';
import logo from '../../assets/icon/logo.jpeg';
import Product from '../../Components/ShowProduct/Product';
import Footer from '../../Components/layout/Footer';
import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import banner from '../../assets/icon/banner.webp'; 
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { Heart,User,House,ShoppingCart } from 'lucide-react';


export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  const isHome =
    location.pathname === '/' ||
    location.pathname === '/home' ||
    location.pathname === '/dashboard';

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(100000);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedDays, setSelectedDays] = useState(null);
  const [sortOrder, setSortOrder] = useState(""); // "high" or "low"

  // Handle star checkbox filter
  const handleStarChange = (star) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter((s) => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };

  // Handle radio button for days (toggle on re-click)
  const handleDaysChange = (value) => {
    if (selectedDays === value) {
      setSelectedDays(null);
    } else {
      setSelectedDays(value);
    }
  };

  // Reset all filters
  const clearFilters = () => {
    setSearch("");
    setPrice(100000);
    setSelectedStars([]);
    setSelectedDays(null);
    setSortOrder("");
  };

  // ---- Filtering + Sorting (used only on Home screens) ----
  const searchFilter = place.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.state.toLowerCase().includes(search.toLowerCase()) ||
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  const starFiltered =
    selectedStars.length > 0
      ? searchFilter.filter((item) => selectedStars.includes(item.stars))
      : searchFilter;

  const daysFiltered = selectedDays
    ? starFiltered.filter((item) => item.days === selectedDays)
    : starFiltered;

  const filteredByPrice = daysFiltered.filter((item) => {
    const cost = parseInt(item.package.totalCost.replace(/₹|,/g, ''));
    return cost <= price;
  });

  const sortedItems = [...filteredByPrice].sort((a, b) => {
    const costA = parseInt(a.package.totalCost.replace(/₹|,/g, ''));
    const costB = parseInt(b.package.totalCost.replace(/₹|,/g, ''));
    if (sortOrder === "high") return costB - costA;
    if (sortOrder === "low") return costA - costB;
    return 0;
  });

  return (
    <div>
      {/* Header */}
      <div className="header1">
        <Link to="/" onClick={() => setSearch("")}>
          <img src={logo} alt="" style={{ height: '50px' }} />
        </Link>

        <div className='headbtn'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link> 
          <Link to="/settings">Contact Us</Link>

          

           
             
          {/* <Link>Offers</Link> */}
 
        </div>

        <input
          type="search"
          style={{ padding: '5px', width: '300px' }}
          placeholder='Search for trips'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

         

        <div className="auth-buttons1">

           

          {user && user.isLogged === "true" ? (
            <>

          <div className='lastbtn'>



             <Link to="/booked">
            <div className="profile-button">
              <ShoppingCart className="profile-icon" />
              <p className="profile-text">Bookings</p>
            </div>
          </Link>

           <Link to="/favourite">
            <div className="profile-button">
              <Heart className="profile-icon" size={24}/>
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
              <span style={{ color: 'black' }}>  {user.name}</span>
              <button
                onClick={() => {
                  user.isLogged = "false";
                  localStorage.setItem("user", JSON.stringify(user));
                  window.location.reload();
                }}
                
              >
                Logout
              </button>
              </div>
          </div>

            </>
          ) : (
            <>
              <button>
                <Link to={ROUTES.LOGIN.path} className='log'>Login</Link>
              </button>
              <button>
                <Link to={ROUTES.SIGNUP.path} className='log'>Signup</Link>
              </button>
             
            </>
          )}
        </div>
      </div>

      {/* ---- Show Banner + Filters + Products ONLY on Home routes ---- */}
      {isHome ? (
        <>
          {/* Banner */}
          <div className="banner-section">
            <img src={banner} alt="Travel Banner" />
            <div className="banner-text">
              <h1>Explore The World With Us 🌍</h1>
              <p>Find your perfect holiday package at the best price</p>
              <button>Discover Now</button>
            </div>
          </div>

          {/* Main content */}
          <div className='arrange'>
            {/* Filter Panel */}
            <div className='filter'>
              {/* Price Filter */}
              <h4>Max Price: ₹{price.toLocaleString()}</h4>
              <Slider
                min={0}
                max={100000}
                step={1000}
                value={price}
                onChange={(value) => setPrice(value)}
              />
              <br />
              <hr />

              {/* Stars Filter */}
              <h4>Filter by Stars:</h4>
              {[3, 4, 5].map((star) => (
                <label key={star} style={{ display: 'block' }}>
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(star)}
                    onChange={() => handleStarChange(star)}
                  />
                  {star} Stars
                </label>
              ))}
              <br />
              <hr />

              {/* Days Filter */}
              <h4>Filter by Days:</h4>
              {[2, 3, 4, 5].map((day) => (
                <label key={day} style={{ display: 'block' }}>
                  <input
                    type="radio"
                    checked={selectedDays === day}
                    onClick={() => handleDaysChange(day)}
                    readOnly
                  />
                  {day} Days
                </label>
              ))}
              <br />
              <hr />

              {/* Sort Filter */}
              <h4>Sort by Price:</h4>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Default</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
              <br />
              <hr />

              {/* Clear Filters Button */}
              <button onClick={clearFilters} style={{ marginTop: "10px", padding: "5px 10px" }}>
                Clear Filters
              </button>
            </div>

            {/* Results */}
            <div className="main-content1">
              <Product items={sortedItems} />
            </div>
          </div>
        </>
      ) : (
        /* Other routes will only render nested route content */
        <Outlet />
      )}

      <Footer />
    </div>
  );
}