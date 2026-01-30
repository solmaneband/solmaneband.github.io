// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form handler
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMsg.textContent = 'Sending...';
    setTimeout(() => {
      formMsg.textContent = 'Thank you for reaching out!';
      form.reset();
    }, 1200);
  });
}
