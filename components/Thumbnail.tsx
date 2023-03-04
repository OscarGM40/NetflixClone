import Image from "next/image";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modal";
import { BASE_CARDS_URL } from "../constants/movie";
import { Movie } from "../interfaces/typings";

interface Props {
  // movie: Movie | DocumentData; Firebase usará el type DocumentData y no Movie
  movie: Movie;
}
const Thumbnail = ({ movie }: Props) => {
    const setShowModal = useSetRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
    >
      <Image
        src={`${BASE_CARDS_URL}${movie.backdrop_path || movie.poster_path}`}
        alt={"anything"}
        fill
        onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true)
        }}
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
};
export default Thumbnail;
