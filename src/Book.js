import React from 'react';
import BookShelfChanger from './BookShelfChanger';

const simpleBook = b => ({
  "title": b.title,
  "authors": b.authors ? b.authors.join(', ') : '',
  "cover": {
      "width": 128,
      "height": 192,
      "backgroundImage": `url("${b.imageLinks.thumbnail}")`
  },
  id: b.id
});

const Book = (props) => {

    const { title, authors, cover } = simpleBook(props.bookDetails);
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
            <BookShelfChanger />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  };

export default Book;