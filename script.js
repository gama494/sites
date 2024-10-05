const posts = []; // Array to hold posts
const stories = []; // Array to hold stories

async function fetchPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        // Add media if exists
        if (post.media) {
            const mediaElement = document.createElement(post.media.type === 'image' ? 'img' : 'video');
            mediaElement.src = URL.createObjectURL(post.media.file);
            mediaElement.className = 'post-media';
            mediaElement.controls = post.media.type === 'video'; // Only add controls for videos
            postDiv.appendChild(mediaElement);
        }

        const textElement = document.createElement('p');
        textElement.innerText = post.content;
        postDiv.appendChild(textElement);

        postsContainer.appendChild(postDiv);
    });
}

async function fetchStories() {
    const storiesContainer = document.getElementById('stories');
    storiesContainer.innerHTML = '';

    stories.forEach((story, index) => {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'story';

        // Create media element
        if (story.media) {
            const mediaElement = document.createElement(story.media.type === 'image' ? 'img' : 'video');
            mediaElement.src = URL.createObjectURL(story.media.file);
            mediaElement.className = 'story-media';
            mediaElement.controls = story.media.type === 'video'; // Only add controls for videos
            storyDiv.appendChild(mediaElement);
        }

        const textElement = document.createElement('p');
        textElement.innerText = story.content;
        storyDiv.appendChild(textElement);

        // Like Button
        const likeButton = document.createElement('button');
        likeButton.className = 'like-button';
        likeButton.innerText = 'Like';
        likeButton.onclick = () => handleLike(index);
        storyDiv.appendChild(likeButton);

        // Like Count
        const likeCount = document.createElement('span');
        likeCount.className = 'like-count';
        likeCount.innerText = story.likes || 0;
        storyDiv.appendChild(likeCount);

        // Comment Section
        const commentInput = document.createElement('textarea');
        commentInput.className = 'comment-input';
        commentInput.placeholder = 'Add a comment...';
        storyDiv.appendChild(commentInput);

        const commentButton = document.createElement('button');
        commentButton.innerText = 'Comment';
        commentButton.onclick = () => handleComment(index, commentInput.value);
        storyDiv.appendChild(commentButton);

        const commentsContainer = document.createElement('div');
        commentsContainer.className = 'comment-section';
        commentsContainer.innerText = story.comments.join('\n') || 'No comments yet.';
        storyDiv.appendChild(commentsContainer);

        storiesContainer.appendChild(storyDiv);
    });
}

async function addPost() {
    const postContent = document.getElementById('postContent').value;
    const postMedia = document.getElementById('postMedia').files[0];
    if (postContent || postMedia) {
        const mediaType = postMedia ? (postMedia.type.startsWith('image/') ? 'image' : 'video') : null;
        const post = { 
            content: postContent, 
            media: postMedia ? { file: postMedia, type: mediaType } : null
        };
        
        posts.push(post); // Add post to array
        document.getElementById('postContent').value = ''; // Clear input
        document.getElementById('postMedia').value = ''; // Clear file input
        fetchPosts(); // Refresh the post feed
    }
}

async function addStory() {
    const storyContent = document.getElementById('storyContent').value;
    const storyMedia = document.getElementById('storyMedia').files[0];
    if (storyContent || storyMedia) {
        const mediaType = storyMedia ? (storyMedia.type.startsWith('image/') ? 'image' : 'video') : null;
        const story = { 
            content: storyContent, 
            media: storyMedia ? { file: storyMedia, type: mediaType } : null,
            likes: 0, // Initialize likes
            comments: [] // Initialize comments
        };
        
        stories.push(story); // Add story to array
        document.getElementById('storyContent').value = ''; // Clear input
        document.getElementById('storyMedia').value = ''; // Clear file input
        fetchStories(); // Refresh the story section
    }
}

function handleLike(index) {
    stories[index].likes += 1; // Increment likes
    fetchStories(); // Refresh the stories display
}

function handleComment(index, comment) {
    if (comment) {
        stories[index].comments.push(comment); // Add comment to array
        fetchStories(); // Refresh the stories display
    }
}

// Initial fetch
fetchPosts();
fetchStories();
// Add a comment to a post
app.post('/api/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const { username, text } = req.body; // Get username and comment text

    const post = await Post.findById(postId);
    if (post) {
        post.comments.push({ username, text }); // Add comment
        await post.save();
        res.json(post.comments); // Send back updated comments
    } else {
        res.status(404).send('Post not found');
    }
});
function openModal(imageSrc, captionText) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const caption = document.getElementById("caption");

    modal.style.display = "block";
    modalImage.src = imageSrc; // Set the source of the modal image
    caption.innerText = captionText; // Set the caption text
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Hide the modal
}
function displayStories() {
    const storiesContainer = document.getElementById('stories');
    storiesContainer.innerHTML = '';

    stories.forEach((story) => {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'story';

        // Create an image element for the story
        const storyImage = document.createElement('img');
        storyImage.src = story.media.file; // Assuming you have a media property
        storyImage.onclick = () => openModal(story.media.file, story.content); // Open modal on click
        storyDiv.appendChild(storyImage);

        storiesContainer.appendChild(storyDiv);
    });
}
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    online: { type: Boolean, default: false }, // Track online status
});

const User = mongoose.model('User', UserSchema);
let postCount = 0;

function createPost() {
    const caption = document.getElementById('postCaption').value;
    const fileInput = document.getElementById('postFile');
    const postContainer = document.getElementById('postContainer');

    if (!caption || fileInput.files.length === 0) {
        alert("Please enter a caption and select a file.");
        return;
    }

    const post = document.createElement('div');
    post.classList.add('post');

    // Create caption element
    const postCaption = document.createElement('p');
    postCaption.textContent = caption;
    post.appendChild(postCaption);

    // Create file element (image or video)
    const file = fileInput.files[0];
    const fileURL = URL.createObjectURL(file);

    let mediaElement;
    if (file.type.startsWith('image/')) {
        mediaElement = document.createElement('img');
        mediaElement.src = fileURL;
    } else if (file.type.startsWith('video/')) {
        mediaElement = document.createElement('video');
        mediaElement.src = fileURL;
        mediaElement.controls = true; // Show controls for video
    }
    
    post.appendChild(mediaElement);

    // Add like, view, comment functionality
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');
    postActions.innerHTML = `
        <button onclick="likePost(this)">Like</button>
        <span> Likes: <span class="likeCount">0</span></span>
        <button onclick="commentPost(this)">Comment</button>
        <span> Comments: <span class="commentCount">0</span></span>
        <span> Views: <span class="viewCount">0</span></span>
    `;
    postActions.querySelector('.likeCount').textContent = 0;
    postActions.querySelector('.commentCount').textContent = 0;
    postActions.querySelector('.viewCount').textContent = 0;

    post.appendChild(postActions);
    postContainer.appendChild(post);

    // Clear input fields
    document.getElementById('postCaption').value = '';
    document.getElementById('postFile').value = '';
}

function likePost(button) {
    const likeCountElement = button.nextElementSibling.querySelector('.likeCount');
    likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
}

function commentPost(button) {
    const commentCountElement = button.nextElementSibling.querySelector('.commentCount');
    commentCountElement.textContent = parseInt(commentCountElement.textContent) + 1;
}

// Optionally, add view count when the post is created
document.addEventListener('DOMContentLoaded', () => {
    const viewCountElements = document.querySelectorAll('.viewCount');
    viewCountElements.forEach(viewCountElement => {
        viewCountElement.textContent = parseInt(viewCountElement.textContent) + 1;
    });
});


