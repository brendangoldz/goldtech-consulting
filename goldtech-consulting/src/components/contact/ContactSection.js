import './ContactSection.css'
import Navigation from '../nav/Navbar';  // Assuming you have Navbar.js in a folder named components

function ContactSection({ scrollTo }) {
    return (
      <div className="contact-container h-screen flex flex-col justify-center items-center">
        <Navigation scrollTo={scrollTo}/>
        <section id="contact">
          <div className="contact-section">
            <h2>Contact Form</h2>
            <form></form>
          </div>
        </section>
      </div>
    );
  }
  
  export default ContactSection;
  