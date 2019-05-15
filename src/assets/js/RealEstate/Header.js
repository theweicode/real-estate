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
    this.handleSignOut = this.handleSignOut.bind(this);

    this.state = {
      showSignUp: false,
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
          this.props.populateForms();
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
      }.bind(this)
    );
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

    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          this.setState({ username: email });
          this.setState({ guestLogin: true });
          console.log(this.state.username);
          // ...
        } else {
          // User is signed out.
          // ...
        }
      }.bind(this)
    );
  }

  handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
    this.setState({ guestLogin: false });
  }

  render() {
    let logUsr;
    let loginEr = this.state.loginError;
    if (this.state.guestLogin) {
      logUsr = (
        <>
          <h3 className="loggedinas">Logged in as: {this.state.username}</h3>
          <Button onClick={this.handleSignOut}>Sign Out</Button>
        </>
      );
    }
    return (
      <>
        <header>
          <a href="/" className="logo">
            <img src="https://i.imgur.com/1fXUQ8a.png" />
          </a>
          {logUsr}

          <nav>
            <a className="login-btn" onClick={this.showLogin}>
              Log In
            </a>
            <a onClick={this.showSignUp} className="register-btn">
              Register
            </a>
          </nav>
        </header>
        <Modal
          show={this.state.showLogin}
          onHide={this.hideLogin}
          animation="true"
          centered="true"
        >
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              <div className="mb-3 text-secondary">
                Enter your login info here:
              </div>
              <form>
                <div className="form-group mt-3">
                  <label id="inputGroup-sizing-default">Email</label>

                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label id="inputGroup-sizing-default">Password</label>

                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>

            {loginEr}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="col-xs-12 col-sm-5 btn-sm"
              onClick={event => {
                this.handleLogin();
                this.hideLogin();
              }}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              className="col-xs-12 col-sm-5 btn-sm"
              onClick={event => {
                this.hideLogin();
                this.handleGuestLogin();
              }}
            >
              Login As Guest
            </Button>
            {/*             <Button
              variant="secondary"
              className="buttonstyle"
              onClick={this.hideLogin}
            >
              Close
            </Button> */}
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
              variant="warning"
              onClick={event => {
                this.hideSignUp();
                this.showLogin();
              }}
            >
              Already have an account?
            </Button>
            <Button
              variant="dark"
              onClick={event => {
                this.hideSignUp();
                this.handleGuestLogin();
              }}
            >
              Login As Guest
            </Button>
            <Button variant="secondary" onClick={this.hideSignUp}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Header;
