import imageCard from '../templates/item.hbs';
import { debounce } from "debounce";
import API from './apiService.js';
import refs from './refs.js';
import errMsg from './notifications.js';
import { length } from 'file-loader';

refs.input.addEventListener('click', clear);
refs.input.addEventListener('input', debounce(onSearchChange, 800));
refs.loadMoreBtn.addEventListener('click', renderNextPage);

function onSearchChange() {
    clear();
    API.resetPage();
    const nameInput = refs.input.value;
    let query = '';

    if (nameInput.length > 0 && nameInput.trim() !== '') {
        query = nameInput.trim();
    } else {
        return;
    };

    API.fetchImages(query)
    .then(renderImageCard)
    .catch(onFetchErr)
};

function renderImageCard(query) {
    if (query.length === 0) {
        onFetchErr();
        clearInput();
    } else {
        const markup = imageCard(query);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
        showLoadBth();
    }
};
function showLoadBth() {
    refs.loadMoreBtn.style.opacity = 1;
};
function hideLoadBth() {
    refs.loadMoreBtn.style.opacity = 0;
}
function scrollDown() {
    window.scrollBy({
          top: window.innerHeight - 90,
          behavior: 'smooth',
        });
};
function onFetchErr() {
    errMsg.notFound();
};
function clear() {
    refs.gallery.innerHTML = '';
    hideLoadBth();
};
function clearInput() {
    refs.input.value = '';
};
function renderNextPage() {
    API.setPage();
    API.fetchImages(undefined)
        .then(renderImageCard)
    .then(debounce(scrollDown,300))
    
}
