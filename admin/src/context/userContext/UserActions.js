//  ojo con el objeto devuelto de las acciones que me obliga a usar ({}) como retorno.Las opciones a crear son bien claras
export const getUsersStart = () => ({
   type: "GET_USERS_START",
})

export const getUsersSuccess = (users) => ({
   type: "GET_USERS_SUCCESS",
   payload: users,
})
export const getUsersFailure = ( error ) => ({
   type: "GET_USERS_FAILURE",
   payload: error,
})

export const createUserStart = () => ({
   type: "CREATE_USER_START",
})

export const createUserSuccess = (user) => ({
   type: "CREATE_USER_SUCCESS",
   payload: user,
})
export const createUserFailure = ( error ) => ({
   type: "CREATE_USER_FAILURE",
   payload: error,
})

export const updateUserStart = () => ({
   type: "UPDATE_USER_START",
})
// es el user o la movie, no solo el id,pues un update necesita el body(ya saco luego el id de ese user)
export const updateUserSuccess = (user) => ({
   type: "UPDATE_USER_SUCCESS",
   payload: user,
})
export const updateUserFailure = ( error ) => ({
   type: "UPDATE_USER_FAILURE",
   payload: error,
})

export const deleteUserStart = () => ({
   type: "DELETE_USER_START",
})
// Fijate como debo mandar como payload el id
export const deleteUserSuccess = (id) => ({
   type: "DELETE_USER_SUCCESS",
   payload: id,
})
export const deleteUserFailure = ( error ) => ({
   type: "DELETE_USER_FAILURE",
   payload: error,
})

