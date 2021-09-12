import { createContext, useReducer } from "react";
import { UserReducer } from "./UserReducer";
//initial-state siempre es un Object,no matter what
const INITIAL_STATE = {
   users: [],
   isFetching: false,
   error:false
}

export const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ( { children } ) => {
   const [ state, dispatch ]  = useReducer(UserReducer, INITIAL_STATE);

   
   return (
      <UserContext.Provider value={{
         users:state.users,
         isFetching:state.isFetching,
         error:state.error,
         dispatch
      }}>
         { children }
      </UserContext.Provider>
   )
}