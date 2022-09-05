import { useEffect, useState } from "react";
import { v4, v5 } from "uuid";
import useSWR from "swr";
import { fetcher, urlAPI } from "../components/config";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { withErrorBoundary } from "react-error-boundary";

const itemsPerPage = 20;
function MoviePage() {
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [url, setUrl] = useState(urlAPI.getMovieList("upcoming", pageNumber));
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const searchKeyWord = useDebounce(keyword);
  useEffect(() => {
    if (searchKeyWord) {
      setPageNumber(1);
    }
  }, [searchKeyWord]);
  useEffect(() => {
    let newUrl = urlAPI.getMovieList("upcoming", pageNumber);
    if (searchKeyWord) {
      newUrl = urlAPI.getMoviesSearch(searchKeyWord, pageNumber);
    }
    setUrl(newUrl);
  }, [searchKeyWord, pageNumber]);

  useEffect(() => {
    // Fetch items from another resources.
    if (!data && !data?.total_results) return;
    setPageCount(Math.ceil(data?.total_results || 0 / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % data?.total_results || 0;
    setItemOffset(newOffset);
    setPageNumber(event.selected + 1);
  };
  const handleSearchInput = (e) => {
    setKeyword(e.target.value);
  };
  const movies = data?.results || [];
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
        {!loading && (
          <ReactPaginate
            forcePage={pageNumber - 1}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        )}
        {/* <div className="flex items-center gap-5 justify-center">
          <span
            className="py-2 px-4 rounded-lg cursor-pointer bg-slate-700"
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
          {Array(5)
            .fill(0)
            .map((value, index) => (
              <span
                className="py-2 px-4 rounded-lg cursor-pointer bg-slate-700"
                onClick={() => setPageNumber(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          <span
            className="py-2 px-4 rounded-lg cursor-pointer bg-slate-700"
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div> */}
      </div>
    </>
  );
}
const ErrorBoundaryFallbackComponent = () => {
  return (
    <div className="p-3 bg-red-200 text-red-500">Something went wrong!</div>
  );
};

export default withErrorBoundary(MoviePage, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
});
