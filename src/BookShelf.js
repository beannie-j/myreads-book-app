import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
  };

  render() {
    const { category, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} category={category} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookShelf;