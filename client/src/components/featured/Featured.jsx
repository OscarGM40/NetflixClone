import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../../authContext/AuthContext';
import './featured.scss';

const Featured = ( { type,setGenre } ) => {

 const { token } = useContext(AuthContext)
 
 const [ content,setContent ] = useState({});

 useEffect(() => {
    const getRandomContent = async () => {
       try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies/random?type=${type}`,{
            headers:{'authorization':`Bearer ${token}`}
         }) 
         setContent(res.data[0]);
       } catch (error) {
         console.log(error.response.data) 
       }
    }
    getRandomContent();
 },[type, token])
 
 
   return (
      <div className="featured">
         { type && (
            <div className="category">
               <span>{type === "movie"? "Movies" : "Series" }</span>
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
         )}
         
         <img 
           src={content.img}
           alt="" />

         <div className="info">
            <img 
            className="imgB"
            src={content.imgTitle} alt="" />

            <span className="desc">{content.desc}</span>

            <div className="buttons">
               <button className="play">
                 <PlayArrow />
                 <span>Play</span>
               </button>
               <button className="more">
                 <InfoOutlined />
                 <span>Info</span>
               </button>
           </div>
         </div>
      </div>
   )
}

export default Featured
