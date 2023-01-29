
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Container } from './ImageGallery.styled';


export const ImageGallery = ({ images, isLoading }) => {

    return (
        <Container >
          {images.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                tags={tags}
                id={id}
                key={id}
                webformatURL={webformatURL}
                largeImage={largeImageURL}
                isLoading={isLoading}
              />
            );
          })}
        </Container>
    );
  }

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};


