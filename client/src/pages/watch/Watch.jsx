import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

const Watch = () => {

  const location = useLocation();
  // console.log(location)
  
  return (
    <div className="watch">
      <Link to="/">

      <div className="backArrow">
        <ArrowBackOutlined />
        <span className="backText">Volver</span>
      </div>
      </Link>
      <video
        src={location.movie?.video}
        className="video"
        type="video/mp4"
        autoPlay={true}
        progress="true"
        controls
      ></video>
    </div>
  );
};

export default Watch;
