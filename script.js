// Enhanced Typewriter — cycles through roles
const roles = ["Infrastructure Guardian", "Systems Administrator", "Risk Analyst", "Enterprise Security Specialist"];
const typeEl = document.getElementById("typewriter");
let ri = 0, ci = 0, deleting = false;

function tick() {
  const role = roles[ri];
  if (!deleting) {
    ci++;
    typeEl.textContent = role.slice(0, ci);
    if (ci === role.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }
  } else {
    ci--;
    typeEl.textContent = role.slice(0, ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(tick, deleting ? 25 : 45);
}
if (typeEl) tick();

// Logo click to scroll to home
const brandLogo = document.querySelector('.brand-logo');
if (brandLogo) {
  brandLogo.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  brandLogo.style.cursor = 'pointer';
}

// Sticky header: add glass when scrolled
const header = document.getElementById('mainHeader');
function onScroll(){
  if (!header) return;
  if (window.scrollY > 32) {
    header.classList.add('glass');
    header.classList.remove('transparent');
  } else {
    header.classList.remove('glass');
    header.classList.add('transparent');
  }
}
if (header) {
  document.addEventListener('scroll', onScroll);
  onScroll(); // initial
}

// Burger Menu Toggle
const burgerMenu = document.getElementById('burgerMenu');
const navMobile = document.getElementById('navMobile');
const navMobileLinks = navMobile ? navMobile.querySelectorAll('a') : [];

function closeMobileMenu() {
  if (burgerMenu && navMobile) {
    burgerMenu.classList.remove('active');
    navMobile.classList.remove('active');
  }
}

if (burgerMenu && navMobile) {
  burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    burgerMenu.classList.toggle('active');
    navMobile.classList.toggle('active');
  });
}

// Close mobile menu on link click
navMobileLinks.forEach(link => {
  link.addEventListener('click', function() {
    closeMobileMenu();
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.header-inner') && !e.target.closest('.nav-mobile')) {
    closeMobileMenu();
  }
});


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


// Render rating dots for skill tags
document.querySelectorAll('.skill-tag').forEach(tag=>{
  const rating = Number(tag.getAttribute('data-rating') || 0);
  const container = tag.querySelector('.rating');
  if (container) {
    for (let i=1;i<=5;i++){
      const dot = document.createElement('i');
      dot.style.background = i <= rating ? 'var(--accent)' : 'rgba(255,255,255,0.06)';
      container.appendChild(dot);
    }
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
document.addEventListener('click', function(e) {
  if (!e.target.closest('.value-card')) {
    document.querySelectorAll('.value-card').forEach(card => {
      card.classList.remove('active');
    });
  }
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

// Project 1 Learn More inline expand
const project1Button = document.getElementById('project1LearnMore');
const project1Expand = document.getElementById('project1Expand');
let project1CloseTimer = null;

if (project1Button && project1Expand) {
  project1Button.addEventListener('click', function() {
    const isOpen = project1Expand.style.display === 'block';
    if (isOpen) {
      project1Expand.style.display = 'none';
      project1Button.textContent = 'Learn More ▼';
    } else {
      project1Expand.style.display = 'block';
      project1Button.textContent = 'Hide Details ▲';
    }
  });

  project1Expand.addEventListener('mouseleave', function() {
    project1CloseTimer = setTimeout(() => {
      project1Expand.style.display = 'none';
      if (project1Button) {
        project1Button.textContent = 'Learn More ▼';
      }
    }, 180);
  });

  project1Expand.addEventListener('mouseenter', function() {
    if (project1CloseTimer) {
      clearTimeout(project1CloseTimer);
      project1CloseTimer = null;
    }
  });
}

// Project 2 Learn More inline expand
const project2Button = document.getElementById('project2LearnMore');
const project2Expand = document.getElementById('project2Expand');
let project2CloseTimer = null;

if (project2Button && project2Expand) {
  project2Button.addEventListener('click', function() {
    const isOpen = project2Expand.style.display === 'block';
    if (isOpen) {
      project2Expand.style.display = 'none';
      project2Button.textContent = 'Learn More ▼';
    } else {
      project2Expand.style.display = 'block';
      project2Button.textContent = 'Hide Details ▲';
    }
  });

  project2Expand.addEventListener('mouseleave', function() {
    project2CloseTimer = setTimeout(() => {
      project2Expand.style.display = 'none';
      if (project2Button) {
        project2Button.textContent = 'Learn More ▼';
      }
    }, 180);
  });

  project2Expand.addEventListener('mouseenter', function() {
    if (project2CloseTimer) {
      clearTimeout(project2CloseTimer);
      project2CloseTimer = null;
    }
  });
}

// Project 3 Learn More inline expand
const project3Button = document.getElementById('project3LearnMore');
const project3Expand = document.getElementById('project3Expand');
let project3CloseTimer = null;

if (project3Button && project3Expand) {
  project3Button.addEventListener('click', function() {
    const isOpen = project3Expand.style.display === 'block';
    if (isOpen) {
      project3Expand.style.display = 'none';
      project3Button.textContent = 'Learn More ▼';
    } else {
      project3Expand.style.display = 'block';
      project3Button.textContent = 'Hide Details ▲';
    }
  });

  project3Expand.addEventListener('mouseleave', function() {
    project3CloseTimer = setTimeout(() => {
      project3Expand.style.display = 'none';
      if (project3Button) {
        project3Button.textContent = 'Learn More ▼';
      }
    }, 180);
  });

  project3Expand.addEventListener('mouseenter', function() {
    if (project3CloseTimer) {
      clearTimeout(project3CloseTimer);
      project3CloseTimer = null;
    }
  });
}

// Project 4 Learn More inline expand
const project4Button = document.getElementById('project4LearnMore');
const project4Expand = document.getElementById('project4Expand');
let project4CloseTimer = null;

if (project4Button && project4Expand) {
  project4Button.addEventListener('click', function() {
    const isOpen = project4Expand.style.display === 'block';
    if (isOpen) {
      project4Expand.style.display = 'none';
      project4Button.textContent = 'Learn More ▼';
    } else {
      project4Expand.style.display = 'block';
      project4Button.textContent = 'Hide Details ▲';
    }
  });

  project4Expand.addEventListener('mouseleave', function() {
    project4CloseTimer = setTimeout(() => {
      project4Expand.style.display = 'none';
      if (project4Button) {
        project4Button.textContent = 'Learn More ▼';
      }
    }, 180);
  });

  project4Expand.addEventListener('mouseenter', function() {
    if (project4CloseTimer) {
      clearTimeout(project4CloseTimer);
      project4CloseTimer = null;
    }
  });
}

// Keyboard escape to close any open popups
// (Modal code still works elsewhere.)
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(modal => {
      closeModal(modal.id);
    });
    if (project1Expand) {
      project1Expand.style.display = 'none';
      if (project1Button) {
        project1Button.textContent = 'Learn More ▼';
      }
    }
    if (project2Expand) {
      project2Expand.style.display = 'none';
      if (project2Button) {
        project2Button.textContent = 'Learn More ▼';
      }
    }
    if (project3Expand) {
      project3Expand.style.display = 'none';
      if (project3Button) {
        project3Button.textContent = 'Learn More ▼';
      }
    }
    if (project4Expand) {
      project4Expand.style.display = 'none';
      if (project4Button) {
        project4Button.textContent = 'Learn More ▼';
      }
    }
  }
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

