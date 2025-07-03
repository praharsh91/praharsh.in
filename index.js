// portfolio script.js file for animations, modal, menu toggle, etc.

// Animate on scroll
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => observer.observe(el));

// Toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('show');
}

// Project modal
function openModal(card) {
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const image = document.getElementById('modal-image');
    const description = document.getElementById('modal-description');

    title.textContent = card.dataset.title;
    image.src = card.dataset.image;
    description.textContent = card.dataset.description;

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
}
