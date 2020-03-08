import React from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

const shelves = [
  {id: "currentlyReading", title: "Currently Reading"},
  {id: "wantToRead", title: "Want to Read"},
  {id: "read", title: "Read"}
];

const getBooksByShelf = (books, shelf) => {
  return books.filter(b => b.shelf === shelf);
};

const ListBooks = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>{
          shelves.map(shelf => (
            <Bookshelf
              key={shelf.id}
              handleShelfChange={props.handleShelfChange}
              shelfTitle={shelf.title}
              books={getBooksByShelf(props.books, shelf.id)}
            />  
          ))
        }</div>
      </div>
      <div className="open-search">
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default ListBooks;