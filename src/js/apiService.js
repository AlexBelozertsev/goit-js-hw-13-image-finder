export default {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '19811356-e6efa31c9626364e7cdb6ab36',
  imageType: 'photo',
  orientation: 'horizontal',
  page: 1,
  perPage: 12,
  query: '',

  get queryValue() {
      return this.query;
  },
  set queryValue(val) {
      return (this.query = val);
  },
  setPage() {
      return this.page += 1;
  },
  resetPage() {
      return this.page = 1;
  },
  
  async fetchImages(val = this.query) {
    this.queryValue = val;
    const param = `&image_type=${this.imageType}&orientation=${this.orientation}&per_page=${this.perPage}&page=${this.page}`;
    const URL = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.query}${param}`;

    const response = await fetch(URL);
    const result = await response.json();
      const images = await result.hits;
      return images;
  }
}