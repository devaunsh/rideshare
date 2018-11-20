import React, { Component } from "react";
import { Well, Image, tr, td, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ControlLabel } from "react-bootstrap";
import firebase from "../firebase.js";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class Ride extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = {
      show: false,
      smShow: false,
      chargeType: this.props.ride.chargeType,
      cost: this.props.ride.cost,
      date: this.props.ride.date,
      description: this.props.ride.description,
      dest: this.props.ride.dest,
      paymentMethods: this.props.ride.paymentMethods,
      picture: this.props.ride.picture,
      seats: this.props.ride.seats,
      start: this.props.ride.start,
      time: this.props.ride.time,
      Timestamp: this.props.ride.Timestamp,
      driver: this.props.ride.id, //driver
    };
  }
  handleConfirm() {
    //should be block if already in TripsArray
    var currentUser = firebase.auth().currentUser.uid;
    var ref_userTrips = firebase.database().ref("/users/" + currentUser);

    var ref_tripUsers = firebase.database().ref("/trips/" + this.state.driver
    + this.state.Timestamp);
    let date = new Date();
    let timestamp = date.toGMTString();
    ref_userTrips.once('value').then(snapshot => {
      let temp = snapshot.child('TripsArray').val();
      if (temp == null) {
        temp = {};
      }
      temp[this.state.driver + this.state.Timestamp] = timestamp;
      ref_userTrips.child('TripsArray').set(temp , () => {
        ref_tripUsers.once('value').then(snapshot => {
          let temp1 = snapshot.child("UsersArray").val();
          if (temp1 === null) {
            console.log("Error: UsersArray Empty");
            return;
          }
          temp1[currentUser] = timestamp;
          ref_tripUsers.child('UsersArray').set(temp1);
          var request = new XMLHttpRequest();

          request.open("POST", "https://rideshare-server1.herokuapp.com", true);
          request.setRequestHeader('Content-Type', 'text/plain');
          request.onreadystatechange = function() {
            if (request.readyState === 4) {
              window.location.reload();
            }
          }
          var message = this.props.user.email + "\n" +
          "Congratulations! You successfully book a ride" + "\n" +
          this.state.date + "\n" +
          this.state.time + "\n" +
           this.state.start + "\n" +
           this.state.dest + "\n" +
           this.state.paymentMethods + "\n" +
            this.state.cost + "\n" +
            this.state.description;
          request.send(message);

        });
      });
      //  }
    });

  }



  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  getAvailableSeats(){
    if(this.state.seats === 0 )
    return true;
    else
    return false;
  }



  render() {
    let smClose = () => this.setState({ smShow: false });
    return (

      <tr>
      <td>{this.state.description}</td>
      <td>{this.state.cost}</td>
      <td>{this.state.date}</td>
      <td>{this.state.time}</td>
      <td>{this.state.start}</td>
      <td>{this.state.dest}</td>
      <td>{this.state.seats}</td>
      <td>
      {this.state.chargeType === "2" && "Total Cost"}
      {this.state.chargeType === 1 && "Cost per person"}
      </td>
      <td>{this.state.paymentMethods}</td>

      <td>
      <Image src={this.state.picture} alt="No image" />
      </td>
      <td>
      <Button onClick={this.handleShow} bsStyle="primary" disabled = {this.getAvailableSeats()}>Book now!</Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Confirm Ride</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form horizontal>
      <FormGroup>
      <Col componentClass={ControlLabel} sm={6}>
      Leaving from :
      </Col>
      <Col sm={6}>
      <p>
      </p>

      {this.state.start}
      </Col>
      </FormGroup>

      <FormGroup>
      <Col componentClass={ControlLabel} sm={6}>
      Going To :
      </Col>
      <Col sm={6}>
      <p>
      </p>
      {this.state.dest}
      </Col>
      </FormGroup>

      <FormGroup>
      <Col componentClass={ControlLabel} sm={6}>
      Date :
      </Col>
      <Col sm={6}>
      <p>
      </p>
      {this.state.date}
      </Col>
      </FormGroup>

      <FormGroup>
      <Col componentClass={ControlLabel} sm={6}>
      Time :
      </Col>
      <Col sm={6}>
      <p>
      </p>
      {this.state.time}
      </Col>
      </FormGroup>

      <FormGroup>
      <Col componentClass={ControlLabel} sm={6}>
      Description :
      </Col>
      <Col sm={6}>
      <p>
      </p>
      {this.state.description}
      </Col>
      </FormGroup>

      <FormGroup>
      <Col componentClass={ControlLabel} sm={6}>
      Cost :
      </Col>
      <Col sm={6}>
      <p>
      </p>
      {this.state.cost}
      </Col>
      </FormGroup>

      <FormGroup>
      <Col componentClass={ControlLabel} sm={6}>
      Accepted Payment Methods :
      </Col>
      <Col sm={6}>
      <p>
      </p>
      {this.state.paymentMethods}
      </Col>
      </FormGroup>

      </Form>

      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="primary" onClick={this.handleConfirm}>
      Confirm
      </Button>
      <Button onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
      </Modal>
      </td>
      </tr>



    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,

  };
};


export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Ride)
);
