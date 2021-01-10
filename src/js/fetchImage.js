import imageCard from '../templates/item.hbs';
import { debounce } from "debounce";
import API from './apiService.js';
import refs from './refs.js';
import errMsg from './notifications.js';
// import { length } from 'file-loader';

refs.input.addEventListener('click', clear);
refs.searchForm.addEventListener('submit', onSearchChange);
refs.loadMoreBtn.addEventListener('click', renderNextPage);

function onSearchChange(event) {
    event.preventDefault();
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
        if (query.length < API.perPage) {
            hideLoadBth();
        } else {
            showLoadBth();
        }
    }
};
function showLoadBth() {
    refs.loadMoreBtn.classList.remove('hidden');
};
function hideLoadBth() {
    refs.loadMoreBtn.classList.add('hidden');
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
