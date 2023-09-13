import './Services.css'
import Navigation from '../nav/Navbar';  // Assuming you have Navbar.js in a folder named components

function ServicesSection({ scrollTo }) {
    return (
      <div className="service-container h-screen flex flex-col justify-center items-center">
        <Navigation scrollTo={scrollTo}/>
        <section id="services">
          <div className="services-section">
          <h2>Services</h2>
          <p>
            Service 1
          </p>
          <p>
            Service 2
          </p>
          <p>
            Service 3
          </p>
          </div>
        </section>
      </div>
    );
  }
  
  export default ServicesSection;
  