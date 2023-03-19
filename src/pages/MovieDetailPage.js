import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, urlAPI } from "../components/config";
import MovieCard from "../components/movie/MovieCard";

function MovieDetailPage() {
  const { movieID } = useParams();
  const { data } = useSWR(urlAPI.getMovieDetail(movieID), fetcher);
  const detailMovie = data || {};
  if (!detailMovie) return;
  const { backdrop_path, poster_path, title, genres, overview, id } =
    detailMovie;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`desc ${title}`} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`decs ${title}`} />
        <meta property="og:locale" key="og:locale" content="en_US" />
      </Helmet>
      <div className="">
        <div className="relative">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div
            className="w-full h-[600px] bg-cover bg-no-repeat rounded-md"
            style={
              backdrop_path && {
                backgroundImage: `url(
                ${urlAPI.getImage(backdrop_path, "original")}
                )`,
              }
            }
          />
        </div>
        <div className="w-full h-[500px] mx-auto max-w-[800px] relative -mt-[250px]">
          <img
            src={urlAPI.getImage(poster_path, "original")}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h1 className="text-5xl text-white font-semibold text-center my-14">
          {title}
        </h1>

        {genres && (
          <div className="flex gap-8 justify-center mb-12">
            {genres.length > 0 &&
              genres.map((item) => (
                <span
                  key={item.id}
                  className="text-lg text-[#7D6AFF] border border-[#7D6AFF] px-12 py-3 rounded-md"
                >
                  {item.name}
                </span>
              ))}
          </div>
        )}
        <p className="font-normal text-white text-base text-center mb-10">
          {overview}
        </p>
        <MovieCasts></MovieCasts>
        <MovieVideo></MovieVideo>
        <MovieSimilar></MovieSimilar>
      </div>
    </>
  );
}

function MovieCasts() {
  // dung useParam de lay id
  const { movieID } = useParams();
  const { data } = useSWR(urlAPI.getMoviesMeta(movieID, "credits"), fetcher);
  const casts = data?.cast || [];
  if (casts && !casts.length) return;
  return (
    <div className="mb-10">
      <h3 className="font-semibold text-3xl text-white text-center mb-10">
        Casts
      </h3>
      <div className="grid grid-cols-4 gap-5">
        {casts.slice(0, 4).map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <img
              src={urlAPI.getImage(item.profile_path, "original")}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
            <h4 className="text-lg text-white">{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideo() {
  const { movieID } = useParams();
  const { data } = useSWR(urlAPI.getMoviesMeta(movieID, "videos"), fetcher);
  const video = data?.results || [];
  if (video && !video.length) return;
  return (
    <div className="mb-10">
      {video.slice(0, 2).map((item) => (
        <div key={item.key} className="w-full aspect-video h-full">
          <h3 className="inline-block text-2xl text-white bg-secondary py-3 px-10 rounded-lg mb-5">
            {item.name}
          </h3>
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="TẤT TẦN TẬT về Web Responsive."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="object-fill w-full h-full"
          ></iframe>
          */
        </div>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieID } = useParams();
  const { data } = useSWR(urlAPI.getMoviesMeta(movieID, "similar"), fetcher);

  const similar = data?.results || [];
  if (similar && !similar.length) return;
  return (
    <div>
      <h3 className="font-semibold text-3xl text-white text-center mb-10">
        Similar Movies
      </h3>
      <div className="movie-list">
        <Swiper spaceBetween={30} grabCursor={true} slidesPerView={4}>
          {similar.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard movie={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailPage;
