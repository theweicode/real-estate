import React, { Component } from "react";
import Header from "./assets/js/RealEstate/Header.js";
import Filter from "./assets/js/RealEstate/Filter";
import Listings from "./assets/js/RealEstate/Listings";
import firebase from "./assets/js/RealEstate/Firebase";
/* import listingsData from "./assets/js/RealEstate/Data/listingsData"; */

import "./assets/sass/main.scss";

let listingsData = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Joe",
      listingsData: [],
      city: "All",
      homeType: "All",
      bedrooms: 0,
      min_price: 0,
      max_price: 10000000,
      min_floor_space: 0,
      max_floor_space: 50000,
      elevator: false,
      finished_basement: false,
      swimming_pool: false,
      gym: false,
      filteredData: listingsData,
      populateFormsData: "",
      sortby: "price-dsc",
      view: "long",
      search: ""
    };
    this.change = this.change.bind(this);
    this.filteredData = this.filteredData.bind(this);
    this.populateForms = this.populateForms.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleAnonSI = this.handleAnonSI.bind(this);
  }

  componentDidMount() {
    this.onRealTimeListener();
  }

  componentWillMount() {
    /* adding data to firebase remove after data has been added 
    // Add a new document in collection "cities"
    db.collection("listingsData")
      .doc("3IbIg6wvb7jTFXYLJCve")
      .add({
        carousel:
          "https://www.contemporist.com/wp-content/uploads/2016/08/contemporary-house_080816_01-800x534.jpg"
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    /* adding data to firebase remove after data has been added */
  }

  renderHouseList(change) {
    /* console.log(
      "data has been added: ",
      cars.type,
      cars.doc.id,
      cars.doc.data()
    ); */
    var newArray = this.state.filteredData.slice();
    newArray.push(change.doc.data());
    newArray[this.state.filteredData.length].id = change.doc.id;
    newArray[this.state.filteredData.length].count = [
      this.state.filteredData.length + 1
    ];
    this.setState({
      filteredData: newArray
    });
  }

  handleRemoveFromList(id) {
    this.setState(prevState => {
      return {
        cars_owned: prevState.cars_owned.filter(p => p.id !== id)
      };
    });
  }

  onRealTimeListener() {
    firebase
      .firestore()
      .collection("listingsData")

      .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            this.renderHouseList(change);
            console.log("item added: ", change);
          } else if (change.type === "removed") {
            this.handleRemoveFromList(change.doc.id);
          }
        });
      });

    let listingsData2 = this.state.filteredData.sort((a, b) => {
      return a.price - b.price;
    });
    this.setState({
      filteredData: listingsData2
    });
  }

  change(event) {
    var name = event.target.name;

    var value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
        this.filteredData();
      }
    );
  }

  changeView(viewName) {
    this.setState({
      view: viewName
    });
  }

  filteredData() {
    let newData = this.state.filteredData.filter(item => {
      return (
        item.price >= this.state.min_price &&
        item.price <= this.state.max_price &&
        item.floorSpace >= this.state.min_floor_space &&
        item.floorSpace <= this.state.max_floor_space &&
        item.rooms >= this.state.bedrooms
      );
    });

    if (this.state.city !== "All") {
      newData = newData.filter(item => {
        return item.city === this.state.city;
      });
    }

    if (this.state.homeType !== "All") {
      newData = newData.filter(item => {
        return item.homeType === this.state.homeType;
      });
    }

    if (this.state.sortby === "price-dsc") {
      newData = newData.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (this.state.sortby === "price-asc") {
      newData = newData.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (this.state.search !== "") {
      newData = newData.filter(item => {
        var city = item.city.toLowerCase();
        var searchText = this.state.search.toLowerCase();
        var n = city.match(searchText);

        if (n !== null) {
          return true;
        } else {
          return false;
        }
      });
    }

    if (this.state.swimming_pool === true) {
      newData = newData.filter(item => {
        return item.extras.includes("swimming pool");
      });
    }

    if (this.state.elevator === true) {
      newData = newData.filter(item => {
        return item.extras.includes("elevator");
      });
    }

    if (this.state.finished_basement === true) {
      newData = newData.filter(item => {
        return item.extras.includes("finished basement");
      });
    }

    if (this.state.gym === true) {
      newData = newData.filter(item => {
        return item.extras.includes("gym");
      });
    }

    this.setState({
      filteredData: newData
    });
  }

  populateForms() {
    // city
    let cities = this.state.filteredData.map(item => {
      return item.city;
    });

    //Set takes the list and make sure there are no doubles
    cities = new Set(cities);
    cities = [...cities];
    cities = cities.sort();
    // hometype
    let homeTypes = this.state.filteredData.map(item => {
      return item.homeType;
    });
    //Set takes the list and make sure there are no doubles
    homeTypes = new Set(homeTypes);
    homeTypes = [...homeTypes];
    homeTypes = homeTypes.sort();

    // bedrooms
    let bedrooms = this.state.filteredData.map(item => {
      return item.rooms;
    });
    //Set takes the list and make sure there are no doubles
    bedrooms = new Set(bedrooms);
    bedrooms = [...bedrooms];
    bedrooms = bedrooms.sort();

    this.setState(
      {
        populateFormsData: {
          homeTypes,
          bedrooms,
          cities
        }
      },
      () => {
        console.log(this.state);
      }
    );
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

        console.log(isAnonymous, uid);
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
      <div>
        <Header />
        {/* <button onClick={this.handleAnonSI}>Sign In Anonymously</button> */}

        <section id="content-area">
          <Filter
            change={this.change}
            globalState={this.state}
            populateAction={this.populateForms}
          />
          <Listings
            listingsData={this.state.filteredData}
            change={this.change}
            globalState={this.state}
            changeView={this.changeView}
          />
        </section>
      </div>
    );
  }
}

export default App;
