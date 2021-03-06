import React from 'react';
import BookShelfChanger from './BookShelfChanger';

const simpleBook = b => ({
  "title": b.title,
  "authors": b.authors ? b.authors.join(', ') : '',
  "cover": {
    "backgroundImage": b.imageLinks && b.imageLinks.thumbnail
      ? `url("${b.imageLinks.thumbnail}")`
      : `url("${require('./img/noimage.png')}")`
  },
  id: b.id,
  shelf: b.shelf || 'none'
});


const Book = (props) => {

  const changeShelf = (shelfName) => {
    props.handleShelfChange(props.bookDetails, shelfName);
  };
  const { title, authors, cover, shelf, id } = simpleBook(props.bookDetails);
  const { backgroundImage } = cover;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: backgroundImage
          }}
        ></div>
        <div className="book-shelf-changer">
          <BookShelfChanger
            handleShelfChange={changeShelf}
            bookId={id}
            shelf={shelf}
          />
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

export default Book;