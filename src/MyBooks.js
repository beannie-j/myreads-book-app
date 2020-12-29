import React, { Component } from "react";
import PropTypes from "prop-types";
import Bookshelf from "./BookShelf";
import { Link } from "react-router-dom";

class MyBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfCategories: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books, changeShelf, shelfCategories } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfCategories.map((category) => (
              <Bookshelf
                shelfCategories={shelfCategories}
                category={category}
                books={books.filter((book) => book.shelf === category)}
                changeShelf={changeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" />
        </div>
      </div>
    );
  }
}

export default MyBooks;
