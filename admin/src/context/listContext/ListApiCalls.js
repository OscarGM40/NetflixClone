import axios from "axios";
import { createListsFailure, createListsStart, createListsSuccess, deleteListsFailure, deleteListsStart, deleteListsSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListActions";



export const getListsCall = async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(getListsStart());
  try {
    const lists = await axios.get(`${process.env.REACT_APP_API_URL}/lists`, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(getListsSuccess(lists.data));
  } catch (error) {
    dispatch(getListsFailure(error.response.data));
  }
};

export const deleteListsCall = async (listID,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(deleteListsStart());
  try {
    const resp = await axios.delete(`${process.env.REACT_APP_API_URL}/lists/${listID}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(resp.data)
    dispatch(deleteListsSuccess(listID));
  } catch (error) {
    dispatch(deleteListsFailure(error.response.data));
  }
};

 
export const createListsCall = async (list,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(createListsStart());
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/lists`,list,{
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(createListsSuccess(res.data));
  } catch (error) {
    dispatch(createListsFailure(error.response.data));
  }
};
/*
export const updateMovieCall = async (movie,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/movies/${movie._id} `, movie,{
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (error) {
    dispatch(updateMovieFailure(error.response.data));
  }
};
 */