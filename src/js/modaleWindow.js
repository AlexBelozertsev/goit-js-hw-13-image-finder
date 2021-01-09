import refs from './refs.js';

const imageCards = document.querySelector('.gallery');

imageCards.addEventListener('click', onGalleryClick);
refs.closeLightboxBtn.addEventListener('click', closeLightboxHandler);
refs.lightboxOverlay.addEventListener('click', onClickOverlay);


function onGalleryClick(event) {
  event.preventDefault();console.log(event.target);
    if (event.target.nodeName !== 'IMG') {
    return
    };

    const imageUrl = event.target.dataset.source;
    refs.lightboxImage.src = imageUrl;
    refs.lightboxCard.classList.add('is-open');
    addKeydownListener();
};

function onClickOverlay(event) {
     if (event.target === event.currentTarget) {
        closeLightboxHandler()
    }
};
function onPressEscape(event) {
    if (event.code === 'Escape') {
        closeLightboxHandler()
        }
};
function closeLightboxHandler() {
    removeKeydownListener();
    refs.lightboxCard.classList.remove('is-open');
    refs.lightboxImage.src = '#';
};
function addKeydownListener() {
    window.addEventListener('keydown', onPressEscape);
};
function removeKeydownListener() {
    window.removeEventListener('keydown', onPressEscape);
};

