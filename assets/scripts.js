// Scroll-triggered burger menu for desktop
let lastScroll = 0;
const burger = document.getElementById('burger-menu');
const mainNav = document.getElementById('main-nav');
const navList = document.getElementById('nav-list');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  if (window.innerWidth > 768) {
    // Desktop behavior: show burger after scrolling down 100px
    if (scrollPosition > 100) {
      burger.style.display = 'block';
      mainNav.style.opacity = '0';
      mainNav.style.pointerEvents = 'none';
    } else {
      burger.style.display = 'none';
      mainNav.style.opacity = '1';
      mainNav.style.pointerEvents = 'auto';
      navList.classList.remove('open');
    }
  } else {
    // Mobile behavior: always show burger
    burger.style.display = 'block';
    mainNav.style.opacity = '0';
    mainNav.style.pointerEvents = 'none';
  }
});

// Trigger scroll event on load to set initial state
window.dispatchEvent(new Event('scroll'));

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      // Close menu after click
      navList.classList.remove('open');
    }
  });
});

// Burger menu toggle
if (burger && navList) {
  burger.addEventListener('click', () => {
    navList.classList.toggle('open');
    burger.classList.toggle('active');
  });
  burger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navList.classList.toggle('open');
      burger.classList.toggle('active');
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
