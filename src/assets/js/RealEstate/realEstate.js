import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Filter from "./Filter";
import Listings from "./Listings";
import listingsData from "./Data/listingsData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Joe",
      listingsData,
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

  componentWillMount() {
    let listingsData2 = listingsData.sort((a, b) => {
      return a.price - b.price;
    });
    this.setState({
      listingsData: listingsData2
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

    if (this.state.city != "All") {
      newData = newData.filter(item => {
        return item.city == this.state.city;
      });
    }

    if (this.state.homeType != "All") {
      newData = newData.filter(item => {
        return item.homeType == this.state.homeType;
      });
    }

    if (this.state.sortby == "price-dsc") {
      newData = newData.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (this.state.sortby == "price-asc") {
      newData = newData.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (this.state.search != "") {
      newData = newData.filter(item => {
        var city = item.city.toLowerCase();
        var searchText = this.state.search.toLowerCase();
        var n = city.match(searchText);

        if (n != null) {
          return true;
        }
      });
    }

    if (this.state.swimming_pool == true) {
      newData = newData.filter(item => {
        return item.extras.includes("swimming pool");
      });
    }

    if (this.state.elevator == true) {
      newData = newData.filter(item => {
        return item.extras.includes("elevator");
      });
    }

    if (this.state.finished_basement == true) {
      newData = newData.filter(item => {
        return item.extras.includes("finished basement");
      });
    }

    if (this.state.gym == true) {
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
        <Header />
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

const app = document.getElementById("app");

ReactDOM.render(<App />, app);
