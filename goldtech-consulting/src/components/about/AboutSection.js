import './AboutSection.css';
import Navigation from '../nav/Navbar';  // Assuming you have Navbar.js in a folder named components

function AboutSection({ scrollTo }) {
    return (
      <div className="about-container h-screen flex flex-col justify-center items-center">
        <Navigation scrollTo={scrollTo}/>
        <h2>About Us</h2>
        <section id="about">
          <div className="about-section">
            <p>
              At GoldTech Consulting LLC, we harness the power of technology to drive business transformation. In this digital age, we stand as your trusted ally, guiding you through tech's complexities.
            </p>
            <p>
              Our expertise spans programming, bespoke software solutions, IoT innovations, and effective project management. We're not just service providers; we're your partners in success, committed to crafting solutions that set you apart.
            </p>
            <p>
              In an ever-evolving tech landscape, GoldTech Consulting leads the curve, ready to embark on a transformative journey with you.
            </p>
              <a href="#projects" className="cta-button">
              See Our Projects
            </a>
          </div>
        </section>
      </div>
    );
  }
  
  export default AboutSection;
