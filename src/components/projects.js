import React, { Component } from "react";

class Project extends Component {
  state = {
    credentials: { name: "", description: "" },
    output: {},
  };

  inputChanged = (event) => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  proj = (event) => {
    // console.log(this.state.credentials);
    fetch("https://bug-tracker01.herokuapp.com/api/user/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(this.state.credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        // let d = {};
        // d["password"] = this.state.credentials.password;
        // d["username"] = data.username;

        // this.props.userAuth(d);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <div>
        <h1>Project finder form</h1>
        <label>
          {" "}
          project names:
          <input
            type="text"
            name="name"
            value={this.state.credentials.name}
            onChange={this.inputChanged}
          />
        </label>
        <br />
        <label>
          {" "}
          project description:
          <input
            type="text"
            name="description"
            value={this.state.credentials.description}
            onChange={this.inputChanged}
          />
        </label>
        <br />

        <button onClick={this.proj}>search project</button>
      </div>
    );
  }
}

export default Project;
