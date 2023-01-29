import { useState} from 'react';
import { ReactComponent as SearchIcon } from 'image/icons8-search.svg';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Container,
  Form,
  FormInput,
  FormButton,
  ButtonLable,
} from './Searchbar.styled';


export const Searchbar =({onSubmit})=> {
  const [searchQuery, setSearchQuery] = useState('');

const  formatSearchQuery = event => {
  setSearchQuery(event.currentTarget.value.toLowerCase());
  };
 const onSearchQuerySubmit = event => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please enter search name!');
      return;
    }
    onSubmit(searchQuery);
   setSearchQuery( '' );

  };

    return (
      <Container>
        <Form onSubmit={onSearchQuerySubmit}>
          <FormButton type="submit">
            <SearchIcon />
            <ButtonLable>Search</ButtonLable>
          </FormButton>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            value={searchQuery}
            onChange={formatSearchQuery}
            placeholder="Search images and photos"
          />
        </Form>
      </Container>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

