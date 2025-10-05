export function initGalleryPage() {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModalBtn = document.getElementById('close-image-modal');

    if (!galleryGrid || !modal) return;

    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const img = item.querySelector('img');
            const caption = item.querySelector('.img-overlay');

            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCaption.textContent = caption ? caption.textContent : '';

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}