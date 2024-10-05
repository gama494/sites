const display = document.getElementById('display');
function appendToDisplay(input){
  display.value += input;
}
function clearDisplay(){
    display.value ="";
}
function calculate(){
    try{
display.value = eval(display.value);
}

catch (error){
    display.value ="zosatheka";
}
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle menu actions
    document.getElementById('settings').addEventListener('click', function() {
        alert('Settings clicked!');
        // Add your settings logic here
    });

    document.getElementById('logout').addEventListener('click', function() {
        alert('Logging out!');
        // Add your logout logic here
        window.location.href = 'login.html'; // Redirect to login page or handle logout
    });

    document.getElementById('change-theme').addEventListener('click', function() {
        alert('Change theme clicked!');
        // Add your theme change logic here
        document.body.classList.toggle('dark-theme'); // Example to toggle dark theme
    });

    document.getElementById('language').addEventListener('click', function() {
        alert('Change language clicked!');
        // Add your language change logic here
        // This could involve opening a language selection modal or redirecting to a language settings page
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Handle menu actions
    document.getElementById('settings').addEventListener('click', function() {
        alert('Settings clicked!');
        // Add your settings logic here
    });

    document.getElementById('logout').addEventListener('click', function() {
        alert('Logging out!');
        // Add your logout logic here
        window.location.href = 'login.html'; // Redirect to login page or handle logout
    });

    document.getElementById('change-theme').addEventListener('click', function() {
        // Toggle dark theme class
        document.body.classList.toggle('dark-theme');
        
        // Optionally, save the theme choice in localStorage
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    document.getElementById('language').addEventListener('click', function() {
        alert('Change language clicked!');
        // Add your language change logic here
        // This could involve opening a language selection modal or redirecting to a language settings page
    });

    // Load the saved theme from localStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

const languages = {
    en: {
        welcome: "Welcome to Your Home Page",
        settings: "Settings",
        logout: "Logout",
        changeTheme: "Change Theme",
        language: "Language",
        login: "Login",
        signUp: "Sign up here"
    },
    es: {
        welcome: "Bienvenido a tu página de inicio",
        settings: "Configuración",
        logout: "Cerrar sesión",
        changeTheme: "Cambiar tema",
        language: "Idioma",
        login: "Iniciar sesión",
        signUp: "Regístrate aquí"
    },
    fr: {
        welcome: "Bienvenue sur votre page d'accueil",
        settings: "Paramètres",
        logout: "Se déconnecter",
        changeTheme: "Changer de thème",
        language: "Langue",
        login: "Connexion",
        signUp: "Inscrivez-vous ici"
    }
    // Add more languages as needed
};
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme and language
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const savedLanguage = localStorage.getItem('language') || 'en';
    applyLanguage(savedLanguage);
    document.getElementById('language-select').value = savedLanguage;

    // Handle menu actions
    document.getElementById('settings').addEventListener('click', function() {
        alert('Settings clicked!');
    });

    document.getElementById('logout').addEventListener('click', function() {
        alert('Logging out!');
        window.location.href = 'login.html';
    });

    document.getElementById('change-theme').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    document.getElementById('language-select').addEventListener('change', function(event) {
        const selectedLanguage = event.target.value;
        localStorage.setItem('language', selectedLanguage);
        applyLanguage(selectedLanguage);
    });

    function applyLanguage(lang) {
        const elements = {
            'welcome': document.querySelector('header h1'),
            'settings': document.getElementById('settings'),
            'logout': document.getElementById('logout'),
            'change-theme': document.getElementById('change-theme'),
            'language': document.getElementById('language')
        };

        const langData = languages[lang];
        for (const key in elements) {
            if (elements[key]) {
                elements[key].textContent = langData[key];
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const watchButton = document.getElementById('watchButton');
    const modal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close');

    watchButton.addEventListener('click', () => {
        // Track the click event (you can send this data to your server or analytics tool here)
        console.log('Watch button clicked');
        // Example: Send data to your server
        fetch('v/track-click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'watch_button_clicked' })
        });

        // Show the video modal
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        // Hide the video modal
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});




