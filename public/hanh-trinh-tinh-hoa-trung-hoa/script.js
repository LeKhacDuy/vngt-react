/* ============================================================
   FULL JOURNEY SCROLL ENGINE
   ============================================================ */

// ---- Helpers ----
const $ = id => document.getElementById(id);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;

// ---- DOM ----
const vehicle = $('vehicle');
const vehicleBody = $('vehicle-body');
const routeFill = $('route-line-fill');
const hudFill = $('hudFill');
const hudCityName = $('hudCityName');
const hud = $('hud');

// ---- City sections config ----
const CITIES = [
  { id: 'intro', section: 'section-intro', name: 'TP. Hồ Chí Minh', dot: null, inner: null, mm: 'mm-intro' },
  { id: 'beijing', section: 'section-beijing', name: 'Bắc Kinh', dot: 'dot-beijing', inner: 'inner-beijing', mm: 'mm-beijing' },
  { id: 'hangzhou', section: 'section-hangzhou', name: 'Hàng Châu', dot: 'dot-hangzhou', inner: 'inner-hangzhou', mm: 'mm-hangzhou' },
  { id: 'wuzhen', section: 'section-wuzhen', name: 'Ô Trấn', dot: 'dot-wuzhen', inner: 'inner-wuzhen', mm: 'mm-wuzhen' },
  { id: 'shanghai', section: 'section-shanghai', name: 'Thượng Hải', dot: 'dot-shanghai', inner: 'inner-shanghai', mm: 'mm-shanghai' },
];

// Vehicle type per leg (between cities)

// ---- Set CSS variable for route x position ----
function getRouteX() {
  const vw = window.innerWidth;
  if (vw < 600) return 24;
  if (vw < 900) return 36;
  return 72;
}

function applyRouteX() {
  const rx = getRouteX();
  document.documentElement.style.setProperty('--route-x', rx + 'px');
  return rx;
}

// ---- Get section's position info ----
function getSectionBounds(el) {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.scrollY;
  return {
    top: rect.top + scrollTop,
    bottom: rect.bottom + scrollTop,
    height: rect.height,
  };
}

// ---- Get center of section relative to document ----
function getSectionCenter(el) {
  const b = getSectionBounds(el);
  return b.top + b.height / 2;
}

// ---- IntersectionObserver for city content reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

// ---- IntersectionObserver for transition strips ----
const jtObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const jt = entry.target.querySelector('.jt-content');
    if (!jt) return;
    if (entry.isIntersecting) {
      jt.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

// ---- Observe elements ----
function initObservers() {
  CITIES.forEach(c => {
    if (c.inner) {
      const el = $(c.inner);
      if (el) revealObserver.observe(el);
    }
  });
  document.querySelectorAll('.journey-transition').forEach(el => jtObserver.observe(el));
  document.querySelectorAll('.extra-section').forEach(el => revealObserver.observe(el));
}

// ---- Minimap click navigation ----
function initMinimap() {
  document.querySelectorAll('.mm-stop').forEach(stop => {
    stop.addEventListener('click', () => {
      const target = stop.dataset.target;
      const el = $(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ---- Parallax on city images ----
function updateParallax() {
  document.querySelectorAll('.city-section').forEach(section => {
    const img = section.querySelector('.parallax-img');
    if (!img) return;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // -0.3 to +0.3 relative to viewport center
    const relPos = (rect.top + rect.height / 2 - vh / 2) / (vh + rect.height);
    const shift = relPos * 60; // px shift
    img.style.transform = `scale(1.08) translateY(${shift}px)`;
  });
}

// ---- Main scroll handler ----
let lastScrollY = window.scrollY;
let ticking = false;

function onScroll() {
  lastScrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

function update() {
  ticking = false;
  const scrollY = lastScrollY;
  const docH = document.documentElement.scrollHeight;
  const vh = window.innerHeight;
  const maxScroll = docH - vh;
  const progress = clamp(scrollY / maxScroll, 0, 1);

  // HUD progress bar
  hudFill.style.width = (progress * 100) + '%';

  // HUD solid backdrop when scrolled
  if (scrollY > 60) hud.classList.add('solid');
  else hud.classList.remove('solid');

  // Which city section is the user in?
  let activeCityIndex = 0;
  CITIES.forEach((c, i) => {
    const el = $(c.section);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Section is "active" when its center passes above mid-screen
    if (rect.top < vh * 0.55) activeCityIndex = i;
  });

  const activeCity = CITIES[activeCityIndex];

  // HUD city name
  if (hudCityName.textContent !== activeCity.name) {
    hudCityName.style.opacity = '0';
    setTimeout(() => {
      hudCityName.textContent = activeCity.name;
      hudCityName.style.opacity = '1';
      hudCityName.style.transition = 'opacity 0.3s';
    }, 200);
  }

  // Vehicle flight class
  // Check if we're in a transition strip
  let inTransition = false;
  document.querySelectorAll('.journey-transition').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.7 && rect.bottom > vh * 0.3) inTransition = true;
  });

  if (inTransition) {
    vehicle.classList.add('in-flight');
  } else {
    vehicle.classList.remove('in-flight');
  }

  // Vehicle Y position: follow the scroll proportionally
  // Moves from top 20% to bottom 80% of viewport as page scrolls
  const vehicleY = lerp(vh * 0.18, vh * 0.82, progress);
  vehicle.style.top = vehicleY + 'px';
  vehicle.style.transform = `translateY(-50%)`;

  // Route line fill: percentage of scroll
  routeFill.style.height = (progress * 100) + '%';

  // Update city dot states + minimap
  CITIES.forEach((c, i) => {
    // Route stop dot
    if (c.dot) {
      const dot = $(c.dot);
      if (dot) {
        if (i === activeCityIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      }
    }
    // Minimap dots
    const mm = $(c.mm);
    if (mm) {
      mm.classList.remove('active', 'visited');
      if (i === activeCityIndex) mm.classList.add('active');
      else if (i < activeCityIndex) mm.classList.add('visited');
    }
  });

  // Parallax
  updateParallax();
}

// ---- Form submission ----
// ---- Timeline Progress ----
function initTimeline() {
  const days = document.querySelectorAll('.itinerary-day');
  if (days.length === 0) return;
  const vh = window.innerHeight;
  
  window.addEventListener('scroll', () => {
    days.forEach(day => {
      const rect = day.getBoundingClientRect();
      if (rect.top < vh * 0.75 && rect.bottom > vh * 0.25) {
        day.classList.add('active');
      } else {
        day.classList.remove('active');
      }
    });
  }, { passive: true });
}

// ---- FAQ Accordion ----
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      // Close others
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
}

function initForm() {
  const btn = $('submitBtn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = $('f-name')?.value.trim();
    const phone = $('f-phone')?.value.trim();
    if (!name || !phone) {
      btn.style.background = 'linear-gradient(135deg, #555, #777)';
      btn.textContent = 'Vui lòng điền tên và số điện thoại!';
      setTimeout(() => {
        btn.style.background = '';
        btn.textContent = 'Gửi Đăng Ký Ngay';
      }, 2500);
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Đang gửi...';
    setTimeout(() => {
      btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
      btn.textContent = 'Đã gửi! Chúng tôi sẽ liên hệ sớm!';
      // Reset after 4s
      setTimeout(() => {
        btn.style.background = '';
        btn.textContent = 'Gửi Đăng Ký Ngay';
        btn.disabled = false;
        // Clear form
        ['f-name', 'f-phone', 'f-email', 'f-guests', 'f-note'].forEach(id => {
          const el = $(id);
          if (el) el.value = '';
        });
      }, 4000);
    }, 1000);
  });
}

// ---- Custom Cursor ----
const cursorDot = $('cursor-dot');
const cursorRing = $('cursor-ring');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

function initCursor() {
  if (!cursorDot || !cursorRing) return;
  if (window.innerWidth <= 900) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  const renderCursor = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  // Hover effects on clickables
  document.querySelectorAll('a, button, input, textarea, select, .mm-stop, .city-hl-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '50px';
      cursorRing.style.height = '50px';
      cursorRing.style.background = 'rgba(212, 168, 71, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '34px';
      cursorRing.style.height = '34px';
      cursorRing.style.background = 'transparent';
    });
  });
}

// ---- Init ----
function init() {
  applyRouteX();
  initObservers();
  initMinimap();
  initTimeline();
  initFAQ();
  initForm();
  initCursor();
  update(); // initial state

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    applyRouteX();
    update();
  });
}

document.addEventListener('DOMContentLoaded', init);
