import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layouts/Main";
import { withErrorBoundary } from "react-error-boundary";
import MoviePageV2 from "pages/MoviePageV2";

// import MoviePage from "./pages/MoviePage";
// import HomePage from "./pages/HomePage";
// import MovieDetailPage from "./pages/MovieDetailPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<HomePage></HomePage>}></Route>
            <Route path="movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="movie/:movieID"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
const ErrorBoundaryFallbackComponent = () => {
  return (
    <div className="p-3 bg-red-200 text-red-500">Something went wrong!</div>
  );
};

export default withErrorBoundary(App, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
});
