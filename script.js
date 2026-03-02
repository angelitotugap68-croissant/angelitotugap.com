// Enhanced Typewriter — cycles through roles
const roles = ["Infrastructure Guardian", "DevOps Architect", "Systems Administrator", "Risk Analyst", "Enterprise Security Specialist"];
const typeEl = document.getElementById("typewriter");
let ri = 0, ci = 0, deleting = false;

function tick() {
  const role = roles[ri];
  if (!deleting) {
    ci++;
    typeEl.textContent = role.slice(0, ci) + "";
    if (ci === role.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }
  } else {
    ci--;
    typeEl.textContent = role.slice(0, ci) + "";
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(tick, deleting ? 25 : 45);
}
if (typeEl) tick();

// Sticky header: add glass when scrolled
const header = document.getElementById('mainHeader');
function onScroll(){
  if (window.scrollY > 32) {
    header.classList.add('glass');
    header.classList.remove('transparent');
  } else {
    header.classList.remove('glass');
    header.classList.add('transparent');
  }
}
document.addEventListener('scroll', onScroll);
onScroll(); // initial

// Active nav highlighting based on scroll position
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // initial

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Timeline reveal: intersection observer
const items = document.querySelectorAll('.timeline-item');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
},{threshold:0.12});
items.forEach(i=>io.observe(i));

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Magnetic Cursor Enhancement
document.addEventListener('mousemove', (e) => {
  const buttons = document.querySelectorAll('.btn, .honeycomb-item');
  buttons.forEach(btn => {
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distance = Math.sqrt(Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2));
    
    if (distance < 100) {
      const angle = Math.atan2(e.clientY - btnCenterY, e.clientX - btnCenterX);
      const pullX = Math.cos(angle) * (100 - distance) * 0.15;
      const pullY = Math.sin(angle) * (100 - distance) * 0.15;
      btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    } else {
      btn.style.transform = '';
    }
  });
});

// Render rating dots for skill tags
document.querySelectorAll('.skill-tag').forEach(tag=>{
  const rating = Number(tag.getAttribute('data-rating') || 0);
  const container = tag.querySelector('.rating');
  for (let i=1;i<=5;i++){
    const dot = document.createElement('i');
    dot.style.background = i <= rating ? 'var(--accent)' : 'rgba(255,255,255,0.06)';
    container.appendChild(dot);
  }
});

// Value card click expansion
document.querySelectorAll('.value-card').forEach(card => {
  card.addEventListener('click', function(e) {
    e.stopPropagation();
    // Close other cards
    document.querySelectorAll('.value-card').forEach(c => {
      if (c !== this) {
        c.classList.remove('active');
      }
    });
    // Toggle current card
    this.classList.toggle('active');
  });
});

// Close cards when clicking outside
document.addEventListener('click', function() {
  document.querySelectorAll('.value-card').forEach(card => {
    card.classList.remove('active');
  });
});

// ==============================
// MODAL SYSTEM - Glassmorphism HUD
// ==============================

// Function to open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'flex';
    // Add slight delay for animation
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  }
}

// Function to close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}

// Close modal when clicking outside content
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    const modalId = event.target.id;
    closeModal(modalId);
  }
});

// Proficiency card click handlers
document.querySelectorAll('.proficiency-card').forEach(card => {
  card.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal-id');
    if (modalId) {
      openModal(modalId);
    }
  });
});

// Keyboard escape to close modal
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(modal => {
      closeModal(modal.id);
    });
  }
});

// Add cursor pointer style to proficiency cards
document.querySelectorAll('.proficiency-card').forEach(card => {
  card.style.cursor = 'pointer';
});

// ==============================
// SCROLL PROGRESS BAR
// ==============================

const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

