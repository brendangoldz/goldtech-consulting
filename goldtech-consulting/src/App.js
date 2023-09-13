import logo from './logo.svg';
import CustomNavbar from './components/nav/Navbar';  // Assuming you have Navbar.js in a folder named components
import ScrollToTop from "./components/scrolltop/ScrollToTop";
import AboutSection from './components/about/AboutSection';
import ServicesSection from './components/services/Services';
import ContactSection from './components/contact/ContactSection';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const scrollTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};
function App() {
  return (
    <div className="App" id="home"  data-spy="scroll" data-target=".nav-links" data-offset="50">
      <div class="snap-container">
      <section class="snap-child">
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="intro-section text-center inline-flex flex-col justify-center items-center p-1">
          <h1 className="title-text"><span id="gold">Gold</span>Tech Consulting</h1>
          <p className="slogan-text mb-8">
          From Cloud Solutions to QA: Your All-in-One Software Consultancy 
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
        </section>
        <section class="snap-child">
        <div className="text-center h-screen flex flex-col justify-center items-center">
          <div className="component text-center inline-flex flex-col justify-center items-center">
              <AboutSection scrollTo={scrollTo} />
          </div>
        </div>
        </section>   
        <section class="snap-child">
        <div className="text-center h-screen flex flex-col justify-center items-center">
          <div className="component text-center inline-flex flex-col justify-center items-center">
            <ServicesSection scrollTo={scrollTo} />

          </div>
        </div>
        </section>
        <section class="snap-child">
        <div className="h-screen flex flex-col justify-center items-center">
        <div className="component text-center inline-flex flex-col justify-center items-center">
            <ContactSection scrollTo={scrollTo} />
          </div>
        </div>
        </section>
        <ScrollToTop />
      </div>
      
    </div>
  );
}


export default App;
