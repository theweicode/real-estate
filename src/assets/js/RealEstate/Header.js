import React, { Component } from "react";
import ReactDOM from "react-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: "Joe"
    };
  }
  clickedBtn = () => {
    console.log("swag");
  };
  render() {
    return (
      <header>
        <div className="logo">
          <img src="/img/WT-1.png" />
        </div>
        <nav>
          <a href="#">Create Ads</a>
          <a href="#">About Us</a>
          <a href="#">Log In</a>
          <a href="#" className="register-btn">
            Register
          </a>
        </nav>
      </header>
    );
  }
}

export default Header;
