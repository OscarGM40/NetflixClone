import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modal";
import { useFetchMovie } from "../hooks/useFetchMovie";
import ReactPlayer from "react-player/lazy";
import { useState } from "react";
import { YT_BASE_URL } from "../constants/movie";
import { FaPlay } from "react-icons/fa";
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/outline";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [muted, setMuted] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const { genres, trailer, movie } = useFetchMovie();

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-10 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide "
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-4 top-[15px] !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        {/* el padding-top es de la docu de la lib(siempre es 56.25%) */}
        <div className="relative pt-[56.25%]">
          {trailer && (
            // <ReactPlayer es un responsive <video>
            <ReactPlayer
              url={`${YT_BASE_URL}${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
          )}
          <div className="absolute bottom-5 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6] ">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? <VolumeOffIcon className="h-7 w-7" /> : <VolumeUpIcon className="h-7 w-7" />}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400 ">
                {movie?.vote_average}
                {`% Match`}
              </p>
              <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div className="mt-1">
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original language:&nbsp; </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes:&nbsp; </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};
export default Modal;
