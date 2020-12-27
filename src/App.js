import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import MyBooks from "./MyBooks";
import "./App.css";

const shelfCategories = ["currentlyReading", "wantToRead", "read"];

class App extends Component {
  state = {
    myBooks: [],
  };

  // gets all the books on load
  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({ myBooks: data });
    });
  }

  render() {
    const { myBooks } = this.state;

    return (
      <div className="App">
        <React.StrictMode>
          {/* <p>{JSON.stringify(myBooks)}</p> */}
          <MyBooks books={myBooks} categories={shelfCategories} />
        </React.StrictMode>
      </div>
    );
  }
}

export default App;
