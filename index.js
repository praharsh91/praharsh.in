// =========================================================
// Navigation Menu Functionality
// Toggles the visibility of the mobile navigation menu.
// =========================================================
const toggleBtn = document.getElementById("menuToggle");
const menuItems = document.getElementById("menuItems");

if (toggleBtn && menuItems) {
  toggleBtn.addEventListener("click", () => {
    menuItems.classList.toggle("active");
    // Update aria-expanded for accessibility
    const isExpanded = menuItems.classList.contains("active");
    toggleBtn.setAttribute("aria-expanded", isExpanded);
  });
} else {
  console.error("Initialization Error: Menu toggle button or menu items not found. Check HTML IDs.");
}


// =========================================================
// Auto-close Mobile Menu on Link Click
// Hides the mobile menu when a navigation link is clicked,
// improving UX by preventing the menu from staying open.
// =========================================================
document.querySelectorAll(".menu-items a").forEach(link => {
  link.addEventListener("click", () => {
    // Only close if on a mobile screen size (matches CSS media query breakpoint)
    if (window.innerWidth < 768) {
      if (menuItems) {
        menuItems.classList.remove("active"); // Remove 'active' class to hide the menu
        if (toggleBtn) { // Update aria-expanded for accessibility
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      }
    }
  });
});


// =========================================================
// Parallax Effect for Background Gradient
// Creates a subtle parallax (depth) effect on the background
// gradient layer based on mouse movement.
// =========================================================
const backgroundGradient = document.querySelector('.layer-gradient');
let lastAnimationFrameId = null; // To store the ID of the last scheduled animation frame
let mouseX = 0;
let mouseY = 0;

if (backgroundGradient) {
  document.addEventListener('mousemove', (e) => {
    // Update mouse coordinates
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Request a new animation frame only if one isn't already pending
    if (!lastAnimationFrameId) {
      lastAnimationFrameId = window.requestAnimationFrame(() => {
        // Calculate horizontal (x) and vertical (y) displacement
        // The -0.5 centers the origin, and *10 scales the movement
        const x = (mouseX / window.innerWidth - 0.5) * 10; // Moves between -5px and 5px horizontally
        const y = (mouseY / window.innerHeight - 0.5) * 10; // Moves between -5px and 5px vertically
        backgroundGradient.style.transform = `translate(${x}px, ${y}px)`; // Apply the transform

        lastAnimationFrameId = null; // Reset the ID, allowing a new frame to be requested
      });
    }
  });
} else {
  console.warn("Element Not Found: '.layer-gradient' not found for parallax effect. Check HTML class.");
}


// =========================================================
// Scroll Reveal Functionality
// Adds an 'active' class to elements with 'reveal' class
// when they enter the viewport, triggering CSS animations.
// =========================================================
const revealElements = document.querySelectorAll('.reveal');
let isScrolling = false;

const revealOnScroll = () => {
  const windowHeight = window.innerHeight; // Get the height of the browser window
  revealElements.forEach(el => {
    // Get the top position of the element relative to the viewport
    const elementTop = el.getBoundingClientRect().top;
    // If the element is within 150 pixels from the bottom of the viewport, activate it
    // (Adjust 150px threshold as needed)
    if (elementTop < windowHeight - 150) {
      el.classList.add('active'); // Add 'active' class to trigger its CSS animation
    }
    // Optional: To remove 'active' class when scrolling back up (for re-revealing on scroll down)
    // else {
    //   el.classList.remove('active');
    // }
  });
  isScrolling = false; // Reset scroll flag
};

// Use requestAnimationFrame for smoother scroll event handling
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(revealOnScroll);
    isScrolling = true;
  }
});
window.addEventListener('load', revealOnScroll); // Trigger on page load for elements already in view


// =========================================================
// Contact Form Submission Handling
// Prevents default form submission and provides user feedback.
// =========================================================
const contactForm = document.getElementById('contactForm');
const messageBox = document.getElementById('messageBox');

if (contactForm && messageBox) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    // Simulate form submission success
    showMessage("Thank you for your message! We'll get back to you soon.", true);

    // Optionally, clear the form fields after submission
    contactForm.reset();
  });
} else {
  console.error("Initialization Error: Contact form or message box not found. Check HTML IDs.");
}

/**
 * Displays a message to the user in a styled box.
 * @param {string} message - The text message to display.
 * @param {boolean} isSuccess - True for success message (green), false for error (red).
 */
function showMessage(message, isSuccess) {
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.style.backgroundColor = isSuccess ? 'var(--primary)' : 'red';
    messageBox.style.color = isSuccess ? 'var(--dark)' : 'white';
    messageBox.classList.add('show');

    // Hide the message after a few seconds
    setTimeout(() => {
      messageBox.classList.remove('show');
    }, 5000); // Message fades out after 5 seconds
  }
}
