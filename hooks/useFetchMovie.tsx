import React from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { movieState } from "../atoms/modal";
import { Genre, Movie, VideoType } from "../interfaces/typings";
import { fetchMovie } from "../services/fetchMovie";

export const useFetchMovie = () => {
  const movie = useRecoilValue(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie) return;

    fetchMovie(movie as Movie).then((data) => {
      if (data?.videos) {
        const index = data.videos.results.findIndex((video: VideoType) => video.type === "Trailer");
        setTrailer(data.videos?.results[index]?.key);
      }
      
      if (data?.genres) {
        setGenres(data.genres);
      }
    });
  }, [movie]);

  return {
    trailer,
    genres,
    movie
  };
};
