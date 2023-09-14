import './Services.css';
import Navigation from '../nav/Navbar';

function ServicesSection({ scrollTo }) {
    return (
      <div className="service-container h-screen flex flex-col justify-center items-center">
        <Navigation scrollTo={scrollTo} />
        
        <h2>Our Services</h2>
        <section id="services">
          <div className="services-section">
            
            
            <section className="individual-service">
              <h3>Custom Software Development</h3>
              <p>
                From innovative startups to large enterprises, our unmatched expertise helps in building 
                tailor-made, scalable, and robust software solutions. Dive into digital transformation 
                with our top-tier software development services.
              </p>
            </section>
            
            <section className="individual-service">
              <h3>Tech Consultation & Strategy</h3>
              <p>
                Got a challenge? We’ve got solutions. Let's talk about technology-driven strategies to 
                give your business a competitive edge in the market. Bring us your complex problems, 
                and we'll provide clear, actionable advice.
              </p>
            </section>

            <section className="individual-service">
              <h3>System Integration & Optimization</h3>
              <p>
                As the tech landscape evolves, ensuring seamless interoperability becomes paramount. We 
                ensure your systems talk to each other, paving the way for smarter business decisions 
                and streamlined operations.
              </p>
            </section>
          </div>
        </section>
      </div>
    );
}

export default ServicesSection;
