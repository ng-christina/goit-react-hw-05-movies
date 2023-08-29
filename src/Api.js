import axios from 'axios';

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;
const KEY = '9167ee7ecb36a9f774a46dedb9c5a8cc';

export class ApiMovies {
  #API_KEY = KEY;

  constructor() {
    this.BASE_URL = 'https://image.tmdb.org/t/p/w500';
    this.defaultImg =
      'https://png.pngtree.com/png-vector/20200812/ourmid/pngtree-film-noir-set-clapperboard-png-image_2324477.jpg';
  }

  async getPopularMovies(page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      page: page,
    });

    const { data } = await axios.get('trending/movie/day', { params });
    return data;
  }

  async getMovieByQuery(query, page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      query: query,
      page: page,
      language: 'en-US',
      include_adult: false,
    });

    const { data } = await axios.get('/search/movie', { params });
    return data;
  }

  async getMovieById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language: 'en-US',
      include_adult: false,
    });

    try {
      const { data } = await axios.get(`movie/${id}?${params}`);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('Oops, there is no movie with that name');
      }
      throw error;
    }
  }

  async getMovieCast(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language: 'en-US',
    });
    const { data } = await axios.get(`movie/${id}/credits?${params}`);
    return data.cast;
  }

  async getMovieReview(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language: 'en-US',
    });
    const { data } = await axios.get(`movie/${id}/reviews?${params}`);
    return data.results;
  }
}

export const ApiMoviesService = new ApiMovies();
