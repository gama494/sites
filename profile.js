// Sample user data
const users = [
    { 
        username: 'testUser', 
        phone: '1234567890', 
        password: 'testPass', 
        profilePicture: '', 
        likes: 0, 
        comments: [], // Array to hold comments
        views: 0 // Number of views
    }
];

let currentUser = users[0]; // Assume the first user is logged in for testing

// Display the user's username, profile picture, likes, comments, and views
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('usernameDisplay').innerText = currentUser.username;
    
    // Display profile picture
    document.getElementById('profilePicture').src = currentUser.profilePicture || 'default-profile.png';

    // Display likes, comments, and views
    document.getElementById('likesDisplay').innerText = `Likes: ${currentUser.likes}`;
    document.getElementById('commentsDisplay').innerText = `Comments: ${currentUser.comments.length}`;
    document.getElementById('viewsDisplay').innerText = `Views: ${currentUser.views}`;
});

// Handle profile picture upload
document.getElementById('uploadPictureButton').onclick = function() {
    const fileInput = document.getElementById('profilePictureInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentUser.profilePicture = e.target.result; // Store the image data
            document.getElementById('profilePicture').src = currentUser.profilePicture; // Update the image
            alert("Profile picture uploaded successfully!");
        };
        reader.readAsDataURL(file); // Convert the file to a base64 string
    } else {
        alert("Please select an image file.");
    }
};

// Function to simulate adding likes, comments, and views
function addInteraction(type) {
    if (type === 'like') {
        currentUser.likes++;
        document.getElementById('likesDisplay').innerText = `Likes: ${currentUser.likes}`;
    } else if (type === 'comment') {
        const comment = prompt("Enter your comment:");
        if (comment) {
            currentUser.comments.push(comment);
            document.getElementById('commentsDisplay').innerText = `Comments: ${currentUser.comments.length}`;
        }
    } else if (type === 'view') {
        currentUser.views++;
        document.getElementById('viewsDisplay').innerText = `Views: ${currentUser.views}`;
    }
}
let profilePictures = []; // Array to store profile picture URLs

function uploadProfilePicture() {
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePicsContainer = document.getElementById('profilePicsContainer');

    if (profilePicInput.files.length === 0) {
        alert("Please select an image to upload.");
        return;
    }

    const file = profilePicInput.files[0];
    const fileURL = URL.createObjectURL(file);
    profilePictures.push(fileURL);
    displayProfilePictures(profilePicsContainer);
    profilePicInput.value = '';
}

function displayProfilePictures(container) {
    container.innerHTML = '';

    profilePictures.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.style.width = '100px'; // Set a fixed width
        imgElement.style.height = '100px'; // Set a fixed height
        imgElement.style.margin = '5px';
        imgElement.style.borderRadius = '5px';
        imgElement.alt = 'Profile Picture';

        // Add click event to open the modal
        imgElement.onclick = function() {
            openModal(url);
        };

        container.appendChild(imgElement);
    });
}

function openModal(url) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = url;
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

function downloadImage() {
    const modalImage = document.getElementById("modalImage");
    const link = document.createElement('a');
    link.href = modalImage.src;
    link.download = 'profile-picture.jpg'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Load profile pictures when the page loads
function loadProfile() {
    const profilePicsContainer = document.getElementById('profilePicsContainer');
    displayProfilePictures(profilePicsContainer);
}

window.onload = loadProfile;


