import React from 'react';

const shelves = [
  {id: "currentlyReading", title: "Currently Reading"},
  {id: "wantToRead", title: "Want to Read"},
  {id: "read", title: "Read"},
  {id: "none", title: "None"}
]; 

const ShelfOption = (props) => (
  <option value={props.shelf.id}>{props.shelf.title}</option>
);

const BookShelfChanger = (props) => {
    return (
      <select
        value={props.shelf}
        onChange={(event) => {
          props.handleShelfChange(event.target.value)
        }}
      >
        <option value="move" disabled>Move to...</option>
        {
          shelves.map(s => (
            <ShelfOption key={s.id} shelf={s} />
          ))
        }
      </select>
    );
  };

export default BookShelfChanger;