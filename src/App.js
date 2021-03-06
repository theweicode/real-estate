import React, { Component } from "react";
import Header from "./assets/js/RealEstate/Header.js";
import Filter from "./assets/js/RealEstate/Filter";
import Listings from "./assets/js/RealEstate/Listings";
import firebase from "./assets/js/RealEstate/Firebase";
import AdSense from "react-adsense";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


import listingsData from "./assets/js/RealEstate/Data/listingsData";

import "./assets/sass/main.scss";

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: "Joe",
      listingsData: listingsData,
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
  }

  componentDidMount() {
    let listingsData2 = this.state.filteredData.sort((a, b) => {
      return a.price - b.price;
    });
    this.setState({
      listingsData: listingsData2
    });
    this.populateForms();
    console.log("populateforms");
  }
  componentWillMount() {
    this.onRealTimeListener();

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
    var newArray = this.state.listingsData.slice();
    newArray.push(change.doc.data());
    newArray[this.state.listingsData.length].id = change.doc.id;
    newArray[this.state.listingsData.length].count = [
      this.state.listingsData.length + 1
    ];
    this.setState({
      listingsData: newArray
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

    firebase
      .firestore()
      .collection("listingsData")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
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
    let newData = this.state.listingsData.filter(item => {
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
    let cities = this.state.listingsData.map(item => {
      return item.city;
    });

    console.log("populate forms cities: ", this.state.listingsData);

    //Set takes the list and make sure there are no doubles
    cities = new Set(cities);
    cities = [...cities];
    cities = cities.sort();
    // hometype
    let homeTypes = this.state.listingsData.map(item => {
      return item.homeType;
    });
    //Set takes the list and make sure there are no doubles
    homeTypes = new Set(homeTypes);
    homeTypes = [...homeTypes];
    homeTypes = homeTypes.sort();

    // bedrooms
    let bedrooms = this.state.listingsData.map(item => {
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

  render() {
    return (
      <div>
        <Header populateForms={this.populateForms} />

        {/* <AdSense.Google
          client="ca-pub-4046770003573980"
          slot="7806394673"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        /> */}
        <section id="content-area">
          <Row>
            <Col xs="12" sm="12" md="3">
              <Filter change={this.change} globalState={this.state} />
            </Col>
            <Col xs="12" sm="12" md="9">
              <Listings
                listingsData={this.state.filteredData}
                change={this.change}
                globalState={this.state}
                changeView={this.changeView}
              />
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default App;
