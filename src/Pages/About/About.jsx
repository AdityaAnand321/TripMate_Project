import './About.css'
import abt from '../../assets/icon/abt.jpg';
import { ImGift } from 'react-icons/im';

export default function About(){
  return (
    <section className="container">
    
      <div className="image-box">
        <img src= {abt}/>
       
      </div>
 
      <div className="text-box">
        <h4>Why Choose Us</h4>
        <h1>
          Our Experiences <br /> Meet High Quality <br /> Standards
        </h1>
        <p>
          Holisticly optimize proactive strategic theme areas rather than
          effective manufactured products create.
        </p>
      </div>
    </section>
  );
};