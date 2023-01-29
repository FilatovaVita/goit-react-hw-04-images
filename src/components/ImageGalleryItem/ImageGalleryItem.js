import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import {useState} from "react";
import {Loader} from "../Loader/Loader";
import {Modal} from "../Modal/Modal";

export const ImageGalleryItem = ({ tags, webformatURL, largeImage, isLoading }) => {
  const [clickedImage, setClickedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setClickedImage('');
    setIsModalOpen(false);}


  const onClickImage = event => {
    setClickedImage( largeImage);
    setIsModalOpen(true);
  };
  return (
    <>
    <GalleryItem onClick={onClickImage}>
      <GalleryImage src={webformatURL} alt={tags} data={largeImage} />
    </GalleryItem>
  {isLoading && <Loader />}
  {isModalOpen && (
    <Modal src={largeImage} tags={tags} onClose={closeModal} />
  )}
    </>
  )
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
