import { useEffect, useState } from "react";
import { v4, v5 } from "uuid";
import useSWRInfinite from "swr/infinite";
import { fetcher, urlAPI } from "../components/config";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import { withErrorBoundary } from "react-error-boundary";
import Button from "../components/button/Button";

const itemsPerPage = 20;
function MoviePageV2() {
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [url, setUrl] = useState(urlAPI.getMovieList("upcoming", pageNumber));
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  // const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const searchKeyWord = useDebounce(keyword);

  useEffect(() => {
    let newUrl = urlAPI.getMovieList("upcoming", pageNumber);
    if (searchKeyWord) {
      newUrl = urlAPI.getMoviesSearch(searchKeyWord, pageNumber);
    }
    setUrl(newUrl);
  }, [searchKeyWord, pageNumber]);

  const handleSearchInput = (e) => {
    setKeyword(e.target.value);
  };

  const movies =
    data && data.reduce((init, item) => [...init, ...item.results], []);
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  console.log(isReachingEnd);
  return (
    <>
      <div className="movie-page flex flex-col gap-y-10 text-white">
        <div className="flex max-w-[900px] mx-auto w-full">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search name your moie"
              value={keyword}
              onChange={handleSearchInput}
              className="w-full p-4 bg-slate-700 rounded-tl-lg rounded-bl-lg"
            />
          </div>
          <button className="py-4 px-6 bg-primary rounded-tr-lg rounded-br-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        {loading && (
          <div className="grid grid-cols-4 gap-7">
            {Array(itemsPerPage)
              .fill(0)
              .map(() => (
                <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
              ))}
          </div>
        )}
        <div className="grid grid-cols-4 gap-7">
          {!loading &&
            movies.length > 0 &&
            movies.map((item) => (
              <MovieCard movie={item} key={item.id}></MovieCard>
            ))}
        </div>
        {!isReachingEnd && (
          <div className="mx-auto">
            <Button onClick={() => setSize(size + 1)}>Load more</Button>
          </div>
        )}
      </div>
    </>
  );
}
const ErrorBoundaryFallbackComponent = () => {
  return (
    <div className="p-3 bg-red-200 text-red-500">Something went wrong!</div>
  );
};

export default withErrorBoundary(MoviePageV2, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
});
