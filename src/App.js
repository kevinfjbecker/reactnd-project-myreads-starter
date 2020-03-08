import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  moveBook = (book, shelfName) => {

    // update an existing book or add a new book
    this.setState((prevState) => {
      const bookToMove = prevState.books.filter(b => b.id === book.id)[0];
      if(bookToMove !== undefined) {
        bookToMove.shelf = shelfName;
      } else {
        book.shelf = shelfName;
        prevState.books.push(book);
      }

      // update remote data and refresh from server
      // this completes after moveBook exits
      BooksAPI.update(book.id, shelfName)
        .then((data)=>console.log(data))
        .then(BooksAPI.getAll)
        .then(booksRemote => this.setState({ books: booksRemote || [] }) );

        // local state updates first, while API calls are resolving.
        return prevState;
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then(booksRemote => { 
      this.setState({ books: booksRemote || [] })
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            handleShelfChange={this.moveBook}
            books={this.state.books}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            handleShelfChange={this.moveBook}
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
