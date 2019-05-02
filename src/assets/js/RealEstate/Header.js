import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";

class Header extends Component {
  constructor() {
    super();
    this.showLogin = this.showLogin.bind(this);
    this.hideLogin = this.hideLogin.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.hideSignUp = this.hideSignUp.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);

    this.state = {
      showSignUp: true,
      showLogin: false,
      guestLogin: false,
      username: "",
      email: "",
      password: "",
      loginError: ""
    };
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(this.state.email);
    console.log(this.state.password);
  }

  //navbar modal controls
  // login
  showSignUp() {
    this.setState({ showSignUp: true });
  }
  hideSignUp() {
    this.setState({ showSignUp: false });
  }
  showLogin() {
    this.setState({ showLogin: true });
  }

  hideLogin() {
    this.setState({ showLogin: false });
  }

  handleGuestLogin() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        /*   var errorCode = error.code;
        var errorMessage = error.message; */
        // ...
      });

    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          this.setState({ username: "Guest" });
          this.setState({ guestLogin: true });
          console.log(this.state.username);
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
      }.bind(this)
    );
  }
  handleEMSI() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        /*   var errorCode = error.code;
        var errorMessage = error.message; */
        // ...
      });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });
  }

  handleSignUp(e) {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(
        function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          this.setState({ loginError: errorMessage });
        }.bind(this)
      )
      .then(this.setState({ loginError: "Account Successfully Created" }));
    document.getElementById("signupform").reset();
    document.getElementById("passwordfield").reset();
  }
  handleLogin() {
    let email = this.state.email;
    let password = this.state.password;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(
        function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          this.setState({ loginError: errorMessage });
        }.bind(this)
      );
  }

  render() {
    let logUsr;
    let loginEr = this.state.loginError;
    if (this.state.guestLogin) {
      logUsr = <h3>Logged in as: {this.state.username}</h3>;
    }
    return (
      <>
        <header>
          <div className="logo">
            <img src="https://i.imgur.com/1fXUQ8a.png" />
          </div>
          {logUsr}

          <nav>
            <a href="#">Create Ads</a>
            <a href="#">About Us</a>
            <a onClick={this.showLogin}>Log In</a>
            <a onClick={this.showSignUp} className="register-btn">
              Register
            </a>
          </nav>
        </header>
        <Modal show={this.state.showLogin} onHide={this.hideLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter your login info here:</Modal.Body>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Email
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              name="email"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          {loginEr}
          <Button variant="primary" onClick={this.handleLogin}>
            Login
          </Button>

          <Modal.Footer>
            <Button
              variant="dark"
              onClick={event => {
                this.hideLogin();
                this.handleGuestLogin();
              }}
            >
              Login As Guest
            </Button>
            <Button variant="secondary" onClick={this.hideLogin}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showSignUp} onHide={this.hideSignUp}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter your login info here:</Modal.Body>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Email
              </span>
            </div>
            <form id="signupform">
              <input
                type="text"
                onKeyPress={e => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="email"
                onChange={this.handleChange}
              />
            </form>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>

            <form id="passwordfield">
              <input
                type="text"
                onKeyPress={e => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="password"
                onChange={this.handleChange}
              />
            </form>
          </div>
          {loginEr}
          <Button variant="primary" onClick={this.handleSignUp}>
            Create Account
          </Button>

          <Modal.Footer>
            <Button
              variant="dark"
              onClick={event => {
                this.hideLogin();
                this.handleGuestLogin();
              }}
            >
              Login As Guest
            </Button>
            <Button variant="secondary" onClick={this.hideLogin}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Header;
