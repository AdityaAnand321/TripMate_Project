import './About.css'
import abt from '../../assets/icon/abt.jpg';
import { ImGift } from 'react-icons/im';
import taj from '../../assets/taj.jpg';
import trav from '../../assets/trav.jpeg';
import trav2 from '../../assets/trav2.jpeg';
import { FaQuoteRight } from "react-icons/fa";

import { FaMoneyBillWave, FaMapMarkedAlt, FaRegHandPeace, FaUserTie, FaRegClock } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";

export default function About(){

   const stats = [
    { value: "120+", label: "Total Destination" },
    { value: "500+", label: "Travel Packages" },
    { value: "10K+", label: "Total Travelers" },
    { value: "7K+", label: "Positive Reviews" },
  ];

   
  const features = [
    {
      icon: <FaMoneyBillWave size={36} />,
      title: "High Quality Travel Packages",
      desc: "Credibly target visionary portals rather than prospective human capital."
    },
    {
      icon: <FaMapMarkedAlt size={36} />,
      title: "Best Travel Plan",
      desc: "Credibly target visionary portals rather than prospective human capital."
    },
    {
      icon: <MdOutlineLibraryBooks size={36} />,
      title: "Easy & Quick Booking",
      desc: "Credibly target visionary portals rather than prospective human capital."
    },
    {
      icon: <FaRegHandPeace size={36} />,
      title: "Hand-picked Tour",
      desc: "Credibly target visionary portals rather than prospective human capital."
    },
    
  ];

  return (
    <div>     <div className='abt-cont'>
      <div className='img-cont'>
      <img src={taj} alt="" height='330px' className='img-cont'/>
      </div>

      <div className="why-choose-us">
            <h4 className="sub-heading">Why Choose Us</h4>
            <h2 className="main-heading">
              Our Experiences <br /> Meet High Quality <br /> Standards
            </h2>
            <p className="description">
              Holistically optimize proactive strategic theme areas rather than
              effective manufactured products create.
            </p>.
      </div>
     </div>

      <section className="stats-section">
      {stats.map((stat, index) => (
        <div key={index} className="stat-box">
          <h3 className="stat-value">{stat.value}</h3>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </section>

 <section className="features-grid">
      {features.map((feature, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-desc">{feature.desc}</p>
        </div>
      ))}
    </section>

    <div className='testi'>

        <div>
            <img src={trav} alt="" height='300px' className='img-cont'/>
        </div>
        <div>
               <section className="testimonial">
      <p className="section-subtitle">Testimonials</p>
      <h2 className="section-title">What Travelers Say</h2>

      <FaQuoteRight className="quote-icon" />

      <p className="testimonial-text">
        The UI designs he crafted are top-notch, and the design system he
        integrated allows for straightforward fixes and bulk updates almost
        every area the app.
      </p>

      <p className="testimonial-author">
        – By Molie Rosa, <span>Photographer</span>
      </p>
    </section>
        </div>
      </div>

      <div className='testi'>
        <div>
          <img src={trav2} alt="" height='300px' className='img-cont1'/>
        </div>
        <div>
              <section className="testimonial">
      <p className="section-subtitle">Testimonials</p>
      <h2 className="section-title">What Travelers Say</h2>

      <FaQuoteRight className="quote-icon" />

      <p className="testimonial-text">
        The UI designs he crafted are top-notch, and the design system he
        integrated allows for straightforward fixes and bulk updates almost
        every area the app.
      </p>

      <p className="testimonial-author">
        – By Molie Rosa, <span>Photographer</span>
      </p>
    </section>
        </div>
    </div>



     </div>

  );
};