import { Visibility } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./widgetSm.css";
import { AuthContext } from "../../context/authContext/AuthContext";

const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([]);
  const { token } = useContext(AuthContext);
  
  useEffect(() => {
    // const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
    const getNewUsers = async (req, res) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users?new=true`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        //  console.log(res.data)
        setNewUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, [token]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.profilePic || "images/defaultprofile.jpg"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
