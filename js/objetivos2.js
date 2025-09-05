document.addEventListener('DOMContentLoaded', function() {
    // Efecto parallax
    const parallaxBackground = document.querySelector('.parallax__background');
    const floatingIcon = document.querySelector('.floating-icon');
    const infoSections = document.querySelectorAll('.info-section');
    
    // Ajustar la posición inicial del fondo
    function setInitialPosition() {
        const scrollY = window.scrollY;
        parallaxBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
        floatingIcon.style.transform = `translateY(${-scrollY * 0.2}px)`;
    }
    
    // Efecto de paralaje al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Mover el fondo a diferente velocidad
        if (parallaxBackground) {
            parallaxBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        // Mover el ícono en dirección opuesta
        if (floatingIcon) {
            floatingIcon.style.transform = `translateY(${-scrollY * 0.2}px)`;
            
            // Efecto de opacidad al hacer scroll
            const opacity = 1 - (scrollY / 500);
            floatingIcon.style.opacity = opacity > 0 ? opacity : 0;
        }
        
        // Animación de las secciones al hacer scroll
        infoSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Inicializar posiciones
    setInitialPosition();
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Asegurar que el fondo ocupe toda la pantalla inicialmente
    function adjustParallaxHeight() {
        const parallax = document.querySelector('.parallax');
        if (parallax) {
            parallax.style.height = `${window.innerHeight}px`;
        }
    }
    
    // Ajustar al cargar y al redimensionar
    window.addEventListener('resize', adjustParallaxHeight);
    adjustParallaxHeight();
});
