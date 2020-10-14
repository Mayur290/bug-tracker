import React, { Component } from "react";
import "../App.css";
import axios from "axios";
// import qs from "qs";
// import { Route, BrowserRouter as Router, Link } from "react-router-dom";
// import AuthToken from "./authToken.js";
class Logout extends Component {
  handleLogout = (event) => {
    axios
      .get("https://bug-tracker01.herokuapp.com/api/logout", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(
        (response) => {
          console.log("logout successful");
          localStorage.setItem("token", null);
          //   this.forceUpdate();
          // console.log(d);
        },
        (error) => {
          console.log(`Token ${localStorage.getItem("token")}`);
          console.log("logout error");

          // alert.error("Please provide correct credentials!");

          // console.log(event.target.email.value);
        }
      );
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Logout;
