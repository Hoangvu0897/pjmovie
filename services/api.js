const API_KEY = 'a797a247ab5716f6da691fb21fc68375';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const fetchMovies = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};
export const getGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
};

export const getPopularMovies = async (genreId = null) => {
    let endpoint = '/movie/popular?page=1';
    if (genreId) {
        endpoint = `/discover/movie?sort_by=popularity.desc&page=1&with_genres=${genreId}`;
    }
    return await fetchMovies(endpoint);
};


export const getMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

export const getImageUrl = (path) => {
    return `${IMAGE_BASE_URL}${path}`;
};
