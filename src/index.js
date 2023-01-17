import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FotoApiService from './fetchFoto';
import { Notify } from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
  photoCard: document.querySelector('.photo-card'),
  guard: document.querySelector('.js-guard'),
};
const option = {
  root: null,
  rootMargin: '200px',
  treshold: 1.0,
};
refs.searchForm.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadBtn);
refs.gallery.addEventListener('click', onClickImg);
refs.loadBtn.style.visibility = 'hidden';
refs.guard.style.visibility = 'hidden';

const fotoApiService = new FotoApiService();
const observer = new IntersectionObserver(onLoad, option);

function onSearch(evt) {
  evt.preventDefault();

  fotoApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (!fotoApiService.query) {
    return onEmptyInput();
  }
  fotoApiService.resetPage();
  fotoApiService
    .fetchFoto()
    .then(data => {
      if (!data.totalHits) {
        return onError();
      }
      clearContainer();
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.gallery.insertAdjacentHTML('beforeend', renderFotoList(data.hits));
      observer.observe(refs.guard);
      refs.loadBtn.style.visibility = 'visible';
    })
    .catch(error => Notify.failure(error.massage));
}

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fotoApiService
        .fetchFoto()
        .then(data => {
          refs.gallery.insertAdjacentHTML(
            'beforeend',
            renderFotoList(data.hits)
          );

          if (data.page === data.pages) {
            refs.loadBtn.style.visibility = 'hidden';
            refs.guard.style.visibility = 'visible';
          }
        })
        .catch(error => Notify.failure(error.massage));
    }
  });
}

function onLoadBtn() {
  fotoApiService
    .fetchFoto()
    .then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', renderFotoList(data.hits));

      if (data.page === data.pages) {
        refs.loadBtn.style.visibility = 'hidden';
        refs.guard.style.visibility = 'visible';
      }
    })
    .catch(error => Notify.failure(error.massage));
}

function renderFotoList(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
    <a class="gallery_item" href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy"/></a>
    <div class="info">
      <p class="info-item"><b>Likes:</b>
        ${likes}
      </p>
      <p class="info-item"><b>Views:</b>
        ${views}
      </p>
      <p class="info-item"><b>Comments:</b>
        ${comments}
      </p>
      <p class="info-item"><b>Downloads:</b>
        ${downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
}

function onClickImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  let gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
}

function clearContainer() {
  refs.gallery.innerHTML = '';
  refs.loadBtn.style.visibility = 'hidden';
  refs.guard.style.visibility = 'hidden';
}

function onError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
function onEmptyInput() {
  Notify.info('Please, write a search query.');
}
