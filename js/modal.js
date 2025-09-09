// Inicialización del modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalServiceTitle');
    const modalDescription = document.getElementById('modalServiceDescription');
    const modalImage = document.getElementById('modalServiceImage');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Función para abrir el modal
    function openModal(button) {
        const serviceName = button.dataset.service;
        let description = button.dataset.description;
        const image = button.dataset.image;
        
        // Replace newlines with <br> and handle bullet points
        description = description
            .replace(/\n\n/g, '</p><p>') // Double newlines become new paragraphs
            .replace(/\n•/g, '</p><p>•') // Newline with bullet becomes new paragraph with bullet
            .replace(/\n/g, '<br>'); // Single newlines become line breaks
            
        // Wrap the description in paragraphs
        if (!description.startsWith('<p>')) {
            description = '<p>' + description + '</p>';
        }
        
        modalTitle.textContent = serviceName;
        modalDescription.innerHTML = description;
        modalImage.src = image;
        modalImage.alt = serviceName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
    
    // Event listeners para los botones "Más información"
    document.querySelectorAll('.service-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(this);
        });
    });
    
    // Cerrar modal al hacer clic en la X
    closeModalBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic en el botón Cerrar
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
