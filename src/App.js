import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import MyBooks from "./MyBooks";
import Search from "./Search";
import "./App.css";
import NotFound from "./NotFound";

const shelfCategories = ["currentlyReading", "wantToRead", "read"];

class App extends Component {
  state = {
    myBooks: [],
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

  render() {
    const { myBooks } = this.state;

    return (
      <Router>
        <Switch>
          <div className="App">
            <Route exact path="/">
              <MyBooks
                books={myBooks}
                shelfCategories={shelfCategories}
                changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
              />
            </Route>

            <Route exact path="/search">
              <Search
                books={myBooks}
                shelfCategories={shelfCategories}
                changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
              />
            </Route>
            <Route component={NotFound} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
