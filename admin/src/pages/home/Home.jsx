import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import './home.css';
import { AuthContext } from '../../context/authContext/AuthContext';


const Home = () => {
    // useMemo( () => cualquiercosa,[]) <- al pasar un array vacio como dep indico que no va a cambiar nunca(la primera vez lo memoriza y nunca más cambiará)
  const MONTHS = useMemo( () => ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],[]);
  const { token } = useContext(AuthContext);

  const [ userStats,setUserStats ] = useState([])

  useEffect(() => {
    const getStats = async (req,res) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/stats`,
        {headers:{'authorization':`Bearer ${token}`}});

        const statsList = res.data.data.sort( function (a, b) {
          return a._id - b._id;
        })

        statsList.map((item) => 
         setUserStats( (prev) => [
           ...prev,
           { name: MONTHS[item._id - 1],
            "New Users": item.total }]
            ));

      } catch (error) {
       console.log(error) 
      }
    }
    getStats();
  },[ MONTHS,token ])

   return (
      <div className="home">
         <FeaturedInfo />
         <Chart data={ userStats } title="New Users by Month(last year)" grid dataKey="New Users" /> 
         <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
         </div>
      </div>
   )
}

export default Home
