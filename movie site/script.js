function playMovie(movieFile) {
    const videoUrl = movieFile;
    window.open(videoUrl, '_blank');
}

function downloadMovie(movieFile) {
    const downloadLink = document.createElement('a');
    downloadLink.href = movieFile;
    downloadLink.download = movieFile;
    downloadLink.click();
}

function downloadMusic(musicFile) {
    const downloadLink = document.createElement('a');
    downloadLink.href = musicFile;
    downloadLink.download = musicFile;
    downloadLink.click();
}

/* Search functionality */
function searchMedia() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    
    // Search in movies
    const movies = document.querySelectorAll('.movie');
    movies.forEach((movie) => {
        const title = movie.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
            movie.classList.remove('hidden');
        } else {
            movie.classList.add('hidden');
        }
    });

    // Search in music
    const tracks = document.querySelectorAll('.track');
    tracks.forEach((track) => {
        const title = track.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
            track.classList.remove('hidden');
        } else {
            track.classList.add('hidden');
        }
    });
}
function addToFavorites(mediaFile) {
    // You can save this to local storage for now, or to a backend in the future
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(mediaFile);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Added to Favorites!');
}
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Switch to Light Mode';
    } else {
        toggleButton.textContent = 'Switch to Dark Mode';
    }
}
function applyFilter() {
    const selectedGenre = document.getElementById('genre-filter').value;
    // Filter logic based on genre
}
