import { useContext, useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';

import './home.scss';
import { AuthContext } from '../../authContext/AuthContext';

const Home = ( { type } ) => {

   const { token } = useContext(AuthContext);
   
   const [ lists, setLists ] = useState([]);
   const [ genre,setGenre  ] = useState(null);


   useEffect(() => {
      const getRandomList = async () => {
         try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists${type ? "?type="+type : ""}${genre ? "&genre="+genre : ""}`,{
               headers: { 'authorization': `Bearer ${token}`}
            });
            //  console.log(res.data)
            // genre type content(ids[]) y timestamps
            setLists(res.data);
         } catch (error) {
            console.log(error.response.data)
         }
      }
      getRandomList();
   }, [type,genre,token])
  
   // console.log(genre)
   
   return (
      <div className="home">
         <Navbar />
         <Featured type={type} setGenre={setGenre} />
         {/* no es lo mismo list={list} que {...list} */}
         { lists.map(list =>  <List key={list._id} list={list}/>  )}
       
      </div>
   )
}

export default Home
