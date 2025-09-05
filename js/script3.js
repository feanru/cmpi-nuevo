document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Before/After Slider
    const initBeforeAfterSlider = () => {
        const slider = document.querySelector('.before-after-slider');
        if (!slider) return;

        const before = slider.querySelector('.before');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;

        const moveSlider = (e) => {
            if (!isDragging) return;
            
            let x;
            if (e.type === 'mousemove') {
                x = e.clientX - slider.getBoundingClientRect().left;
            } else if (e.type === 'touchmove') {
                x = e.touches[0].clientX - slider.getBoundingClientRect().left;
            } else {
                return;
            }
            
            const sliderWidth = slider.offsetWidth;
            let position = (x / sliderWidth) * 100;
            
            // Limit position between 0 and 100
            position = Math.max(0, Math.min(100, position));
            
            before.style.width = `${position}%`;
            handle.style.left = `calc(${position}% - 2px)`; // Adjust for handle width
        };

        const stopDragging = () => {
            isDragging = false;
            document.removeEventListener('mousemove', moveSlider);
            document.removeEventListener('touchmove', moveSlider);
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('touchend', stopDragging);
        };

        handle.addEventListener('mousedown', () => {
            isDragging = true;
            document.addEventListener('mousemove', moveSlider);
            document.addEventListener('mouseup', stopDragging);
        });

        handle.addEventListener('touchstart', () => {
            isDragging = true;
            document.addEventListener('touchmove', moveSlider, { passive: false });
            document.addEventListener('touchend', stopDragging, { passive: false });
        });

        // Initialize slider position
        before.style.width = '50%';
        handle.style.left = 'calc(50% - 2px)';
    };

    // Animate numbers in stats
    const animateStats = () => {
        const stats = document.querySelectorAll('.number');
        if (stats.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetValue = parseInt(target.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const step = targetValue / (duration / 16); // 60fps
                    let current = 0;

                    const updateNumber = () => {
                        current += step;
                        if (current < targetValue) {
                            target.textContent = Math.floor(current);
                            requestAnimationFrame(updateNumber);
                        } else {
                            target.textContent = targetValue;
                        }
                    };

                    updateNumber();
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    };

    // Interactive Map
    const initInteractiveMap = () => {
        const map = document.getElementById('interactive-map');
        if (!map) return;

        const modelInfo = {
            basic: {
                title: 'CMPI Básico',
                description: 'Servicios esenciales de salud preventiva para comunidades pequeñas.',
                features: [
                    'Consultas generales',
                    'Atención básica de enfermería',
                    'Promoción de la salud',
                    'Detección temprana'
                ]
            },
            standard: {
                title: 'CMPI Estándar',
                description: 'Atención integral con especialidades básicas para comunidades medianas.',
                features: [
                    'Todo en CMPI Básico',
                    'Odontología preventiva',
                    'Psicología comunitaria',
                    'Laboratorio básico'
                ]
            },
            premium: {
                title: 'CMPI Premium',
                description: 'Centro médico completo con especialidades avanzadas.',
                features: [
                    'Todo en CMPI Estándar',
                    'Especialidades médicas',
                    'Farmacia comunitaria',
                    'Telemedicina'
                ]
            }
        };

        const renderMap = (model) => {
            const info = modelInfo[model];
            if (!info) return;

            map.innerHTML = `
                <div class="map-content">
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                    <ul class="map-features">
                        ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="map-visual" data-model="${model}">
                    <div class="map-building"></div>
                    <div class="map-community"></div>
                </div>
            `;
        };

        // Handle model selection
        document.querySelectorAll('.map-legend li').forEach(item => {
            item.addEventListener('click', () => {
                const model = item.getAttribute('data-model');
                document.querySelectorAll('.map-legend li').forEach(li => li.classList.remove('active'));
                item.classList.add('active');
                renderMap(model);
            });
        });

        // Initialize with first model
        const firstModel = document.querySelector('.map-legend li').getAttribute('data-model');
        renderMap(firstModel);
        document.querySelector('.map-legend li').classList.add('active');
    };

    // Initialize all components
    initBeforeAfterSlider();
    animateStats();
    initInteractiveMap();

    // Add scroll reveal animation
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const heroContent = hero.querySelector('.hero-content');
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrollPosition / 500);
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('nav ul');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        this.reset();
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});
