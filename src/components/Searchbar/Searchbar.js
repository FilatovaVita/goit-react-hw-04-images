import { Component } from 'react';
import { ReactComponent as SearchIcon } from 'image/icons8-search.svg';
import { toast } from 'react-toastify';
import {
  Container,
  Form,
  FormInput,
  FormButton,
  ButtonLable,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propType = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };
  formatSearchQuery = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };
  onSearchQuerySubmit = event => {
    event.preventDefault();
    if (!this.state.searchQuery.trim()) {
      toast.error('Please enter search name!');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <Container>
        <Form onSubmit={this.onSearchQuerySubmit}>
          <FormButton type="submit">
            <SearchIcon />
            <ButtonLable>Search</ButtonLable>
          </FormButton>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            onChange={this.formatSearchQuery}
            placeholder="Search images and photos"
          />
        </Form>
      </Container>
    );
  }
}
