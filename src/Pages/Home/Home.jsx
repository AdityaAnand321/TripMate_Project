import { Link } from 'react-router';
import { ROUTES } from '../../Routes/Routes';
import './Home.css';
import place from '../../Api/detail';
import { Outlet} from 'react-router';
import { useLocation} from 'react-router';
import logo from '../../assets/icon/logo.jpeg';

export default function Home() {
  const user=JSON.parse(localStorage.getItem('user'));
  const json=place;
 const location = useLocation();
  return (
    
    <div>
      
       <div className="header1">
      <Link to="/dashboard">{<img src={logo} alt="" style={{height:'50px'}}/>}</Link>
      <div className='headbtn'>
      <Link to="/profile">Profile</Link>
      <Link to="/favourite">Favourite</Link>
      <Link to="/settings">Setting</Link>
      <Link>Offers</Link>
      <Link>Customer Service</Link>
      </div>
      <input type="search" style={{padding:'5 px', width:'300px'}} placeholder='Search for trips'/>
       
      <div className="auth-buttons1">
        {user && user.isLogged === "true" ? (
          <>
            <span style={{color:'black'}}>Welcome, {user.name}</span>
            <button
              onClick={() => {
                // logout button bhi ho to
                user.isLogged = "false";
                localStorage.setItem("user", JSON.stringify(user));
                window.location.reload(); // ya useNavigate() if you're using it
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button>
              <Link to={ROUTES.LOGIN.path}>Login</Link>
            </button>
            <button>
              <Link to={ROUTES.SIGNUP.path}>Signup</Link>
            </button>
            <button>
              <Link to={ROUTES.ABOUT.path}>About Us</Link>
            </button>
          </>
        )}
      </div>
    </div>
  
      <div className="sidebar1">
        <Link to="/dashboard">Filter Trips</Link>
        
        
        
      </div>

  
      <div className="main-content1">
  {location.pathname === '/' || location.pathname === '/home' || location.pathname === '/dashboard' ? (
    <>
      {json.map((value) => (
        <div className="card1" key={value.id}>
          <img className='img1' src={value.image} alt={value.name} width="200" />
          <br />
          <div style={{ padding: '10px' }}>
            <div>
              <b style={{ fontSize: '19px' }}>{value.name}</b>
              <span className='det'> {value.package.duration}</span>
            </div>
            <span className='txt'>{value.city}, {value.state}</span><br />
            <hr />
            <div>
              <ul className='pnt'>
                {value.package.inclusions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <p className='tick'>✔ {value.city} tour</p>
            <br /><br />
            <div className='price'>
              <p style={{ width: '200px' }}>This price is lower than the average price in September</p>
              <p><b style={{ fontSize: '18px' }}>{value.package.emi}</b><br /> Total Price:{value.package.totalCost}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="card1">
        <img src="src/assets/icon/image/mn.jpg" alt="Example" width="200" />
      </div>
    </>
  ) : (
    <Outlet />
  )}
</div>

    </div>
  );
}