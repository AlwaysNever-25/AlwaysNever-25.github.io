class ImageModal {
    constructor() {
        this.modal = document.getElementById('modalOverlay');
        this.modalImage = document.getElementById('modalImage');
        this.closeBtn = document.getElementById('closeBtn');
        this.loading = document.getElementById('loading');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.isOpen = false;
        this.scale = 1;
        this.translate = { x: 0, y: 0 };
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };

        // console.log('Modal:', this.modal);
        // console.log('Modal Image:', this.modalImage);
        // console.log('Close Button:', this.closeBtn);
        // console.log('Loading Spinner:', this.loading);

        if (!this.modal || !this.modalImage || !this.closeBtn || !this.loading || !this.modalContent) {
            console.error('ImageModal: Required DOM elements are missing.');
            return;
        }

        this.init();
    }

    init() {
        const galleryImages = document.querySelectorAll('.images img');
        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => this.openModal(e.target));
        });
        // console.log('Found gallery images:', galleryImages.length);

        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.closeModal();
        });

        // Optional: handle body scroll on modal open/close
        const toggleBodyScroll = () => {
            document.body.style.overflow = this.isOpen ? 'hidden' : '';
        };
        this.modal.addEventListener('transitionstart', toggleBodyScroll);
        this.modal.addEventListener('transitionend', toggleBodyScroll);
    }

    addZoomAndPanListeners() {
        const img = this.modalImage;

        const setTransform = () => {
            img.style.transform = `scale(${this.scale}) translate(${this.translate.x}px, ${this.translate.y}px)`;
        };

        // Zoom with mouse wheel
        img.addEventListener('wheel', (e) => {
            e.preventDefault();

            const zoomIntensity = 0.1;
            const newScale = e.deltaY < 0 ? this.scale + zoomIntensity : this.scale - zoomIntensity;
            this.scale = Math.min(Math.max(newScale, 1), 5); // Clamp between 1x and 5x

            setTransform();
        });

        // Pan with mouse drag
        img.addEventListener('mousedown', (e) => {
            if (this.scale <= 1) return; // Don't pan unless zoomed
            this.isDragging = true;
            this.dragStart = { x: e.clientX - this.translate.x, y: e.clientY - this.translate.y };
            img.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.translate = {
                x: e.clientX - this.dragStart.x,
                y: e.clientY - this.dragStart.y
            };
            setTransform();
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            img.style.cursor = 'default';
        });

        // Reset transform on modal close
        this.modal.addEventListener('transitionend', () => {
            if (!this.isOpen) {
                this.scale = 1;
                this.translate = { x: 0, y: 0 };
                this.modalImage.style.transform = '';
            }
        });

        // Optional: Touch support
        let lastTouchDist = null;

        img.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                lastTouchDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        });

        img.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && lastTouchDist !== null) {
                const newDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const delta = newDist - lastTouchDist;
                const zoomIntensity = 0.005;
                this.scale = Math.min(Math.max(this.scale + delta * zoomIntensity, 1), 5);
                lastTouchDist = newDist;
                setTransform();
            } else if (e.touches.length === 1 && this.scale > 1) {
                e.preventDefault();
                const touch = e.touches[0];
                this.translate.x += touch.clientX - (this.lastTouchX || touch.clientX);
                this.translate.y += touch.clientY - (this.lastTouchY || touch.clientY);
                this.lastTouchX = touch.clientX;
                this.lastTouchY = touch.clientY;
                setTransform();
            }
        });

        img.addEventListener('touchend', () => {
            lastTouchDist = null;
            this.lastTouchX = null;
            this.lastTouchY = null;
        });
    }

    openModal(clickedImage) {
        this.isOpen = true;

        this.loading.style.display = 'block';
        this.modalImage.style.opacity = '0';
        this.modalImage.style.transition = 'opacity 0.3s ease';

        const highResImg = new Image();
        const originalSrc = clickedImage.src;
        const highResSrc = originalSrc.replace('400/400', '800/800');

        highResImg.onload = () => {
            this.modalImage.src = highResImg.src;
            this.modalImage.alt = clickedImage.alt;

            this.loading.style.display = 'none';
            requestAnimationFrame(() => {
                this.modalImage.style.opacity = '1';
            });
        };

        highResImg.onerror = () => {
            // Fallback to original image
            this.modalImage.src = clickedImage.src;
            this.modalImage.alt = clickedImage.alt;

            this.loading.style.display = 'none';
            requestAnimationFrame(() => {
                this.modalImage.style.opacity = '1';
            });
        };

        highResImg.src = highResSrc;

        // Show modal
        this.modal.classList.add('active');

        // Animate modal content if present
        if (this.modalContent) {
            this.modalContent.style.animation = 'none';
            void this.modalContent.offsetWidth; // Force reflow
            this.modalContent.style.animation = 'modalEnter 0.3s ease forwards';
        }

        this.addZoomAndPanListeners();
    }

    closeModal() {
        this.isOpen = false;
        this.modal.classList.remove('active');

        // Reset after animation
        setTimeout(() => {
            this.modalImage.src = '';
            this.modalImage.style.opacity = '1';
            this.loading.style.display = 'none';
        }, 300);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ImageModal();
});

// Add modal entrance animation
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