import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from './AuthActions';

// las userCredentials son el Object    {email,password}
//necesito el dispatch porque lo voy a usar tres veces aqui,si no lo paso por argumento dificil poder usarlo.Esto implica que al llamar a esta apiCall tengo que llamar a const {dispatch}=useContext(AuthProvider) y pasarlo a loginCall.Es fácil,realmente,solo estoy refactorizando una funcion para que el login sea más sencillo.

export const loginCall = async (userCredentials,dispatch) => {
   dispatch(loginStart());
   try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,userCredentials);
      // console.log(res.data)
      if(!res.data.user.isAdmin){ 
         console.log("no es admin desde apiCalls")
      }
      res.data.user.isAdmin && dispatch(loginSuccess(res.data));
   } catch (error) {
      dispatch(loginFailure(error))
   }
}

export const registerCall = async (userCredentials,dispatch) => {
   dispatch(registerStart());
   try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,userCredentials);
      console.log(res.data)
      dispatch(registerSuccess(res.data));
   } catch (error) {
      dispatch(registerFailure(error))
   }
}