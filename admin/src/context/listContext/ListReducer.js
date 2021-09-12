// fijate que aqui movies será un empty array [] y no null.Es importnte esto por los errores que daría si fuera null.
 
 export const ListReducer = ( state,action ) => {
    switch (action.type) {
       case "GET_LISTS_START":
          return {
             lists: [],
             isFetching:true,
             error:false,
          }
       case "GET_LISTS_SUCCESS":
          return {
             lists: action.payload,
             isFetching:false,
             error:false,
          }
       case "GET_LISTS_FAILURE":
          return {
             lists: [],
             isFetching:false,
             error:action.payload,
          }
       case "CREATE_LISTS_START":
          return {
               ...state,
               isFetching:true,
               error:false,
            }
       case "CREATE_LISTS_SUCCESS":
          return {
             lists:[ ...state.lists, action.payload ],
             isFetching:false,
             error:false,
          }
       case "CREATE_LISTS_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
       case "UPDATE_LISTS_START":
          return {
               ...state,
               isFetching:true,
               error:false,
            }
       case "UPDATE_LISTS_SUCCESS":
          return {
             lists:state.lists.map( list => list._id === action.payload._id && action.payload),
             isFetching:false,
             error:false,
          }
       case "UPDATE_LISTS_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
       case "DELETE_LISTS_START":
         //  importantisimo devolver el ...state pues no quiero cambiarlo y debo devolverlo como estaba,sino me cargo todo
          return {
             ...state,
             isFetching:true,
             error:false,
          }
       case "DELETE_LISTS_SUCCESS":
          return {
             //recuerda que será el id aqui el payload
             lists: state.lists.filter( (list) => list._id !== action.payload),
             isFetching:false,
             error:false,
          }
       case "DELETE_LISTS_FAILURE":
          return {
             ...state,
             isFetching:false,
             error:action.payload,
          }
    
       default:
          return { ...state }
    }
 }