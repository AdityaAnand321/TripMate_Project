import { useParams } from 'react-router';
import place from '../../Api/detail';
import './Details.css';
export default function Details() {
  const { id } = useParams();
  const json=place;
  const dest = json.find(place => place.id === id);

   
  return (
    <div>
     <h1>{dest.name},{dest.state}</h1> 
     <p>{dest.package.duration}</p>
    <img src={dest.image} alt={dest.name} />

  
    <div className="payment-card">
      {/* Price Section */}
      <div className="price-section">
        <div className="original-price">{dest.package.totalCost} <span className="discount">5% OFF</span></div>
        <div className="final-price">₹8,934<span className="per-adult">/Adult</span></div>
        <div className="tax-note">Excluding applicable taxes</div>
      </div>

      {/* Button */}
      <button className="payment-button">PROCEED TO PAYMENT</button>

      {/* Coupons & Offers */}
      <div className="offers-section">
        <h3>Coupons & Offers</h3>

        {/* EMI Offer */}
        <div className="emi-offer">
          <span className="emi-icon">💳</span>
          <div>
            <p className="emi-title">No cost EMI @ ₹2,978</p>
            <p className="emi-subtitle">Book your holidays with Easy <a href="#">EMI options</a>.</p>
          </div>
        </div>

        {/* Coupon input */}
        <div className="coupon-input">
          <p>Have a Coupon Code?</p>
          <button className="enter-code">Enter Code</button>
        </div>

        {/* Applied Coupon */}
        <div className="applied-coupon">
          <div>
            <p className="coupon-title">🎉 SALESPECIAL <span className="coupon-discount">- ₹448</span></p>
            <p className="coupon-subtitle">Coupon Applied Successfully!</p>
          </div>
          <button className="remove-btn">REMOVE</button>
        </div>
      </div>
    </div>
    </div>
    // <div style={{ padding: '20px' }}>
    //   <h1>{data.name}</h1>
    //   <img src={data.image} alt={data.name} width="300" />
    //   <p><b>City:</b> {data.city}</p>
    //   <p><b>State:</b> {data.state}</p>
    //   <p><b>Duration:</b> {data.package.duration}</p>
    //   <p><b>Inclusions:</b></p>
    //   <ul>
    //     {data.package.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
    //   </ul>
    //   <p><b>EMI:</b> {data.package.emi}</p>
    //   <p><b>Total Cost:</b> {data.package.totalCost}</p>
    // </div>
  );
}
