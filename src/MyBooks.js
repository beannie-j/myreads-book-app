import React, { Component } from "react";
// import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class MyBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div>
        <h1>My Books</h1>
      </div>
    );
  }
}

export default MyBooks;
