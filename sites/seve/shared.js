// ── Navbar scroll state (only for homepage) ──
const navbar = document.getElementById('navbar');
if (navbar && !navbar.classList.contains('navbar-glass')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
if (navToggle && navMobile) {
  function closeMobileNav() {
    navToggle.classList.remove('active');
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
  }
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
  });
  // Close when clicking on overlay background (not the inner card)
  navMobile.addEventListener('click', (e) => {
    if (e.target === navMobile) closeMobileNav();
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

// ── Intersection Observer for .reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .reveal-img').forEach(el => revealObserver.observe(el));

// ── Custom Cursor (desktop) ──
if (window.matchMedia('(min-width: 1025px)').matches) {
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  if (cursor) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function animateCursor() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      if (cursorLabel) {
        cursorLabel.style.left = cx + 'px';
        cursorLabel.style.top = (cy - 36) + 'px';
      }
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        if (el.dataset.cursor && cursorLabel) {
          cursorLabel.textContent = el.dataset.cursor;
          cursorLabel.classList.add('visible');
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        if (cursorLabel) cursorLabel.classList.remove('visible');
      });
    });
  }
}
