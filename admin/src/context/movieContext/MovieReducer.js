// fijate que aqui movies será un empty array [] y no null.Es importnte esto por los errores que daría si fuera null.
 
 export const MovieReducer = ( state,action ) => {
    switch (action.type) {
       case "GET_MOVIES_START":
          return {
             movies: [],
             isFetching:true,
             error:false,
          }
       case "GET_MOVIES_SUCCESS":
          return {
             movies: action.payload,
             isFetching:false,
             error:false,
          }
       case "GET_MOVIES_FAILURE":
          return {
             movies: [],
             isFetching:false,
             error:action.payload,
          }
       case "CREATE_MOVIE_START":
          return {
               ...state,
               isFetching:true,
               error:false,
            }
       case "CREATE_MOVIE_SUCCESS":
          return {
             movies:[ ...state.movies, action.payload ],
             isFetching:false,
             error:false,
          }
       case "CREATE_MOVIE_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
       case "UPDATE_MOVIE_START":
          return {
               ...state,
               isFetching:true,
               error:false,
            }
       case "UPDATE_MOVIE_SUCCESS":
          return {
             movies:state.movies.map( movie => movie._id === action.payload._id && action.payload),
             isFetching:false,
             error:false,
          }
       case "UPDATE_MOVIE_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
       case "DELETE_MOVIE_START":
         //  importantisimo devolver el ...state pues no quiero cambiarlo y debo devolverlo como estaba,sino me cargo todo
          return {
             ...state,
             isFetching:true,
             error:false,
          }
       case "DELETE_MOVIE_SUCCESS":
          return {
             //recuerda que será el id aqui el payload
             movies: state.movies.filter( (movie) => movie._id !== action.payload),
             isFetching:false,
             error:false,
          }
       case "DELETE_MOVIE_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
    
       default:
          return { ...state }
    }
 }