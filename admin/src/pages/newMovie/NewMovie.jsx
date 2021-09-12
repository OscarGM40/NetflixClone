import { useContext, useState } from "react";
import "./newMovie.css";
import storage from "./../../firebase.js";
import { createMovieCall } from "../../context/movieContext/MovieApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

const NewMovie = () => {
  const { dispatch } = useContext(MovieContext);

  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [ genre,setGenre  ] = useState(null);
  // este estado ↓↓ muestra cuantos archivos he subido.Deberian de ser 5.
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (event) => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value,
    });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% completed.`);
        },
        (err) => console.log(err),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => ({ ...prev, [item.label]: url }));
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (event) => {
    event.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    movie.genre=genre;
    createMovieCall(movie, dispatch);
  };

  console.log(movie);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
{/*           <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          /> */}
             <select name="genre" id="genre" 
               onChange={e=>setGenre(e.target.value)}>
                  <option>Genre</option>
                  <option value="adventure">Adventure</option>
                  <option value="comedy">Comedy</option>
                  <option value="crime">Crime</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="historical">Historical</option>
                  <option value="horror">Horror</option>
                  <option value="romance">Romance</option>
                  <option value="sci-fi">Sci-fi</option>
                  <option value="thriller">Thriller</option>
                  <option value="western">Western</option>
                  <option value="animation">Animation</option>
                  <option value="drama">Drama</option>
                  <option value="documentary">Documentary</option>
               </select> 
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Is series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default NewMovie;
