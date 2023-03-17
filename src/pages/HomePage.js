import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";
import { withErrorBoundary } from "react-error-boundary";
import {} from "Helmet";
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <>
      <Helmet>
        <meta property="og:title" content={title} />
      </Helmet>
      <Banner></Banner>
      <section className="movies-now page-container text-white mb-10">
        <h3 className="capitalize text-2xl font-bold mb-10">Now playing</h3>
        <MovieList></MovieList>
      </section>
      <section className="movies-now page-container text-white">
        <h3 className="capitalize text-2xl font-bold mb-10">Top rate movies</h3>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-now page-container text-white">
        <h3 className="capitalize text-2xl font-bold mb-10">Trending</h3>
        <MovieList type="popular"></MovieList>
      </section>
    </>
  );
}

const ErrorBoundaryFallbackComponent = () => {
  return (
    <div className="p-3 bg-red-200 text-red-500">Something went wrong!</div>
  );
};

export default withErrorBoundary(HomePage, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
});
