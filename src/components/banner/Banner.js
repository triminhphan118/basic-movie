import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import Button from "../button/Button";
import { fetcher, urlAPI } from "../config";
import { withErrorBoundary } from "react-error-boundary";

function Banner() {
  const { data } = useSWR(urlAPI.getMovieList("upcoming"), fetcher);
  const { data: data_cate } = useSWR(urlAPI.getMovieCategory(), fetcher);
  const banner = data?.results || [];
  const category = data_cate?.genres || [];
  return (
    <Swiper>
      {banner.length > 0 &&
        banner.map((item) => (
          <SwiperSlide key={item.id}>
            <BannerItem item={item} category={category} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

function BannerItem({ item, category }) {
  const navigate = useNavigate();
  const { genre_ids, poster_path, title, id } = item;
  return (
    <section className="banner page-container h-[400px] bg-white rounded-lg relative mb-10">
      <img
        src={urlAPI.getImage(poster_path, "original")}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="content absolute bottom-5 left-5 text-white flex flex-col gap-y-7">
        <h3 className="text-4xl font-bold">{title}</h3>
        <div className="flex items-center gap-x-3">
          {category.length > 0 &&
            category.map((item_cate) => {
              if (
                genre_ids &&
                genre_ids.length > 0 &&
                genre_ids.includes(item_cate.id)
              ) {
                return (
                  <span
                    className="border-2 border-white p-2 rounded-lg border-opacity-50"
                    key={item_cate.id}
                  >
                    {item_cate.name}
                  </span>
                );
              }
              return null;
            })}
        </div>
        <div className="action flex gap-2">
          <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
          <Button type="third">+</Button>
          <button className="px-4 py-2 bg-gray-600 rounded-lg flex items-center gap-x-2">
            +
          </button>
        </div>
      </div>
    </section>
  );
}

const ErrorBoundaryFallbackComponent = () => {
  return (
    <div className="p-3 bg-red-200 text-red-500">Something went wrong!</div>
  );
};

export default withErrorBoundary(Banner, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
});
