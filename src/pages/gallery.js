export function initGalleryPage() {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModalBtn = document.getElementById('close-image-modal');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');

    if (!galleryGrid || !modal) return;

    const galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
    let currentIndex = 0;

    function showImage(index) {
        const item = galleryItems[index];
        if (item) {
            const img = item.querySelector('img');
            const caption = item.querySelector('.img-overlay');

            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCaption.textContent = caption ? caption.textContent : '';
            currentIndex = index;
        }
    }

    function openModal(index) {
        showImage(index);
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = galleryItems.indexOf(item);
            openModal(index);
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

    prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % galleryItems.length;
        showImage(newIndex);
    });

    // Swipe functionality
    let touchstartX = 0;
    let touchendX = 0;

    modal.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
    }, false);

    function handleGesture() {
        if (touchendX < touchstartX) { // Swiped left
            nextBtn.click();
        }
        if (touchendX > touchstartX) { // Swiped right
            prevBtn.click();
        }
    }
}