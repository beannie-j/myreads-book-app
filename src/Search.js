import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired,
    shelfCategories: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
  };

  state = {
    query: "",
    results: [],
  };

  searchBook = (e) => {
    let input = e.target.value;
    this.setState({ query: input });

    if (input) {
      input = input.trim();
      BooksAPI.search(input).then((data) => {
        data.length > 0
          ? this.setState({ results: data })
          : this.setState({ results: [] });
      });
    }
  };

  render() {
    const { changeShelf, shelfCategories } = this.props;
    const { results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
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
