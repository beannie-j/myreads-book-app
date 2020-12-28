import React, { Component } from "react";
import PropTypes from "prop-types";
import * as changeCase from "change-case";
import noImage from "./image/NoImage.jpg";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
    shelfCategories: PropTypes.array.isRequired,
  };

  handleShelfChange = (e) => {
    const book = this.props.book;
    book.shelf = e.target.value;
    this.props.changeShelf(book, book.shelf);
  };

  render() {
    const { book, shelfCategories } = this.props;

    const bookCoverImage =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : noImage;

    const bookTitle = book.title ? book.title : "No title available";

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookCoverImage}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.handleShelfChange}>
              <option value="move" disabled>
                Move to...
              </option>
              {shelfCategories.map((category) => (
                <option value={category}>
                  {changeCase.capitalCase(category)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{bookTitle}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    );
  }
}

export default Book;
