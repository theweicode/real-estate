import React from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

let images = [];
class ListingsView extends React.Component {
  render() {
    let mortgage = Math.round(this.props.price / 183.5);
    let saleprice = this.props.price;
    console.log("sales price:", saleprice);
    console.log("listing view address: ", this.props.index);
    if (this.props.carousel !== undefined) {
      images = this.props.carousel;
    }
    /* console.log("listingsView: ", this.props); */

    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="example-modal-sizes-title-xl"
        centered
      >
        <Modal.Header closeButton>
          <img className="logo1" src="https://i.imgur.com/b0sEJQt.png" />
          <Modal.Title id="example-modal-sizes-title-xl">
            <div className="wrapper">
              <div className="box-1">
                <h3 className="address">{this.props.address}</h3>
                <div className="citystate">
                  {this.props.city}, {this.props.state}{" "}
                </div>
                <div className="stats">
                  <ul>
                    <li>{this.props.bedrooms} beds</li>
                    <li>
                      {this.props.floorSpace}sqft lot size {this.props.type}
                    </li>
                    <li> {this.props.type}</li>
                  </ul>
                </div>
              </div>
              <div className="box-2">
                <div className="forsale">FOR SALE</div>
                <div className="price">${this.props.price}</div>
                <div className="mortgage">Est. Mortgage ${mortgage}/mo</div>
              </div>
              <div className="box-3">
                <Button className="listingviewbtn" variant="light">
                  {" "}
                  <i class="fas fa-heart" />
                  Save{" "}
                </Button>
                <Button className="istingviewbtn" variant="light">
                  <i class="far fa-envelope" />
                  Share
                </Button>
              </div>
              <div className="box-4">
                <img src="./img/stockportraits/man1.jpg" width="100px" />
              </div>
              <div className="box-5">
                <div className="agentname">Richard Jett</div>
                <div className="contact">LISTING AGENT</div>
                <div className="phone">(619)-555-2712</div>
                <div className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="reviews">(125)</i>
                </div>
              </div>
            </div>

            {/*     <Container>
              <Row>
                <Col xl={6} className="lfcol">
                  <h3 className="address">{this.props.address}</h3>
                  <div className="citystate">
                    {this.props.city}, {this.props.state}{" "}
                  </div>
                  <div className="stats">
                    <ul>
                      <li>{this.props.bedrooms} beds</li>
                      <li>
                        {this.props.floorSpace}sqft lot size {this.props.type}
                      </li>
                      <li> {this.props.type}</li>
                    </ul>
                  </div>
                </Col>
                <Col xl={6} className="rtcol">
                  <div className="forsale">FOR SALE</div>
                  <div className="price">${this.props.price}</div>
                  <div className="mortgage">Est. Mortgage ${mortgage}/mo</div>
                  <Button className="listingviewbtn" variant="light">
                    {" "}
                    <i class="fas fa-heart" />
                    Save{" "}
                  </Button>
                  <Button className="istingviewbtn" variant="light">
                    <i class="far fa-envelope" />
                    Share
                  </Button>
                </Col>
              </Row>
            </Container> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {/*  <Row className="show-grid">
              <Col xs={6} md={8}>
                <h3>Seller: {this.props.seller}</h3>
              </Col>
              <Col xs={12} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
            </Row> */}

            <Row className="show-grid">
              {/* <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col> */}

              <Carousel>
                {images.map(function(name, index) {
                  return (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={name}
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <p>{index + 1}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-outline-secondary btnmin col-sm-12 button btn-lg"
            onClick={this.props.onHide}
          >
            Request Info
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ListingsView;
