const apiKey = 'd3e48fb1'; 

const searchInput = document.getElementById('searchInput');
const moviesList = document.getElementById('moviesList');

let debounceTimeout;

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
  clearTimeout(debounceTimeout);
  
  debounceTimeout = setTimeout(() => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    } else {
      moviesList.innerHTML = '';
    }
  }, 300);
});

async function fetchMovies(searchTerm) {
  const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // displayMovies(data.movies)
    // console.log(data)
  
    if (data.Search) {
      displayMovies(data.Search);
    } else {
      moviesList.innerHTML = '<h5>No movies found.</h5>';
    }
  } 
  catch (error) {
    console.error('Error fetching data:', error);
  }
}
// console.log(data)



function displayMovies(movies) {
  moviesList.innerHTML = '';
  movies.forEach(movie => {

    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    
    movieItem.innerHTML = `
     
      <img src="${movie.Poster}" alt="${movie.Poster}">
      
      <h4>${movie.Title}, ${movie.Year}</h4>
      
    `;
    moviesList.appendChild(movieItem);
  });
  // console.log(data)
}
