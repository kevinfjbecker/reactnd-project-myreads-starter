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
    this.setState((state) => {
      const bookToMove = state.books.filter(b => b.id === book.id)[0];
      if(bookToMove !== undefined) {
        bookToMove.shelf = shelfName;
      } else {
        book.shelf = shelfName;
        state.books.push(book);
      }

      // This should update the server-side data model and refresh the local copy.
      // The server-side seems unchanged and negates local updates.
      // BooksAPI.update(book.id, shelfName)
      //   .then((data)=>console.log(data))
      //   .then(BooksAPI.getAll)
      //   .then(booksRemote => this.setState({ books: booksRemote || [] }) );
      
        return state;
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
