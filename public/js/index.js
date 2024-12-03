const popularMovies = [];
const nowPlayingMovies = [];

async function getTrendingMovies(time_window = 'day') {
    return await fetch(`/api/trending?time_window=${time_window}`).then(resolve => resolve.json());
}
async function getNowPlayingMovies(page = 1) {
    return await fetch(`/api/now_playing?page=${page}`).then(resolve => resolve.json());
}

/**
 * 
 * @param {Object[]} movies 
 * @param {'popular' | 'now_playing' | 'trending'} type 
 */
function render(movies, type) {
    const moviesContainer = document.querySelector(`#${type} .movie_list`);

    movies.forEach(movie => {
        const movieLi = document.createElement('li');
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const detailLink = document.createElement('a');
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        img.alt = movie.title;
        img.classList.add('movie_poster')
        detailLink.classList.add('movie_poster_link');
        detailLink.href = `/detail?movie_id=${movie.id}`;
        detailLink.append(img);

        const titleSpan = document.createElement('span');
        titleSpan.classList.add('movie_title');
        titleSpan.textContent = movie.title;

        const infoSpan = document.createElement('span');
        infoSpan.classList.add('movie_info');
        infoSpan.textContent = movie.release_date;

        movieDiv.appendChild(detailLink);
        movieDiv.appendChild(titleSpan);
        movieDiv.appendChild(infoSpan);
        movieLi.appendChild(movieDiv);

        moviesContainer.appendChild(movieLi);
    });
}

getTrendingMovies().then(resolve => {
    render(resolve.results, 'trending');
})

getNowPlayingMovies().then(resolve => {
    render(resolve.results, 'now_playing');
})
