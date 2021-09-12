//  ojo con el objeto devuelto de las acciones que me obliga a usar ({}) como retorno.Las opciones a crear son bien claras
export const getMoviesStart = () => ({
   type: "GET_MOVIES_START",
})

export const getMoviesSuccess = (movies) => ({
   type: "GET_MOVIES_SUCCESS",
   payload: movies,
})
export const getMoviesFailure = ( error ) => ({
   type: "GET_MOVIES_FAILURE",
   payload: error,
})

export const createMovieStart = () => ({
   type: "CREATE_MOVIE_START",
})

export const createMovieSuccess = (movie) => ({
   type: "CREATE_MOVIE_SUCCESS",
   payload: movie,
})
export const createMovieFailure = ( error ) => ({
   type: "CREATE_MOVIE_FAILURE",
   payload: error,
})

export const updateMovieStart = () => ({
   type: "UPDATE_MOVIE_START",
})

export const updateMovieSuccess = (movie) => ({
   type: "UPDATE_MOVIE_SUCCESS",
   payload: movie,
})
export const updateMovieFailure = ( error ) => ({
   type: "UPDATE_MOVIE_FAILURE",
   payload: error,
})

export const deleteMovieStart = () => ({
   type: "DELETE_MOVIE_START",
})
// Fijate como debo mandar como payload el id
export const deleteMovieSuccess = (id) => ({
   type: "DELETE_MOVIE_SUCCESS",
   payload: id,
})
export const deleteMovieFailure = ( error ) => ({
   type: "DELETE_MOVIE_FAILURE",
   payload: error,
})

