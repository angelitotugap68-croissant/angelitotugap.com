// Typewriter — cycles through roles
const roles = ["DevOps.", "Systems Administrator.", "Technical Support.", "Risk Analyst."];
const typeEl = document.getElementById("typewriter");
let ri = 0, ci = 0, deleting = false;

function tick() {
  const role = roles[ri];
  if (!deleting) {
    ci++;
    typeEl.textContent = role.slice(0, ci) + "";
    if (ci === role.length) {
      deleting = true;
      setTimeout(tick, 900);
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
  setTimeout(tick, deleting ? 30 : 60);
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

document.addEventListener('DOMContentLoaded', () => {
  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalToggle = document.getElementById('terminal-toggle');
  const closeTerminal = document.getElementById('close-terminal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  // Open Terminal
  terminalToggle.addEventListener('click', () => {
    terminalOverlay.classList.remove('hidden');
    terminalInput.focus();
  });

  // Close Terminal
  closeTerminal.addEventListener('click', () => {
    terminalOverlay.classList.add('hidden');
  });

  // Handle Commands on Enter Key
  terminalInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      
      // Print the command the user just typed
      printToTerminal(`guest@system:~$ ${command}`, 'highlight');
      
      // Process the command
      processCommand(command);
      
      // Clear input and scroll to bottom
      terminalInput.value = '';
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  function processCommand(cmd) {
    switch(cmd) {
      case 'help':
        printToTerminal("Available commands: <br> - <b>whoami</b>: View system admin profile <br> - <b>ls skills</b>: Display technical toolkit <br> - <b>clear</b>: Clear the terminal");
        break;
      case 'whoami':
        printToTerminal("L2 IT Technical Support & Risk Analyst. 8+ years securing infrastructure, mitigating financial risks, and keeping systems online. Currently managing 10,000+ lifecycles.");
        break;
      case 'ls skills':
        printToTerminal("Infrastructure: Active Directory, Microsoft 365, macOS/Linux/Windows <br> Security: Kali Linux, Fraud Mitigation, Threat Detection <br> Dev: HTML, C++, GitHub");
        break;
      case 'clear':
        terminalOutput.innerHTML = '';
        break;
      case '':
        break; // Do nothing on empty enter
      default:
        printToTerminal(`Command not found: ${cmd}. Type 'help' for a list of commands.`, 'error');
    }
  }

  function printToTerminal(text, className = '') {
    const newLine = document.createElement('p');
    newLine.innerHTML = text;
    if(className) newLine.classList.add(className);
    newLine.style.margin = '5px 0';
    
    // Add red color for errors via inline style for simplicity
    if(className === 'error') newLine.style.color = '#ff5555'; 
    
    terminalOutput.appendChild(newLine);
  }
});
