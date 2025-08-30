class ImageModal {
    constructor() {
        this.modal = document.getElementById('modalOverlay');
        this.modalImage = document.getElementById('modalImage');
        this.closeBtn = document.getElementById('closeBtn');
        this.loading = document.getElementById('loading');
        this.isOpen = false;

        this.init();
    }

    init() {
        // Add click listeners to all gallery images
        const galleryImages = document.querySelectorAll('.image-item img');
        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => this.openModal(e.target));
        });

        // Close modal listeners
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });

        // Prevent body scroll when modal is open
        this.modal.addEventListener('transitionstart', () => {
            if (this.isOpen) {
                document.body.style.overflow = 'hidden';
            }
        });

        this.modal.addEventListener('transitionend', () => {
            if (!this.isOpen) {
                document.body.style.overflow = '';
            }
        });
    }

    openModal(clickedImage) {
        this.isOpen = true;

        // Show loading spinner
        this.loading.style.display = 'block';
        this.modalImage.style.opacity = '0';

        // Create high-res version of the image
        const highResImg = new Image();

        highResImg.onload = () => {
            this.modalImage.src = highResImg.src;
            this.modalImage.alt = clickedImage.alt;

            // Hide loading and show image
            this.loading.style.display = 'none';
            this.modalImage.style.opacity = '1';
            this.modalImage.style.transition = 'opacity 0.3s ease';
        };

        highResImg.onerror = () => {
            // Fallback to original image if high-res fails
            this.modalImage.src = clickedImage.src;
            this.modalImage.alt = clickedImage.alt;
            this.loading.style.display = 'none';
            this.modalImage.style.opacity = '1';
        };

        // Load higher resolution image
        const originalSrc = clickedImage.src;
        const highResSrc = originalSrc.replace('400/400', '800/800');
        highResImg.src = highResSrc;

        // Show modal with animation
        this.modal.classList.add('active');

        // Add subtle entrance animation
        setTimeout(() => {
            this.modal.querySelector('.modal-content').style.animation = 'modalEnter 0.3s ease forwards';
        }, 10);
    }

    closeModal() {
        this.isOpen = false;
        this.modal.classList.remove('active');

        // Reset image
        setTimeout(() => {
            this.modalImage.src = '';
            this.modalImage.style.opacity = '1';
            this.loading.style.display = 'none';
        }, 300);
    }
}

// Initialize the modal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImageModal();
});

// Add some extra CSS animations
const style = document.createElement('style');
style.textContent = `
            @keyframes modalEnter {
                from {
                    transform: scale(0.9) translateY(20px);
                    opacity: 0.8;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
        `;
document.head.appendChild(style);