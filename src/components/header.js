import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = { loggedIn: false };
  componentDidMount() {
    if (localStorage.token) {
      this.setState({ loggedIn: true });
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.setState({ loggedIn: false });
    this.props.history.push("/");
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>App</div>
        <div>
          {loggedIn ? (
            <div>
              <Link to="/">Home</Link>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/">Home</Link>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Header;
