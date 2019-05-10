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
    if (this.props.carousel !== undefined) {
      images = this.props.carousel;
    }
    console.log("listingsView: ", this.props);

    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Listing Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <img className="logo1" src="https://i.imgur.com/b0sEJQt.png" />
            <h3>{this.props.address}</h3>
            <h1>{this.props.city}</h1>
            <h1>Status: Active</h1>

            <h2>${this.props.price}</h2>
            <p>Price</p>
            <p>Bedrooms</p>
            <h3>{this.props.bedrooms}</h3>
            <h3>Sq. Ft.</h3>
            <h3>{this.props.floorSpace}</h3>

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
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ListingsView;
