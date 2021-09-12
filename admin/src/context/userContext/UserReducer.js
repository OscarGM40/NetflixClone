// fijate que aqui movies será un empty array [] y no null.Es importnte esto por los errores que daría si fuera null.
 
 export const UserReducer = ( state,action ) => {
    switch (action.type) {
       case "GET_USERS_START":
          return {
             users: [],
             isFetching:true,
             error:false,
          }
       case "GET_USERS_SUCCESS":
          return {
             users: action.payload,
             isFetching:false,
             error:false,
          }
       case "GET_USERS_FAILURE":
          return {
             movies: [],
             isFetching:false,
             error:action.payload,
          }
         //  create
       case "CREATE_USER_START":
          return {
               ...state,
               isFetching:true,
               error:false,
            }
       case "CREATE_USER_SUCCESS":
          return {
             users:[ ...state.users, action.payload ],
             isFetching:false,
             error:false,
          }
       case "CREATE_USER_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
       case "UPDATE_USER_START":
          return {
               ...state,
               isFetching:true,
               error:false,
            }
       case "UPDATE_USER_SUCCESS":
          return {
             users:state.users.map( user => user._id === action.payload._id && action.payload),
             isFetching:false,
             error:false,
          }
       case "UPDATE_USER_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
       case "DELETE_USER_START":
         //  importantisimo devolver el ...state pues no quiero cambiarlo y debo devolverlo como estaba,sino me cargo todo
          return {
             ...state,
             isFetching:true,
             error:false,
          }
       case "DELETE_USER_SUCCESS":
          return {
             //recuerda que será el id aqui el payload
             users: state.users.filter( (user) => user._id !== action.payload),
             isFetching:false,
             error:false,
          }
       case "DELETE_USER_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
    
       default:
          return { ...state }
    }
 }