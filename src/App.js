import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  navigateToListBooks = () => this.setState({ showSearchPage: false })

  navigateToSearch = () => this.setState({ showSearchPage: true })

  moveBook = (bookId, shelfName) => {
    console.log(`Move ${bookId} to ${shelfName}`);
  }

  componentDidMount() {
    BooksAPI.getAll().then(booksRemote => { 
      this.setState({ books: booksRemote || [] })
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            handleShelfChange={this.moveBook}
            toListBooks={this.navigateToListBooks}
          />
        ) : (
          <ListBooks
            handleShelfChange={this.moveBook}
            books={this.state.books}
            toSearch={this.navigateToSearch}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
