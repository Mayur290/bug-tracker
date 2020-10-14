import React, { Component } from "react";
import "./App.css";
import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import ProjectAdd from "./components/projectsAdd.js";
import Logout from "./components/logout.js";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
class App extends Component {
  state = {
    credentials: { username: "", password: "" },
    loggedin: true,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedin: true });
    } else {
      this.setState({ loggedin: false });
    }
  }

  // userAuth = (response) => {
  //   console.log(response);
  //   fetch("https://bug-tracker01.herokuapp.com/api/auth", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(response),
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       // console.log(data);
  //       console.log(data);
  //       localStorage.setItem("token", data.token);
  //     })
  //     .catch((error) => console.error(error));
  // };

  render() {
    return (
      <>
        {!this.state.loggedin && <div></div>}
        <Router>
          <div className="App">
            <h1> Home page</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {!this.state.loggedin && (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    {/* <li>
                      <Link to="/signup">SignUp</Link>
                    </li> */}
                  </>
                )}
                <li>
                  <Link to="/project">Project</Link>
                </li>
                {this.state.loggedin && (
                  <>
                    <li>
                      <Link to="/logout">Logout</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/project" component={ProjectAdd} />
              <Route path="/login" exact component={Login} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/" exact component={Login} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
