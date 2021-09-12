import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import "./navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const {dispatch} = useContext(AuthContext);

  //onscroll se dispará en cuanto se hace scroll
  //fijate en el acceso tan tremendo que tengo al objeto window en React
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="/images/Netflixlogo.png"
            alt=""
          />
          <Link to="/" className="link">
          <span>Homepage</span>
          </Link>

          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="/images/pexels01.jpeg"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={ () => dispatch(logout()) }>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
