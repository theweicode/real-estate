import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";

class Header extends Component {
  constructor() {
    super();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.hideSignUp = this.hideSignUp.bind(this);

    this.state = {
      show: false,
      showSignUp: false
    };
  }
  handleClose() {
    this.setState({ show: false });
    console.log("handleclose clicked");
  }

  handleShow() {
    this.setState({ show: true });
  }

  showSignUp() {
    this.setState({ showSignUp: true });
  }
  hideSignUp() {
    this.setState({ showSignUp: false });
  }

  handleAnonSI() {
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
        var self = this;
        self.setState({ show: false });
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });
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

  render() {
    return (
      <>
        <header>
          <div className="logo">
            <img src="https://i.imgur.com/1fXUQ8a.png" />
          </div>
          <nav>
            <a href="#">Create Ads</a>
            <a href="#">About Us</a>
            <a onClick={this.handleShow}>Log In</a>
            <a onClick={this.showSignUp} className="register-btn">
              Register
            </a>
          </nav>
        </header>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Button onClick={this.handleAnonSI}>Sign In Anonymously</Button>
          <Button onClick={this.handleEMSI}>Sign In w/ Email</Button>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showSignUp} onHide={this.hideSignUp}>
          <Modal.Header closeButton>
            <Modal.Title>Register Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Button onClick={this.handleAnonSI}>Sign In Anonymously</Button>
          <Button onClick={this.handleEMSI}>Sign In w/ Email</Button>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideSignUp}>
              Close
            </Button>
            <Button variant="primary" onClick={this.hideSignUp}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Header;
