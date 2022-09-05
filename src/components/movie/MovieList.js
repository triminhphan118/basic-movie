import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, urlAPI } from "../config";

function MovieList({ type = "now_playing" }) {
  const { data, error } = useSWR(urlAPI.getMovieList(type), fetcher);
  const movies = data?.results || [];
  const loading = !data && !error;
  return (
    <div className="movie-list">
      {loading && (
        <Swiper spaceBetween={30} grabCursor={true} slidesPerView={4}>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
        </Swiper>
      )}
      {!loading && (
        <Swiper spaceBetween={30} grabCursor={true} slidesPerView={4}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard movie={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}

export default MovieList;
