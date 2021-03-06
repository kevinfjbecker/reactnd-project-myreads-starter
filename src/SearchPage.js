import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';
import { Link } from 'react-router-dom';

const mergeShelfState = (source, sink) => {
  return sink.map(sinkBook => {
    const sourceBook = source.filter(sourceBook =>
      sinkBook.id === sourceBook.id
    )[0];
    sinkBook.shelf = sourceBook && sourceBook.shelf;
    return sinkBook;
  });
};

class SearchPage extends Component {

  state = {
    searchText: "",
    books: []
  };

  handleInputChange = event => {

    this.setState({ searchText: event.target.value });

    if (event.target.value === "") {
      this.setState({ books: [] });
      return;
    }

    BooksAPI.search(event.target.value)
      .then(booksFound => {

        if (booksFound.error) {
          console.log(booksFound.error);
          this.setState({ books: [] });
          return;
        }

        this.setState({
          books: (
            booksFound && this.state.searchText !== ""
              ? mergeShelfState(this.props.books, booksFound)
              : []
          )
        });

      });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>
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
              autoFocus
            />

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            handleShelfChange={this.props.handleShelfChange}
            books={this.state.books}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;