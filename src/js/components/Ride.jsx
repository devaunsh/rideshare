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
import { Card } from "bootstrap";
class CancelModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      show: this.props.show,
      Timestamp: this.props.timestamp,
      driver: this.props.driver,
      info: this.props.info,
      email: this.props.email
    };
  }

  handleCancel() {
      let timestamp = this.state.Timestamp;
      let unique = this.props.driver + timestamp;
      var message = this.state.email + "\n" +
      "Cancel Ride Info" + "\n" +
      this.state.info.date + "\n" +
      this.state.info.time + "\n" +
       this.state.info.start + "\n" +
       this.state.info.dest + "\n" +
       this.state.info.paymentMethods + "\n" +
        this.state.info.cost + "\n" +
        this.state.info.description;
      var request = new XMLHttpRequest();

      request.open("POST", "https://rideshare-server1.herokuapp.com", true);
      request.setRequestHeader('Content-Type', 'text/plain');

      request.onreadystatechange = function() {
        if (request.readyState === 4) {

          window.location.reload();

        }
      }
      request.send(message);
      if (this.props.driver == firebase.auth().currentUser.uid) {
        //cancel driver case
        let ref = firebase.database().ref("/trips");

        let ref2 = firebase.database().ref(`/trips/${unique}/UsersArray`);
        ref2.once('value').then(snapshot => {
        let temp = snapshot.val();
        Object.entries(temp).forEach(entry => {
          let key = entry[0];
          console.log(key);
          let userRef = key;
          let ref3 = firebase.database().ref(`/users/${userRef}/TripsArray`);
           ref3.once('value').then(snapshot1 => {
             console.log(snapshot1.val());
             var desertRef = ref3.child(unique).remove();
           })
          //var desertRef = ref3.child(unique).remove();
        })
          if (temp === null) {
            console.log("Error: UsersArray Empty")
            return;
          }
        })
        var desertRef = ref.child(unique);
        desertRef.remove();
      //  window.location.reload();
      } else {
        //cancel passenger case
        let ref = firebase.database().ref(`/trips/${unique}/UsersArray`);
        var desertRef = ref.child(firebase.auth().currentUser.uid).remove();

        //delete in the TripsArray
        let userRef = firebase.auth().currentUser.uid;
        let ref2 = firebase.database().ref(`/users/${userRef}/TripsArray`);
        var desertRef2 = ref2.child(unique).remove();

    }




  }

  render() {
    return (
      <Modal
      {...this.props}
      bsSize="small"
      aria-labelledby="contained-modal-title-sm"
      >
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-sm">Comfirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>
      Are you sure you want to cancel this trip?
      </p>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={this.props.onHide}>Close</Button>
      <Button bsStyle="primary" onClick={this.handleCancel }>Yes</Button>
      </Modal.Footer>
      </Modal>
    );
  }
}
class WaitModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleWait = this.handleWait.bind(this);
    this.state = {
      show: this.props.show,
      Timestamp: this.props.timestamp,
      driver: this.props.driver,
      info: this.props.info,
      email: this.props.email
    };
  }

  handleWait() {
      let timestamp = this.state.Timestamp;
      let unique = this.props.driver + timestamp;
      let date = new Date();
      let waitstamp = date.toGMTString();

      let ref = firebase.database().ref(`/trips/${unique}/Waitlist`);
      let childnode = ref.child(`${this.props.driver}`);
      childnode.once('value', function(snapshot) {
        if (snapshot.exists()) {
          ref.child(`${firebase.auth().currentUser.uid}`).set(waitstamp);
          console.log(ref);
          childnode.remove();
        } else {
          ref.child(`${firebase.auth().currentUser.uid}`).set(waitstamp);
        }
      });




  }

  render() {
    return (
      <Modal
      {...this.props}
      bsSize="small"
      aria-labelledby="contained-modal-title-sm"
      >
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-sm">Comfirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>
      Are you going to be on the waiting list?
      </p>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={this.props.onHide}>Close</Button>
      <Button bsStyle="primary" onClick={this.handleWait}>Yes</Button>
      </Modal.Footer>
      </Modal>
    );
  }
}

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

    var ref_seatChange = firebase.database().ref("/trips/" + this.state.driver
    + this.state.Timestamp);
    ref_seatChange.once('value').then(snapshot => {
      this.state.seats--;
      ref_seatChange.update({seats: this.state.seats});
    });

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
    if(this.state.seats === 0)
    return true;
    else
    return false;
  }

  ifBooked() {
    if(this.state.seats != 0) {
      return true;
    } else {
      return false;
    }
  }


  render() {
    let smClose = () => this.setState({ smShow: false });
    let styles = {
      visibility: ""
    }
    return (

      <tr>
      <Card />
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
      <td>
      <Button onClick={() => this.setState({ smShow: true })} bsStyle="primary" disabled = {this.ifBooked()}>Waitlist</Button>
      <WaitModal driver={this.state.driver} timestamp={this.state.Timestamp} info={this.state} email={this.state.email} show={this.state.smShow} onHide={smClose} />
      </td>
      <td style={styles}>
      <Button bsStyle="primary"  >Cancel</Button>
      <CancelModal driver={this.state.driver} timestamp={this.state.Timestamp} info={this.state} email={this.state.email} show={this.state.smShow} onHide={smClose} />
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
