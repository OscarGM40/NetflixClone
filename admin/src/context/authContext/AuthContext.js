import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./AuthReducer";

const INITIAL_STATE = {
   user: JSON.parse(localStorage.getItem('netflixCloneUser')) || null,
   token: JSON.parse(localStorage.getItem('netflixCloneToken')) || null,
   isFetching:false,
   error:false,
}

// TODO este AuthContext es el AuthContext.Provider de abajo
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ( {children} ) => {

   const [ state, dispatch ] = useReducer( authReducer,INITIAL_STATE );

   useEffect( () => {
      localStorage.setItem('netflixCloneUser',JSON.stringify(state.user));
      localStorage.setItem('netflixCloneToken',JSON.stringify(state.token));

   },[state])    
   
return (
   // NOTA si lo hubiera llamado AnyContext tendría que usar AnyContext.Provider
    <AuthContext.Provider value={{
       user: state.user,
       token: state.token,
       isFetching: state.isFetching,
       error: state.error,
       dispatch
    }}>
      { children }
   </AuthContext.Provider>
)
}
