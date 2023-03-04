import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { Movie } from "../interfaces/typings";
import { useRecoilValue } from "recoil";

interface Props {
  netflixOriginals: Movie[]; // otra forma es [Movie]
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}
const Home: NextPage<Props> = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}) => {
  const { loading } = useAuth();
  // recuerda que useRecoilValue sólo expone el getter
  const showModal = useRecoilValue(modalState);
  // aqui iria un loader,por tiempo lo dejamos asi

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/images/netflix-logo.svg" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal &&  <Modal /> }
    </div>
  );
};

export default Home;

// puedo tener más imports aqui si quiero realmente.El nombre de esta función esta reservado,logicamente,para que Next haga SSR.Fijate en el pattern recognition que hacemos de la app de Disney Clone al pedir de nuevo todo en paralelo y mediante SSR.Perfecto.
// Recuerda que solo puedo hacer SSR en una page
// fijate que parece que da igual donde poner los imports,si arriba o abajo,es lo primero que hará (traer todos )
import { GetServerSideProps } from "next";
import requests from "../utils/request";
import { modalState } from "../atoms/modal";
import Modal from "../components/Modal";
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
