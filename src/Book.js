import React from 'react';
import BookShelfChanger from './BookShelfChanger';

const simpleBook = b => ({
  "title": b.title,
  "authors": b.authors ? b.authors.join(', ') : '',
  "cover": {
      "width": 128,
      "height": 192,
      "backgroundImage": b.imageLinks && b.imageLinks.thumbnail
        ? `url("${b.imageLinks.thumbnail}")`
        : `url("${require('./img/noimage.png')}")`
  },
  id: b.id,
  shelf: b.shelf || 'none'
});

const Book = (props) => {

    const { title, authors, cover, shelf, id } = simpleBook(props.bookDetails);
    const { width, height, backgroundImage } = cover;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: width,
              height: height,
              backgroundImage: backgroundImage
            }}
          ></div>
          <div className="book-shelf-changer">
            <BookShelfChanger bookid={id} shelf={shelf}/>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  };

export default Book;