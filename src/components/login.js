import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import qs from "qs";
import SignUp from "./signup.js";
import AuthToken from "./authToken.js";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
// import AuthToken from "./authToken.js";
class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    credentials: { email: "", password: "" },
    error: false,
  };

  handleLogin = (event) => {
    event.preventDefault();
    let that = this;
    const options = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };
    axios
      .post(
        "https://bug-tracker01.herokuapp.com/api/login",
        qs.stringify(this.state.credentials),
        options
      )
      .then(
        (response) => {
          console.log(response.data);
          let d = {};
          d["password"] = this.state.credentials.password;
          d["username"] = response.data.username;
          // console.log(d);
          this.props.isLoggedin(true);
          // console.log(this.props.value);
          AuthToken(d);
        },
        (error) => {
          console.log(error);
          console.log("login error");
          this.props.isLoggedin(false);
          that.setState({ error: true });
          setTimeout(function () {
            that.setState({ error: false });
          }, 5000);

          // alert.error("Please provide correct credentials!");

          // console.log(event.target.email.value);
        }
      );
  };

  inputChanged = (event) => {
    const cred = this.state.credentials;
    // console.log(event.target.value);
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  render() {
    return (
      <>
        {this.state.error && <span>Please provide correct credentials</span>}
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Login</h1>
            <form onSubmit={this.handleLogin} noValidate>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  noValidate
                  value={this.state.credentials.email}
                  onChange={this.inputChanged}
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  noValidate
                  value={this.state.credentials.password}
                  onChange={this.inputChanged}
                />
              </div>
              <div className="createAccount">
                <button type="submit">Login</button>
                {this.state.error && (
                  <small style={{ color: "red", fontWeight: "bold" }}>
                    {" "}
                    Please provide correct credentials{" "}
                  </small>
                )}
                <small>
                  New here ? &emsp;&emsp;<Link to="/signup">SignUp</Link>{" "}
                </small>
                <Router>
                  <Route path="/signup" component={SignUp} />
                </Router>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
