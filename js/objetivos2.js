document.addEventListener('DOMContentLoaded', function() {
    // Elementos del parallax
    const parallaxBackground = document.querySelector('.parallax__background');
    const floatingIcon = document.querySelector('.floating-icon');
    const cards = document.querySelectorAll('.card');
    const infoSections = document.querySelectorAll('.info-section');
    
    // Ajustar la posición inicial
    function setInitialPosition() {
        const scrollY = window.scrollY;
        if (parallaxBackground) {
            parallaxBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        if (floatingIcon) {
            floatingIcon.style.transform = `translateY(${-scrollY * 0.2}px)`;
        }
    }
    
    // Efecto de paralaje suave
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Mover el fondo
        if (parallaxBackground) {
            parallaxBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        // Mover el ícono flotante
        if (floatingIcon) {
            floatingIcon.style.transform = `translateY(${-scrollY * 0.2}px)`;
            const opacity = 1 - (scrollY / 500);
            floatingIcon.style.opacity = opacity > 0 ? opacity : 0;
        }
        
        // Efecto parallax en las tarjetas
        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + (cardRect.height / 2);
            const windowCenter = window.innerHeight / 2;
            const distanceFromCenter = cardCenter - windowCenter;
            
            // Aplicar transformación basada en la posición de desplazamiento
            // con diferentes velocidades para cada tarjeta
            const speed = 0.1 + (index * 0.05);
            const offset = distanceFromCenter * speed;
            
            // Aplicar transformación solo si la tarjeta está visible
            if (cardRect.top < window.innerHeight && cardRect.bottom > 0) {
                card.style.transform = `translateY(${offset}px)`;
                
                // Efecto de opacidad suave
                const opacity = 1 - Math.abs(distanceFromCenter / window.innerHeight);
                card.style.opacity = Math.max(0.7, opacity);
            }
        });
        
        // Animación de aparición de las secciones
        infoSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar el evento de scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
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
    
    // Ajustar altura del parallax
    function adjustParallaxHeight() {
        const parallax = document.querySelector('.parallax');
        if (parallax) {
            parallax.style.height = `${window.innerHeight}px`;
        }
    }
    
    // Inicialización
    window.addEventListener('resize', adjustParallaxHeight);
    adjustParallaxHeight();
    
    // Forzar un renderizado inicial
    setTimeout(handleScroll, 100);
});
