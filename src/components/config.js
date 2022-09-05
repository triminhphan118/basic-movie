export const fetcher = (url) => fetch(url).then((r) => r.json());
export const API_KEY = "b939864b0bdc743ffe1b430a1e137cc8";
export const endPoint = "https://api.themoviedb.org/3/movie";
export const endPointSearch = "https://api.themoviedb.org/3/search/movie";
export const endPointCate = "https://api.themoviedb.org/3/genre/movie";

export const urlAPI = {
  getMovieList: (type, page = 1) =>
    `${endPoint}/${type}?api_key=${API_KEY}&page=${page}`,
  getMovieCategory: () => `${endPointCate}/list?api_key=${API_KEY}`,
  getMovieDetail: (movieID) => `${endPoint}/${movieID}?api_key=${API_KEY}`,

  getMoviesMeta: (movieID, type) =>
    `${endPoint}/${movieID}/${type}?api_key=${API_KEY}`,

  getMoviesSearch: (searchKeyWord, page = 1) =>
    `${endPointSearch}?api_key=${API_KEY}&query=${searchKeyWord}&page=${page}`,
  getImage: (image, w = "w500") => `https://image.tmdb.org/t/p/${w}/${image}`,
};
