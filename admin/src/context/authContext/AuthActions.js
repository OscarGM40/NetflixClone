export const loginStart = () => ({
   type:"LOGIN_START",
});
// hay que decir que es lo que devuelve,siempre lo tomará como argumento la Action
export const loginSuccess = (user) => ({
   type:"LOGIN_SUCCESS",
   payload: user,
});
// no mandamos el error como payload por que es una app simple de muestra
export const loginFailure = () => ({
   type:"LOGIN_FAILURE",
});
// no mandamos el error como payload por que es una app simple de muestra
export const logout = () => ({
   type:"LOGOUT",
});
