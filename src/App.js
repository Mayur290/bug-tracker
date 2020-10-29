import React, { Component } from "react";
import "./App.css";
import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import ProjectAdd from "./components/projectsAdd.js";
import Logout from "./components/logout.js";
import Home from "./components/Home";
// import Header from "./components/header.js";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
class App extends Component {
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
  }

  // localStorage.getItem("token")

  isLoggedin = (bool) => {
    console.log("isLoggedin value is " + bool);
    this.setState({ loggedIn: bool });
  };

  logout = () => {
    this.setState({ loggedIn: false });
    console.log("Logout getting called!");
  };

  render() {
    let { loggedIn } = this.state;
    return (
      <Router>
        <div className="App">
          <h1> Home page</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              {loggedIn ? (
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}

              <li>
                <Link to="/project">Project</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/project" component={ProjectAdd} />
            <Route
              path="/login"
              exact
              render={() => <Login isLoggedin={this.isLoggedin} />}
            />
            <Route
              path="/logout"
              render={(props) => <Logout {...props} logout={this.logout} />}
            />
            <Route
              path="/"
              exact
              render={() => <Login isLoggedin={this.isLoggedin} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
