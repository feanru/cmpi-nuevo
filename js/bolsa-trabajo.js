document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the position to scroll to, accounting for fixed header
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Job filtering functionality
    const searchInput = document.querySelector('.search-input');
    const locationFilter = document.querySelector('.location-filter');
    const jobTypeFilter = document.querySelector('.job-type-filter');
    const jobCards = document.querySelectorAll('.job-card');

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const locationTerm = locationFilter.value.toLowerCase();
        const jobTypeTerm = jobTypeFilter.value.toLowerCase();

        jobCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.job-location span').textContent.toLowerCase();
            const jobType = card.querySelector('.job-type').classList.contains('full-time') ? 'tiempo-completo' : 'medio-tiempo';
            
            const matchesSearch = title.includes(searchTerm) || 
                                Array.from(card.querySelectorAll('.job-requirements li'))
                                    .some(li => li.textContent.toLowerCase().includes(searchTerm));
            
            const matchesLocation = location.includes(locationTerm) || !locationTerm;
            const matchesJobType = jobType.includes(jobTypeTerm) || !jobTypeTerm;

            if (matchesSearch && matchesLocation && matchesJobType) {
                card.style.display = 'block';
                // Add animation class
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners for filters
    [searchInput, locationFilter, jobTypeFilter].forEach(filter => {
        filter.addEventListener('change', filterJobs);
        if (filter === searchInput) {
            filter.addEventListener('keyup', filterJobs);
        }
    });

    // Form submission handling
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
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
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>¡Gracias por tu solicitud! Hemos recibido tu información y nos pondremos en contacto contigo pronto.</p>
            `;
            
            // Clear the form
            this.reset();
            
            // Insert success message
            this.parentNode.insertBefore(successMessage, this);
            
            // Scroll to show the success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 5000);
        });
    }

    // Add animation on scroll for job cards
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.job-card, .benefit-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If card is in viewport
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.job-card, .benefit-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add animation for form elements
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Add animation for file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'Ningún archivo seleccionado';
            const fileLabel = this.nextElementSibling || this.parentElement.querySelector('.file-name');
            
            if (fileLabel) {
                fileLabel.textContent = fileName;
                fileLabel.style.display = 'block';
            }
        });
    }
});

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .success-message {
        background-color: #e8f5e9;
        color: #2e7d32;
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: fadeIn 0.3s ease-in-out;
        transition: opacity 0.3s ease;
    }
    
    .success-message i {
        font-size: 2rem;
    }
    
    .success-message p {
        margin: 0;
        line-height: 1.5;
    }
    
    /* File input styling */
    .file-input-container {
        position: relative;
        margin-bottom: 20px;
    }
    
    .file-input-label {
        display: block;
        padding: 12px 15px;
        background-color: #f5f5f5;
        border: 1px dashed #ccc;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .file-input-label:hover {
        background-color: #eee;
        border-color: #999;
    }
    
    .file-name {
        display: none;
        margin-top: 5px;
        font-size: 0.9rem;
        color: #666;
    }
    
    /* Form group focus effect */
    .form-group {
        position: relative;
    }
    
    .form-group.focused label {
        color: var(--primary-color);
        transform: translateY(-5px);
        font-size: 0.9rem;
    }
    
    .form-group label {
        position: absolute;
        left: 15px;
        top: 12px;
        background: white;
        padding: 0 5px;
        transition: all 0.3s ease;
        pointer-events: none;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding-top: 20px !important;
    }
`;

document.head.appendChild(style);
