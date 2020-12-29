import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
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

  getBooks = async () => {
    const myBooks = await BooksAPI.getAll();
    this.setState({ myBooks });
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
      <div className="App">
        <Switch>
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
              changeShelf={this.changeShelf}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
