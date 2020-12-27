import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import MyBooks from "./MyBooks";
import Search from "./Search";
import "./App.css";

const shelfCategories = ["currentlyReading", "wantToRead", "read"];

class App extends Component {
  state = {
    myBooks: [],
    showSearchPage: false,
    query: "",
  };

  getBooks = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({ myBooks: data });
    });
  };

  // gets all the books on load
  componentDidMount() {
    this.getBooks();
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      book.shelf = shelf;
      this.setState((state) => ({
        myBooks: state.myBooks
          .filter((b) => b.title !== book.title)
          .concat([book]),
      }));
    });
  };

  changeShowSearchPage = () => {
    this.setState((state) => ({
      showSearchPage: !state.showSearchPage,
    }));
  };

  render() {
    const { myBooks, showSearchPage, query } = this.state;

    return (
      <Router>
        <div className="App">
          {/* <p>{JSON.stringify(myBooks)}</p> */}
          <Route exact path="/">
            <MyBooks
              books={myBooks}
              shelfCategories={shelfCategories}
              changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
            />
          </Route>

          <Route exact path="/search">
            <Search
              onLoad={() => this.setState({ showSearchPage: true })}
              showSearchPage={showSearchPage}
              query={query}
            />
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
