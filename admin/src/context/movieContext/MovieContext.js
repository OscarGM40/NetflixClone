import { createContext, useReducer } from "react";
import { MovieReducer } from "./MovieReducer";
//initial-state siempre es un Object,no matter what
const INITIAL_STATE = {
   movies: [],
   isFetching: false,
   error:false
}

export const MovieContext = createContext(INITIAL_STATE);

export const MovieProvider = ( { children } ) => {
   const [ state, dispatch ]  = useReducer(MovieReducer, INITIAL_STATE);

   
   return (
      <MovieContext.Provider value={{
         movies:state.movies,
         isFetching:state.isFetching,
         error:state.error,
         dispatch
      }}>
         { children }
      </MovieContext.Provider>
   )
}