
const BASE_LINK = 'https://pixabay.com/api/';
const KEY = '31531336-71c12a94fdf84769ea8cbd9a1';

export default class FotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchFoto() {
    const Response = await fetch(
      `${BASE_LINK}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    const data = await Response.json();
    this.incrPage();
    return data;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
