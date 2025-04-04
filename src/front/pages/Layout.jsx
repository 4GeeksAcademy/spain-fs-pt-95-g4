import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import CustomNavbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import logo from "../assets/img/logo.png";

export const Layout = () => {
  return (
    <ScrollToTop>
      <CustomNavbar />
      
      <div className="full-width-logo-container">
        <img 
          src={logo} 
          alt="Logo principal" 
          className="full-width-logo" 
        />
      </div>
            
      <Outlet />

      <Footer />
    </ScrollToTop>
  );
};

