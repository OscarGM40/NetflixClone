import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  BarChart,
  IsoTwoTone,
  PlayCircleOutline,
  Settings,
  List,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";

const Sidebar = () => {

  const { dispatch } = useContext(AuthContext);
  
  const handleLogout = () => {
    dispatch( {type: "LOGOUT"})
  }
  
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      {/*  primer sidebarmenu*/}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/login" className="link">
            <li className="sidebarListItem" onClick={handleLogout}>
              <Settings className="sidebarIcon" />
              Logout
            </li>
            </Link>
          </ul>
        </div>
        {/*  fin del primer sidebarmenu*/}

        {/*  segundo sidebarmenu*/}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Users</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem ">
                <PermIdentity className="sidebarIcon" />
                List all Users
              </li>
            </Link>
            <Link to="/newUser" className="link">
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Create User
            </li>
            </Link>

            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <IsoTwoTone className="sidebarIcon" />
                List all Movies
              </li>
            </Link>
            <Link to="/newMovie" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Create a Movie
              </li>
            </Link>
          </ul>
        </div>
       {/* fin del  segundo sidebarmenu*/}

       {/*  tercer sidebarmenu*/}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">List of movies</h3>
          <ul className="sidebarList">
            <Link to="/lists" className="link">
            <li className="sidebarListItem">
              <List className="sidebarIcon" />
              Lists all List of Movies
            </li>
            </Link>
            <Link to="/newList" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Create a List Of Movies
            </li>
            </Link>
            
            
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
