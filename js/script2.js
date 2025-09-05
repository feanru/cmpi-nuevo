// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scrolled-down')) {
            // Scroll down
            navbar.classList.add('scrolled-down');
            navbar.classList.remove('scrolled-up');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled-down')) {
            // Scroll up
            navbar.classList.add('scrolled-up');
            navbar.classList.remove('scrolled-down');
        }
        
        navbar.classList.add('scrolled');
        lastScroll = currentScroll;
    });
    
    // Services data
    const services = [
        {
            icon: 'fa-stethoscope',
            title: 'Consulta Externa',
            description: 'Atención médica general para el diagnóstico y tratamiento de enfermedades comunes.'
        },
        {
            icon: 'fa-tooth',
            title: 'Odontología',
            description: 'Cuidado dental integral para toda la familia con tecnología de punta.'
        },
        {
            icon: 'fa-brain',
            title: 'Psicología',
            description: 'Acompañamiento profesional para el bienestar mental y emocional.'
        },
        {
            icon: 'fa-user-md',
            title: 'Especialidades',
            description: 'Atención especializada en diversas áreas médicas con profesionales calificados.'
        },
        {
            icon: 'fa-apple-alt',
            title: 'Nutrición',
            description: 'Asesoría nutricional personalizada para mejorar tu calidad de vida.'
        },
        {
            icon: 'fa-flask',
            title: 'Laboratorio',
            description: 'Análisis clínicos confiables con resultados rápidos y precisos.'
        }
    ];
    
    // Render services
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card" data-aos="fade-up">
                <i class="fas ${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-details">
                    <a href="#contacto" class="btn btn-outline">Más información</a>
                </div>
            </div>
        `).join('');
    }
    
    // Centers data
    const centers = [
        {
            title: 'CMPI Básico',
            image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Atención primaria en comunidades pequeñas con servicios esenciales de salud.',
            capacity: 'Hasta 5,000 habitantes',
            services: 'Consulta general, primeros auxilios, farmacia básica'
        },
        {
            title: 'CMPI Intermedio',
            image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Amplia gama de servicios médicos para comunidades medianas.',
            capacity: '5,000 - 15,000 habitantes',
            services: 'Especialidades básicas, laboratorio, odontología, farmacia'
        },
        {
            title: 'CMPI Mayor',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Centro médico completo con múltiples especialidades y equipamiento avanzado.',
            capacity: '15,000 - 50,000 habitantes',
            services: 'Especialidades médicas, laboratorio, imagenología, urgencias 24/7'
        },
        {
            title: 'CMPI Micro',
            image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Unidades móviles para atención en zonas de difícil acceso.',
            capacity: 'Comunidades remotas',
            services: 'Atención básica, vacunación, medicina preventiva'
        }
    ];
    
    // Render centers
    const centersGrid = document.querySelector('.centers-grid');
    if (centersGrid) {
        centersGrid.innerHTML = centers.map(center => `
            <div class="center-card" data-aos="fade-up">
                <div class="center-image">
                    <img src="${center.image}" alt="${center.title}">
                </div>
                <div class="center-content">
                    <h3>${center.title}</h3>
                    <p>${center.description}</p>
                    <div class="center-details">
                        <p><strong>Población:</strong> ${center.capacity}</p>
                        <p><strong>Servicios:</strong> ${center.services}</p>
                    </div>
                    <a href="#contacto" class="btn btn-outline">Solicitar información</a>
                </div>
            </div>
        `).join('');
    }
    
    // Workflow timeline data
    const workflowSteps = [
        {
            title: 'Análisis de Necesidades',
            description: 'Evaluamos las necesidades específicas de salud de la comunidad.'
        },
        {
            title: 'Diseño del Proyecto',
            description: 'Creamos un plan personalizado para el centro médico.'
        },
        {
            title: 'Implementación',
            description: 'Instalación de infraestructura y equipamiento médico.'
        },
        {
            title: 'Capacitación',
            description: 'Entrenamiento al personal médico y administrativo.'
        },
        {
            title: 'Puesta en Marcha',
            description: 'Inicio de operaciones con seguimiento continuo.'
        }
    ];
    
    // Render workflow timeline
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timeline.innerHTML = workflowSteps.map((step, index) => `
            <div class="timeline-item" data-aos="fade-${index % 2 === 0 ? 'right' : 'left'}">
                <div class="timeline-content">
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Animated counters
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the faster
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Animate checklist items
        const checklistItems = document.querySelectorAll('.checklist li');
        checklistItems.forEach((item, index) => {
            if (isInViewport(item) && !item.dataset.checked) {
                setTimeout(() => {
                    item.classList.add('checked');
                    item.dataset.checked = 'true';
                }, index * 300);
            }
        });
        
        // Animate counters
        const counterSection = document.querySelector('.goals');
        if (counterSection && isInViewport(counterSection)) {
            animateCounters();
        }
    }
    
    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Modal functionality
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.querySelector('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            
            // Reset form
            this.reset();
            
            // Close modal
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});
