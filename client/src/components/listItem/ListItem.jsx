import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./listItem.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

const ListItem = ({ index, item }) => {

  const { token } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  // TODO poner imagenes y trailers por defecto

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/find/${item}`,
          {
            headers: {
              authorization: `Bearer ${token}`
            },
          }
        );
        setMovie(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getMovie();
  }, [item,token]);

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie.img}
          alt=""
        />
        {isHovered && (
          <>
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <video src={movie.trailer} autoPlay={true} loop />

              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
