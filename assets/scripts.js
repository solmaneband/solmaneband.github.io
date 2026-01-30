// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu after click
      if (window.innerWidth <= 700) {
        document.getElementById('nav-list').classList.remove('open');
      }
    }
  });
});

// Burger menu for mobile
const burger = document.getElementById('burger-menu');
const navList = document.getElementById('nav-list');
if (burger && navList) {
  burger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
  burger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navList.classList.toggle('open');
    }
  });
}

// Contact form handler (Formspree disables default JS, but keep for fallback UX)
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');
if (form && formMsg) {
  form.addEventListener('submit', function(e) {
    formMsg.textContent = 'Sending...';
    setTimeout(() => {
      formMsg.textContent = 'Thank you for reaching out!';
      form.reset();
    }, 1200);
  });
}
