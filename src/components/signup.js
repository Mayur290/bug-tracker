import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import qs from "qs";
import Login from "./login.js";
import AuthToken from "./authToken.js";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

// import AuthToken from "./authToken.js";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      error: false,
      formErrors: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    // console.log("submit clicked");
    e.preventDefault();
    let that = this;

    if (formValid(this.state)) {
      let credentials = {};
      credentials["first_name"] = this.state.first_name;
      credentials["last_name"] = this.state.last_name;
      credentials["email"] = this.state.email;
      credentials["password"] = this.state.password;
      console.log(`after form validation`);
      console.log(credentials);

      // fetch("https://bug-tracker01.herokuapp.com/api/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(credentials),
      // })
      //   .then((data) => data.json())
      //   .then((data) => {
      //     console.log(data);
      //     // let d = {};
      //     // d["password"] = this.state.credentials.password;
      //     // d["username"] = data.username;

      //     // this.props.userAuth(d);
      //   })
      //   .catch((error) => console.error(error));

      const options = {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };
      axios
        .post(
          "https://bug-tracker01.herokuapp.com/api/signup",
          qs.stringify(credentials),
          options
        )
        .then(
          (response) => {
            console.log(response.data);
            let d = {};
            d["password"] = this.state.password;
            d["username"] = response.data.username;
            console.log(d);

            AuthToken(d);
          },
          (error) => {
            console.log(error);
            console.log("signup error");
            that.setState({ error: true });
            setTimeout(function () {
              that.setState({ error: false });
            }, 5000);
          }
        );
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "first_name":
        formErrors.first_name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "last_name":
        formErrors.last_name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <>
        {this.state.error && <span>Error Occured</span>}
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Account</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="first_name">
                <label htmlFor="first_name">First Name</label>
                <input
                  className={formErrors.first_name.length > 0 ? "error" : null}
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.first_name.length > 0 && (
                  <span className="errorMessage">{formErrors.first_name}</span>
                )}
              </div>
              <div className="last_name">
                <label htmlFor="last_name">Last Name</label>
                <input
                  className={formErrors.last_name.length > 0 ? "error" : null}
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.last_name.length > 0 && (
                  <span className="errorMessage">{formErrors.last_name}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  className={formErrors.password.length > 0 ? "error" : null}
                  placeholder="Password"
                  type="password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
              <div className="createAccount">
                <button type="submit">Create Account</button>
                {this.state.error && (
                  <small style={{ color: "red", fontWeight: "bold" }}>
                    {" "}
                    Email address already exists{" "}
                  </small>
                )}
                <small>
                  Already Have an Account? &emsp;&emsp;
                  <Link to="/login">Login</Link>
                </small>
                <Router>
                  <Route path="/login" component={Login} />
                </Router>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
