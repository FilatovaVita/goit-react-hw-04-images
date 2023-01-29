import { useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { fetchPhoto } from '../../utils/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';

export const App =()=> {
  const [searchQuery,setSearchQuery ] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(null);


  const searchQueryFormSubmit = searchQuery => {
    setPage(1);
    setImages([]);
    setSearchQuery(searchQuery);
  };


useEffect(()=> {
  const addImages = async (searchQuery, page) => {
    if (searchQuery === '') {
      return;
    }
    try {
      setIsLoading(true);
      const image = await fetchPhoto(searchQuery, page);
      if (image.totalHits === 0) {
        toast.error('Images not found ...');
        setIsLoading(false);
        return;
      }
      setImages(prevImages => [...prevImages, ...image.hits]);
      setTotalImages(image.totalHits);

    } catch (error) {
      setError('Something wrong! Please reload the page!');
    } finally {
      setIsLoading(false);
    }
  }
  addImages(searchQuery,page);
}, [searchQuery,page]);

 const loadMore = () => {
   setPage(prevPage => (
     prevPage + 1
    ));
  };

 return (
      <Container>
        <Searchbar onSubmit={searchQueryFormSubmit} />
        <ToastContainer autoClose={3000} position="top-center" />
        {isLoading && <Loader />}
        <ImageGallery images={images} isLoading={isLoading} />
        {images.length > 0 && images.length < totalImages && (
          <Button loadMore={loadMore} />
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Container>
    );
}



