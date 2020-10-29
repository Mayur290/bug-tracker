import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

// import { AxiosResponse, AxiosError } from 'axios';
// import qs from "qs";
// import { Route, BrowserRouter as Router, Link } from "react-router-dom";
// import AuthToken from "./authToken.js";
class Logout extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      loggedIn,
    };

    this.handleLogout();
  }

  handleLogout = (event) => {
    this.props.logout();
    axios
      .get("https://bug-tracker01.herokuapp.com/api/logout", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(
        (response) => {
          console.log("logout successful");
          localStorage.removeItem("token");
          //   this.forceUpdate();
          // console.log(d);
        },
        (error) => {
          console.log(`Token ${localStorage.getItem("token")}`);
          console.log("logout error");

          // alert.error("Please provide correct credentials!");

          // console.log(event.target.email.value);
        }
      )
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  render() {
    if (this.state.loggedIn == false) {
      return <Redirect to="/" />;
    }
    return null;
  }
}

export default Logout;
