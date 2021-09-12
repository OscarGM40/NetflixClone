import axios from "axios";
import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieFailure,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
} from "./MovieActions";



export const getMoviesCall = async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(getMoviesStart());
  try {
    const movies = await axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(getMoviesSuccess(movies.data));
  } catch (error) {
    dispatch(getMoviesFailure(error.response.data));
  }
};

export const deleteMoviesCall = async (movieID,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(deleteMovieStart());
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/movies/${movieID}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(deleteMovieSuccess(movieID));
  } catch (error) {
    dispatch(deleteMovieFailure(error.response.data));
  }
};

export const createMovieCall = async (movie,dispatch) => {
  const token = JSON.parse(localStorage.getItem("netflixCloneToken"));
  dispatch(createMovieStart());
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/movies`,movie,{
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailure(error.response.data));
  }
};

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
