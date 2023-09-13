import './AboutSection.css';
import CustomNavbar from '../nav/Navbar';  // Assuming you have Navbar.js in a folder named components

function AboutSection() {
    return (
      <div id="about" className="h-screen flex flex-col justify-center items-center">
        {/* <CustomNavbar /> */}
        <div className="about-section flex flex-col justify-center items-center">
        <h2>About Me</h2>

        <p>
          Hi, I'm Brendan—a seasoned Software Engineer with a Bachelor's degree in Computer Science from Monmouth University. Currently, I'm with Lockheed Martin, where I specialize in developing cutting-edge technological solutions.
        </p>
        <p>
          My toolkit includes an array of languages and frameworks, making me versatile in both front-end and back-end development. I thrive on tackling complex problems, delivering optimized and scalable software solutions.
        </p>
        <p>
          Looking ahead, I'm focused on transitioning into a leadership role. I aspire to not only deepen my technical expertise but also manage high-impact projects and teams. My long-term vision includes owning patents and running my own tech company.
        </p>
          <a href="#projects" className="cta-button">
          See My Projects
        </a>
        </div>
      </div>
    );
  }
  
  export default AboutSection;
  