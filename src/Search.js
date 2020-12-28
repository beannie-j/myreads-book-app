import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const searchIcon = <FontAwesomeIcon icon={faSearch} />;
const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />;

class Search extends Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired,
    shelfCategories: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
  };

  state = {
    query: "",
    results: [],
    searchNoResults: false,
  };

  searchBook = (e) => {
    let input = e.target.value;
    this.setState({ query: input });

    if (input) {
      input = input.trim();
      BooksAPI.search(input).then((data) => {
        data.length > 0
          ? this.setState({ results: data, searchNoResults: false })
          : this.setState({ results: [], searchNoResults: true });
      });
    }

    if (!input) {
      this.setState({ results: [], searchNoResults: false });
    }
  };

  render() {
    const { changeShelf, shelfCategories } = this.props;
    const { results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {arrowLeft}
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search"
              onChange={this.searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
          {results.length > 0 && <p>Search returned {results.length} books.</p>}
          <ol className="books-grid">
            {results.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelfCategories={shelfCategories}
                  changeShelf={changeShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
