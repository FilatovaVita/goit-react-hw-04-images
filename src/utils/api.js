import axios from 'axios';

const KEY = '31531336-71c12a94fdf84769ea8cbd9a1';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export const fetchPhoto = async (searchQuery, page) => {
  try {
    const { data } = await axios.get(
      `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
