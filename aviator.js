// Function to start playing the movie
function startMovie() {
    const modal = document.getElementById('videoModal');
    const moviePlayer = document.getElementById('moviePlayer');
    modal.style.display = 'flex';
    moviePlayer.play();
}

// Function to simulate downloading the movie
function downloadMovie() {
    const movieURL = 'vid'; // Change this to your movie URL
    const a = document.createElement('a');
    a.href = movieURL;
    a.download = 'n.mp4'; // Provide a default filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Adding event listeners to the buttons
document.getElementById('watchButton').addEventListener('click', startMovie);
document.getElementById('downloadButton').addEventListener('click', downloadMovie);

// Close the modal when the user clicks on <span> (x)
document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('videoModal');
    const moviePlayer = document.getElementById('moviePlayer');
    moviePlayer.pause();
    moviePlayer.currentTime = 0; // Reset to the beginning
    modal.style.display = 'none';
});

// Close the modal when the user clicks anywhere outside of the modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        const moviePlayer = document.getElementById('moviePlayer');
        moviePlayer.pause();
        moviePlayer.currentTime = 0; // Reset to the beginning
        modal.style.display = 'none';
    }
});
