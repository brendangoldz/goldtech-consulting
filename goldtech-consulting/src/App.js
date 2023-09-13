import logo from './logo.svg';
import Navbar from './components/nav/Navbar';  // Assuming you have Navbar.js in a folder named components
import ScrollToTop from "./components/scrolltop/ScrollToTop";
import AboutSection from './components/about/AboutSection';
import ServicesSection from './components/services/Services';
import ContactSection from './components/contact/ContactSection';
import './App.css';
import './index.css';
const scrollTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};
function App() {
  return (
    <div className="App" id="home">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="intro-section text-center inline-flex flex-col justify-center items-center p-1">
        <h1 className="title-text"><span id="gold">Gold</span>Tech Consulting</h1>
        <p className="slogan-text mb-8">
          Your go-to for software solutions, from personal projects to enterprise applications.
        </p>
        <div className="nav-links">
          <div className="space-x-8 mt-10">
          <button onClick={() => scrollTo("about")}>About</button>
          <span>|</span>
          <button onClick={() => scrollTo("services")}>Services</button>
          <span>|</span>
          <button onClick={() => scrollTo("contact")}>Contact</button>
          </div>
        </div>
        </div>
      </div>
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <div className="component text-center inline-flex flex-col justify-center items-center">
          <AboutSection />
          <Navbar />
        </div>
      </div>
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <div className="component text-center inline-flex flex-col justify-center items-center">
          <ServicesSection />
          <Navbar />
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center">
      <div className="component text-center inline-flex flex-col justify-center items-center">
          <ContactSection />
          <Navbar />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}


export default App;
