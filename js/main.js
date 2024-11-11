// Menu functionality
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMenu() {
    menuButton.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

// Event Listeners
menuButton.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.navbar')) {
        toggleMenu();
    }
});

// Close menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }, 250);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.story-card').forEach(card => {
    observer.observe(card);
});

document.addEventListener('DOMContentLoaded', () => {
    const audioButtons = document.querySelectorAll('.audio-btn');

    audioButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioFile = button.getAttribute('data-audio');
            const audioPath = `../assets/audio/${audioFile}`; 
            
            const audio = new Audio(audioPath);
            audio.play();
        });
    });
});