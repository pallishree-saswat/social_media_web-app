import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };
    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
        });
    });
  };

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <div className="card mt-5">
              <div className="card-header bg-primary text-center text-white">
                <h2>Signup</h2>
              </div>
              <div className="card-body">
                <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }}
                >
                  {error}
                </div>

                <div
                  className="alert alert-info"
                  style={{ display: open ? "" : "none" }}
                >
                  New account is successfully created. Please{" "}
                  <Link to="/signin">Sign In</Link>.
                </div>
                <form>
                  <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                      onChange={this.handleChange("name")}
                      type="text"
                      className="form-control"
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                      onChange={this.handleChange("email")}
                      type="email"
                      className="form-control"
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                      onChange={this.handleChange("password")}
                      type="password"
                      className="form-control"
                      value={password}
                    />
                  </div>

                  <button
                    onClick={this.clickSubmit}
                    className="btn btn-block mb-3 mt-5 btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
