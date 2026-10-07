// Mobile nav toggle (same behaviour as the previous site)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
  navMenu.querySelectorAll('.nav-link, .nav-logo').forEach(link =>
    link.addEventListener('click', () => navMenu.classList.remove('active')));
}
