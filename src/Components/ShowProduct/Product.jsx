import React from 'react'
import './Product.css';
import { Link } from 'react-router';
import { ROUTES } from '../../Routes/Routes';
import place from '../../Api/detail';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router';
import logo from '../../assets/icon/logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from "../../redux/favouritesSlice";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const Product = ({items}) => { 
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites);
    const navigate=useNavigate();
    
  const handleLikeToggle = (e, placeData) => {
  e.stopPropagation();
  const isLiked = favourites.some((fav) => fav.id === placeData.id);
  dispatch(toggleFavourite(placeData));  
  if (isLiked) {
    toast.error("Removed from favourites");  
  } else {
    toast.success("Added to favourites");  
  }
};

    
  return (
    <div className='main-content1'>
       {items.map((value) => {
        const isLiked = favourites.some((fav) => fav.id === value.id);
              return (
                <div
                  className="card1"
                  key={value.id}
                  onClick={() => navigate(`/details/${value.id}`)}
                >
                  <div className="fav-icon">
                    <FontAwesomeIcon
                      icon={isLiked ? solidHeart : regularHeart}
                      style={{ color: isLiked ? "red" : "gray", cursor: "pointer" }}
                      onClick={(e) => handleLikeToggle(e, value)}
                    />
                  </div>

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
                      <p>
                        <b style={{ fontSize: '18px' }}>{value.package.emi}</b><br />
                        Total Price: {value.package.totalCost}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
    </div>
  )
}
export default Product


