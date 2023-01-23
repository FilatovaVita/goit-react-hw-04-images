import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, webformatURL, largeImage }) => {
  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} data={largeImage} />
    </GalleryItem>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
