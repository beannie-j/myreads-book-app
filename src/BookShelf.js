import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import * as changeCase from "change-case";

const BookShelf = ({ category, books, changeShelf, shelfCategories }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{changeCase.capitalCase(category)}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book
              shelfCategories={shelfCategories}
              category={category}
              book={book}
              changeShelf={changeShelf}
              shelf={book.shelf}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
  shelfCategories: PropTypes.array.isRequired,
};

export default BookShelf;
