import { MOVIE_FETCH_URL } from "../constants/movie";
import { Movie } from "../interfaces/typings";

// it can either be a movie or a tv series
// el queryParam 'append_to_response' solo funciona fetcheando una única Movie(agrega varios videos a la petición y de todos ellos usaremos el trailer)
export async function fetchMovie(movie: Movie) {
  return await fetch(
    `${MOVIE_FETCH_URL}${movie?.media_type === "tv" ? "tv" : "movie"}/${movie?.id}?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=en-US&append_to_response=videos`,
  ).then((response) => response.json());
}
