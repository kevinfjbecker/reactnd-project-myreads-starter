import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchPage extends Component {

  state = {
    searchText: "",
    books: []
  };

  handleInputChange = event => {

    this.setState({ searchText: event.target.value });

    if(event.target.value === "") {
      this.setState({ books: [] });
      return;
    }

    BooksAPI.search(event.target.value)
      .then(booksFound => {
        
        if(booksFound.error) {
          console.log(booksFound.error);
          this.setState({ books: [] });
          return;
        }

        this.setState({
          books: (
            booksFound && this.state.searchText !== ""
              ? booksFound
              : []
          )
        });

      });
  };

  render() {
      return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.toListBooks}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={this.handleInputChange}
            />
  
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default SearchPage;