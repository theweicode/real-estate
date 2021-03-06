import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListingsView from "./ListingsView";
import ButtonToolbar from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class Listings extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false
    };
    this.loopListings = this.loopListings.bind(this);
    /* this.modalShow = this.modalShow.bind(this); */
  }

  componentDidMount() {}

  loopListings() {
    const { listingsData } = this.props;

    if (listingsData === undefined || listingsData.length === 0) {
      return "Sorry your filter did not match any listings";
    }
    console.log("listingsData: ", listingsData);
    return listingsData.map((listing, index) => {
      var listImg = listing.background;
      var carouselImg = listing.carousel;
      console.log("listing: ", listing);
      let modalClose = () => this.setState({ modalShow: false });
      // THIS IS THE BOX VIEW
      if (this.props.globalState.view === "box") {
        return (
          <div className="col-md-3 col-sm-6 col-xs-12 clearfix" key={index}>
            <div className="listing">
              <div
                className="listing-img"
                style={{
                  background: `url(${listing.image}) no-repeat center center`
                }}
              >
                <span className="address">{listing.address}</span>
                <div className="details">
                  <div className="col-md-3">
                    <div className="user-img" />
                  </div>
                  <div className="col-md-9">
                    <div className="user-details">
                      <span className="user-name">{listing.seller}</span>
                      <span className="post-date">{listing.date}</span>
                    </div>
                    <div className="listing-details">
                      <div className="floor-space">
                        <i className="far fa-square" />
                        <span>{listing.floorSpace} ft&sup2;</span>
                      </div>
                      <div className="bedrooms">
                        <i className="fas fa-bed" />
                        <span>{listing.rooms} bedrooms</span>
                      </div>
                      <ButtonToolbar>
                        <Button
                          variant="primary"
                          onClick={() => this.setState({ modalShow: true })}
                        >
                          View Listing
                        </Button>

                        <ListingsView
                          show={this.state.modalShow}
                          onHide={modalClose}
                          address={listing.address}
                          carousel={listing.carousel}
                          key={index}
                        />
                      </ButtonToolbar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-info">
                <span className="price">${listing.price}</span>
                <span className="location">
                  <i className="fas fa-map-marker-alt" />
                  {listing.state}, {listing.city}
                </span>
              </div>
            </div>
          </div>
        );
      } else {
        // THIS IS THE LONG VIEW
        return (
          <div className="col-md-12 col-lg-6" key={index}>
            <div className="listing">
              <div
                className="listing-img"
                style={{
                  background: `url(${listing.image}) no-repeat center center`
                }}
              >
                <span className="address">{listing.address}</span>
                <div className="details">
                  <div className="col-md-3">
                    <div className="user-img" />
                  </div>
                  <div className="col-md-9">
                    <div className="user-details">
                      <span className="user-name">{listing.seller}</span>
                      <span className="post-date">{listing.date}</span>
                    </div>
                    <div className="listing-details">
                      <div className="floor-space">
                        <i className="far fa-square" />{" "}
                        <span>{listing.floorSpace} ft&sup2;</span>
                      </div>
                      <div className="bedrooms">
                        <i className="fas fa-bed" />
                        <span>{listing.rooms} bedrooms</span>
                      </div>
                    </div>

                    {/* Setting modal here */}
                    <ButtonToolbar>
                      <Button
                        variant="primary"
                        onClick={() => this.setState({ modalShow: true })}
                      >
                        View Listing
                      </Button>

                      <ListingsView
                        show={this.state.modalShow}
                        onHide={modalClose}
                        address={listing.address}
                        state={listing.state}
                        carousel={listing.carousel}
                        seller={listing.seller}
                        bedrooms={listing.rooms}
                        floorSpace={listing.floorSpace}
                        date={listing.date}
                        city={listing.city}
                        price={listing.price}
                        type={listing.type}
                      />
                    </ButtonToolbar>
                    <div>
                      {/*  <div id="listing">
                        <Button onClick={this.viewListing}>X</Button>
                        <div
                          className="background"
                          style={{
                            background: `url(${
                              listing.image
                            }) no-repeat center center`
                          }}
                        >
                          {listing.address}{" "}
                        </div>
                      </div> */}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-info">
                <span className="price">${listing.price}</span>
                <span className="location">
                  <i className="fas fa-map-marker-alt" />
                  {listing.state}, {listing.city}
                </span>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  viewListing() {
    this.setState({
      viewListing: !this.state.viewListing
    });
  }

  render() {
    return (
      <section id="listings">
        <section className="search-area">
          <input
            type="text"
            name="search"
            placeholder="search city..."
            onChange={this.props.change}
          />
        </section>

        <section className="sortby-area">
          <div className="results">
            {this.props.listingsData.length} results found
          </div>
          <div className="sort-options">
            <select
              name="sortby"
              className="sortby"
              onChange={this.props.change}
            >
              <option value="price-dsc">Lowest Price</option>
              <option value="price-asc">Highest Price</option>
            </select>
            <div className="view">
              <i
                className="fas fa-list"
                aria-hidden="true"
                onClick={this.props.changeView.bind(null, "long")}
              />
              <i
                className="fas fa-th"
                onClick={this.props.changeView.bind(null, "box")}
              />
            </div>
          </div>
        </section>

        <section className="listings-results">
          <div className="row">{this.loopListings()} </div>
        </section>

        <section id="pagination">
          <ul className="pagination justify-content-center pages">
            <li>Prev</li>
            <li className="active">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>Next</li>
          </ul>
        </section>
      </section>
    );
  }
}

export default Listings;
