import React, { Component } from "react";

class SignUp extends Component {
  state = {
    credentials: { first_name: "", last_name: "", email: "", password: "" },
  };

  register = (event) => {
    // console.log(this.state.credentials);
    fetch("https://bug-tracker01.herokuapp.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
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
        <h1>Register User Form</h1>
        <label>
          {" "}
          first name:
          <input
            type="text"
            name="first_name"
            value={this.state.credentials.first_name}
            onChange={this.inputChanged}
          />
        </label>
        <br />
        <label>
          {" "}
          last name:
          <input
            type="text"
            name="last_name"
            value={this.state.credentials.last_name}
            onChange={this.inputChanged}
          />
        </label>
        <br />
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
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

export default SignUp;
