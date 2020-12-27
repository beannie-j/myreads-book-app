import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import MyBooks from "./MyBooks";
import "./App.css";

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
    console.log(myBooks);

    return (
      <div className="App">
        <React.StrictMode>
          {/* <p>{JSON.stringify(myBooks)}</p> */}
          <MyBooks
            books={myBooks}
            shelfCategories={shelfCategories}
            changeShelf={(book, shelf) => this.changeShelf(book, shelf)}
          />
        </React.StrictMode>
      </div>
    );
  }
}

export default App;
