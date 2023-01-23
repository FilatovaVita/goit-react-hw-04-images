import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { fetchPhoto } from '../../utils/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    totalImages: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.addImages();
    }
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight - 240,
        behavior: 'smooth',
      });
    }
  }
  searchQueryFormSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  addImages = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchQuery, page } = this.state;
      const image = await fetchPhoto(searchQuery, page);
      if (image.totalHits === 0) {
        toast.error('Images not found ...');
        this.setState({ isLoading: false });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...image.hits],
        totalImages: image.totalHits,
      }));
    } catch (error) {
      this.setState({ error: 'Something wrong! Please reload the page!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, totalImages, error } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.searchQueryFormSubmit} />
        <ToastContainer autoClose={3000} position="top-center" />
        {isLoading && <Loader />}
        <ImageGallery images={images} isLoading={isLoading} />
        {images.length > 0 && images.length < totalImages && (
          <Button loadMore={this.loadMore} />
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Container>
    );
  }
}
