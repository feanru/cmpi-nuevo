// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const progressBar = document.querySelector('.progress-bar');
const scrollIndicator = document.querySelector('.scroll-indicator');
const animateElements = document.querySelectorAll('.animate-on-scroll');
const serviceNavBtns = document.querySelectorAll('.service-nav-btn');
const servicePanels = document.querySelectorAll('.service-panel');
const viewOptions = document.querySelectorAll('.view-option');
const comparisonViews = document.querySelectorAll('.comparison-view');
const timelineItems = document.querySelectorAll('.timeline-item');
const modal = document.getElementById('contact-modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  // Add/remove scrolled class to navbar
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update progress bar
  updateProgressBar();
  
  // Animate elements on scroll
  animateOnScroll();
  
  // Animate timeline
  animateTimeline();
});

// Update scroll progress bar
function updateProgressBar() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = (window.scrollY / documentHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Animate elements on scroll
function animateOnScroll() {
  animateElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 50) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Initialize animation on page load
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial animation check
  animateOnScroll();
  
  // Initialize service panels
  if (servicePanels.length > 0) {
    servicePanels[0].classList.add('active');
  }
  
  // Initialize comparison view
  if (comparisonViews.length > 0) {
    comparisonViews[0].classList.add('active');
  }
  
  // Initialize counters
  initCounters();
});

// Service navigation
serviceNavBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetService = btn.getAttribute('data-service');
    
    // Update active button
    serviceNavBtments.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update active panel
    servicePanels.forEach(panel => {
      if (panel.getAttribute('data-service') === targetService) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  });
});

// Comparison view toggle
viewOptions.forEach(option => {
  option.addEventListener('click', () => {
    const view = option.getAttribute('data-view');
    
    // Update active button
    viewOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    
    // Show selected view
    comparisonViews.forEach(viewEl => {
      if (viewEl.id === `${view}-view`) {
        viewEl.classList.add('active');
      } else {
        viewEl.classList.remove('active');
      }
    });
  });
});

// Animate timeline on scroll
function animateTimeline() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  
  const timelineTop = timeline.getBoundingClientRect().top;
  const timelineHeight = timeline.offsetHeight;
  const windowHeight = window.innerHeight;
  
  if (timelineTop < windowHeight * 0.8) {
    const scrollPercent = (window.scrollY - (timeline.offsetTop - windowHeight * 0.2)) / (timelineHeight * 0.6);
    const progress = Math.min(Math.max(scrollPercent, 0), 1);
    
    // Update timeline progress bar
    document.querySelector('.timeline-progress').style.transform = `scaleY(${progress})`;
    
    // Update timeline items
    const itemCount = timelineItems.length;
    timelineItems.forEach((item, index) => {
      const itemProgress = (progress * itemCount - index) * 1.5;
      if (itemProgress > 0.3) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

// Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.classList.remove('no-scroll');
}

// Modal event listeners
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = trigger.getAttribute('data-modal');
    openModal(modalId);
  });
});

closeModal.addEventListener('click', closeAllModals);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeAllModals();
  }
});

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    
    // Reset form and close modal
    contactForm.reset();
    closeAllModals();
  });
}

// Animated counters
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = (target * 10) / (duration / 10);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          
          if (current < target) {
            counter.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
            
            // Add + to counters that should have it
            if (counter.classList.contains('counter-plus') && !counter.textContent.endsWith('+')) {
              counter.textContent += '+';
            }
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Lazy load images and videos
function lazyLoadMedia() {
  const lazyMedia = document.querySelectorAll('img[data-src], video[data-src]');
  
  const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const media = entry.target;
        media.src = media.dataset.src;
        media.removeAttribute('data-src');
        observer.unobserve(media);
      }
    });
  };
  
  const mediaObserver = new IntersectionObserver(lazyLoad, {
    root: null,
    rootMargin: '200px',
    threshold: 0
  });
  
  lazyMedia.forEach(media => {
    mediaObserver.observe(media);
  });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadMedia);

// Parallax effect for elements with data-parallax attribute
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  const handleParallax = () => {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.2;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  };
  
  window.addEventListener('scroll', handleParallax);
  window.addEventListener('resize', handleParallax);
  handleParallax();
}

// Initialize parallax effects
document.addEventListener('DOMContentLoaded', initParallax);

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Handle compare buttons
const compareButtons = document.querySelectorAll('.compare-btn');
compareButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const model = button.getAttribute('data-model');
    
    // Scroll to comparison section
    const comparisonSection = document.getElementById('comparador');
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: 'smooth' });
      
      // Highlight the selected model in the comparison table
      highlightModelInComparison(model);
    }
  });
});

function highlightModelInComparison(model) {
  // Remove highlight from all rows
  document.querySelectorAll('.comparison-table tr').forEach(row => {
    row.classList.remove('highlight');
  });
  
  // Add highlight to the selected model's row
  const rows = document.querySelectorAll('.comparison-table tbody tr');
  rows.forEach(row => {
    if (row.cells[0].textContent.trim().toLowerCase().includes(model)) {
      row.classList.add('highlight');
      
      // Scroll the row into view
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Initialize tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    const tooltipText = element.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    element.appendChild(tooltip);
    
    element.addEventListener('mouseenter', () => {
      tooltip.classList.add('visible');
    });
    
    element.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
}

document.addEventListener('DOMContentLoaded', initTooltips);
