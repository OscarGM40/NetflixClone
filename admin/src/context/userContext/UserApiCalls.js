import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../authContext/AuthContext";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./UserActions";



export const getUsersCall = async (dispatch) => {
  // const { token } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(getUsersStart());
  try {
    const users = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(getUsersSuccess(users.data.users));
  } catch (error) {
    dispatch(getUsersFailure(error.response.data));
  }
};

export const deleteUserCall = async (userID,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(deleteUserStart());
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userID}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(deleteUserSuccess(userID));
  } catch (error) {
    dispatch(deleteUserFailure(error.response.data));
  }
};

export const createUserCall = async (user,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(createUserStart());
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,user,{
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(createUserSuccess(res.data.user));
  } catch (error) {
    dispatch(createUserFailure(error.response.data));
  }
};

export const updateUserCall = async (user,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id} `,user,{
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(updateUserSuccess(res.data.user));
  } catch (error) {
    dispatch(updateUserFailure(error.response.data));
  }
};
