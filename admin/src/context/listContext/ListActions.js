//  ojo con el objeto devuelto de las acciones que me obliga a usar ({}) como retorno.Las opciones a crear son bien claras
export const getListsStart = () => ({
   type: "GET_LISTS_START",
})

export const getListsSuccess = (lists) => ({
   type: "GET_LISTS_SUCCESS",
   payload: lists,
})
export const getListsFailure = ( error ) => ({
   type: "GET_LISTS_FAILURE",
   payload: error,
})

export const createListsStart = () => ({
   type: "CREATE_LISTS_START",
})

export const createListsSuccess = (lists) => ({
   type: "CREATE_LISTS_SUCCESS",
   payload: lists,
})
export const createListsFailure = ( error ) => ({
   type: "CREATE_LISTS_FAILURE",
   payload: error,
})

export const updateListsStart = () => ({
   type: "UPDATE_LISTS_START",
})

export const updateListsSuccess = (lists) => ({
   type: "UPDATE_LISTS_SUCCESS",
   payload: lists,
})
export const updateListsFailure = ( error ) => ({
   type: "UPDATE_LISTS_FAILURE",
   payload: error,
})

export const deleteListsStart = () => ({
   type: "DELETE_LISTS_START",
})
// Fijate como debo mandar como payload el id
export const deleteListsSuccess = (id) => ({
   type: "DELETE_LISTS_SUCCESS",
   payload: id,
})
export const deleteListsFailure = ( error ) => ({
   type: "DELETE_LISTS_FAILURE",
   payload: error,
})

