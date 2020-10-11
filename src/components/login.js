import React, { Component } from "react";

class Login extends Component {
  state = {
    credentials: { email: "", password: "" },
  };

  login = (event) => {
    // console.log(this.state.credentials);
    fetch("https://bug-tracker01.herokuapp.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        let d = {};
        d["password"] = this.state.credentials.password;
        d["username"] = data.username;

        this.props.userAuth(d);
      })
      .catch((error) => console.error(error));
  };

  inputChanged = (event) => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  render() {
    return (
      <div>
        <h1>Login User Form</h1>
        <label>
          {" "}
          user email:
          <input
            type="text"
            name="email"
            value={this.state.credentials.email}
            onChange={this.inputChanged}
          />
        </label>
        <br />
        <label>
          {" "}
          password:
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.inputChanged}
          />
        </label>
        <br />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default Login;
