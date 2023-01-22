import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, tags, webformatURL, largeImage }) => {
  return (
    <GalleryItem key={id}>
      <GalleryImage src={webformatURL} alt={tags} data={largeImage} />
    </GalleryItem>
  );
};
ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
