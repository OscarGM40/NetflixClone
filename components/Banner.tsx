import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/movie";
import { Movie } from "../interfaces/typings";
import { FaPlay } from "react-icons/fa"; //de font-awesome
import { InformationCircleIcon } from "@heroicons/react/solid";

interface Props {
  netflixOriginals: Movie[];
}
const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      {/* hay dos opciones para establecer una imagen de Next bien.O bien le doy a Image un ancho y alto o se lo doy al padre y pongo a la Image en layout="fill",pero alguno tiene que tener la altura y ancho.Aparte hay que pasarle el object-fit */}
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
          alt={"banner-image"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          More Info
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};
export default Banner;
