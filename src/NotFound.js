import React, { Component } from "react";
import { Link } from "react-router-dom";
import notFoundDog from "./image/SorryDog404.jpg";
import "./App.css";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Sorry! something went wrong on our end</h1>
        <img
          className="sorry-dog-image"
          src={notFoundDog}
          alt="Page Not Found"
        />
        <Link to="/">Return home and try again</Link>
      </div>
    );
  }
}

export default NotFound;
