import './AboutSection.css';
import CustomNavbar from '../nav/Navbar';  // Assuming you have Navbar.js in a folder named components

function AboutSection() {
    return (
      <div id="about" className="h-screen flex flex-col justify-center items-center">
        {/* <CustomNavbar /> */}
        <div className="about-section flex flex-col justify-center items-center">
        <h2>About Us</h2>

        <p>
          Welcome to GoldTech Consulting LLC, where we believe in the transformative power of technology. In today's fast-paced digital era, businesses need a trusted partner to navigate the complexities of the tech landscape, and that's where we come in.
        </p>
        <p>
          Our team boasts expertise in a myriad of programming languages and specializes in crafting bespoke software solutions tailored to unique business needs. From robust backend systems to dynamic frontend interfaces, from the revolutionizing Internet of Things (IoT) solutions to effective project management and comprehensive software testing, we've got you covered. What truly sets GoldTech Consulting LLC apart is our unwavering commitment to our clients. We don't just offer services; we build partnerships. Our customer-centric approach, combined with our deep technical expertise, positions us as not just service providers, but as collaborators in your success journey.
        </p>
        <p>
          In a world where technology is constantly evolving, you need a partner who can keep pace. At GoldTech Consulting, we're not just ahead of the curve; we're defining it. Let's embark on a transformative tech journey together.
        </p>
          <a href="#projects" className="cta-button">
          See Our Projects
        </a>
        </div>
      </div>
    );
  }
  
  export default AboutSection;
