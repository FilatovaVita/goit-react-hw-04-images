import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalField } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    document.addEventListener('keydown', this.closeModalOnEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalOnEsc);
  }

  closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, tags } = this.props;

    return (
      <ModalOverlay onClick={this.onBackdropClick}>
        <ModalField>
          <img src={src} alt={tags} />
        </ModalField>
      </ModalOverlay>
    );
  }
}
