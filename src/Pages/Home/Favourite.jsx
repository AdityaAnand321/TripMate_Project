import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

export default function Favourite() {
  const favourites = useSelector((state) => state.favourites);
  const navigate = useNavigate();

  if (favourites.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No favourites yet ❤️</h2>;
  }

  return (
    <div className="main-content1">
      {favourites.map((value) => (
        <div
          className="card1"
          key={value.id}
          onClick={() => navigate(`/details/${value.id}`)}
        >
          <div className="fav-icon">
            <FontAwesomeIcon icon={solidHeart} style={{ color: "red" }} />
          </div>
          <img className="img1" src={value.image} alt={value.name} width="200" />
          <h3>{value.name}</h3>
          <p>{value.description}</p>
        </div>
      ))}
    </div>
  );
}
