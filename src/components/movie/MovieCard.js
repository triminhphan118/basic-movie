import { Link, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { urlAPI } from "../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

function MovieCard({ movie }) {
  const { title, poster_path, vote_average, release_date, id } = movie;
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className="bg-slate-700 p-3 rounded-lg flex flex-col h-full">
      <img
        src={urlAPI.getImage(poster_path)}
        alt=""
        className="w-full object-cover h-[300px] rounded-lg mb-5"
      />
      <h3 className="text-xl font-bold mb-3"> {title}</h3>
      <div className="flex flex-col flex-1 ">
        <div className="flex justify-between items-center mb-3 mt-auto opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => goDetail(id)} type="secondary">
          Watch now
        </Button>
      </div>
    </div>
  );
}

export const MovieCardSkeleton = () => {
  return (
    <div className="bg-slate-700 p-3 rounded-lg flex flex-col h-full">
      <LoadingSkeleton className="w-full object-cover h-[300px] rounded-lg mb-5"></LoadingSkeleton>
      <h3 className="text-xl font-bold mb-3">
        {" "}
        <LoadingSkeleton className="w-full h-4"></LoadingSkeleton>
      </h3>
      <div className="flex flex-col flex-1 ">
        <div className="flex justify-between items-center mb-3 mt-auto opacity-50">
          <span>
            <LoadingSkeleton className="w-8 h-4"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-6 h-4"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton className="w-full h-10"></LoadingSkeleton>
      </div>
    </div>
  );
};

MovieCard.propstypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.Date,
    id: PropTypes.string,
  }),
};

const ErrorBoundaryFallbackComponent = () => {
  return (
    <div className="p-3 bg-red-200 text-red-500">Something went wrong!</div>
  );
};

export default withErrorBoundary(MovieCard, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
});
