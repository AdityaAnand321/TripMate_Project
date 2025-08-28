import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './Favourite.css'
 import Product from '../../Components/ShowProduct/Product';


export default function Favourite() {
  const favourites = useSelector((state) => state.favourites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (favourites.length === 0) {
    return <h2 className="favh" style={{ textAlign: "center" }}>No favourites yet ❤️</h2>;
  }

  const handleLikeToggle = (e, placeData) => {
    e.stopPropagation();
    dispatch(toggleFavourite(placeData));
    toast.error("Removed From Favourites");
  };

  return (
    <div >
       <Product items={favourites}/>
    </div>
  );
}
