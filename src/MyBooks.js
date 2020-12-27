import React, { Component } from "react";
import PropTypes from "prop-types";
import Bookshelf from "./BookShelf";

class MyBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfCategories: PropTypes.array.isRequired,
  };

  render() {
    const { books, categories } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {categories.map((category) => (
              <Bookshelf
                category={category}
                books={books.filter((book) => book.shelf === category)}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default MyBooks;
