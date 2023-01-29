import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ModalOverlay, ModalField} from './Modal.styled';

export const Modal = ({src, tags, onClose}) => {

  useEffect(() => {
    const closeModalOnEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeModalOnEsc);
    return document.removeEventListener('keydown', closeModalOnEsc);
  }, []);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <ModalOverlay onClick={onBackdropClick}>
      <ModalField>
        <img src={src} alt={tags}/>
      </ModalField>
    </ModalOverlay>
  );

}
Modal.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};


