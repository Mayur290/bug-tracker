import React, { Component } from "react";
import "./App.css";
import Login from "./components/login.js";
import SignUp from "./components/register.js";
import Project from "./components/projects.js";

class App extends Component {
  state = {
    credentials: { username: "", password: "" },
  };

  userAuth = (response) => {
    console.log(response);
    fetch("https://bug-tracker01.herokuapp.com/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        console.log(data);
        localStorage.setItem("token", data.token);
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <div className="App">
        <Login userAuth={this.userAuth} />
        <br />
        <SignUp userAuth={this.userAuth} />
        <br />
        <Project />
        <br />
      </div>
    );
  }
}

export default App;
