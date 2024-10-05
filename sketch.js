function updateClock() {
    console.log('Updating clock'); // Debugging line
    const now = new Date();
    // Existing code...
}
// Simplified clock.js for testing
function updateClock() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();

    const secondDeg = (second / 60) * 360;
    const minuteDeg = (minute / 60) * 360;
    const hourDeg = (hour / 12) * 360 + (minute / 60) * 30;

    document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately
