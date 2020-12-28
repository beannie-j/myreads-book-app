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

    if (!input || input === "") {
      this.setState({ results: [], searchNoResults: false });
    }

    if (input) {
      input = input.trim();
      BooksAPI.search(input).then((data) => {
        data.length > 0
          ? this.setState({ results: data, searchNoResults: false })
          : this.setState({ results: [], searchNoResults: true });
      });
    }
  };

  render() {
    const { changeShelf, shelfCategories, books } = this.props;
    const { results, searchNoResults, query } = this.state;

    const getBookShelf = (book) => {
      return books?.find((item) => item.id === book.id)?.shelf ?? "none";
    };

    // const getBookShelf = (book) => {
    //   for (let item in books) {
    //     console.log("item", item);
    //     if (item.id === book.id) {
    //       return item.shelf;
    //     }
    //   }
    // };

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
          {query && <p>Search returned {results.length} books.</p>}
          <ol className="books-grid">
            {query &&
              results.map((book) => {
                let bookShelf = getBookShelf(book);
                return (
                  <li key={book.id}>
                    <Book
                      book={book}
                      shelf={bookShelf}
                      shelfCategories={shelfCategories}
                      changeShelf={changeShelf}
                    />
                  </li>
                );
              })}
          </ol>
          {searchNoResults && (
            <h1>Search did not return any books. Please try again!</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
