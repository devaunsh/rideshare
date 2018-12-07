import React, { Component } from "react";
import { Well, Image, tr, td, Button, Breadcrumb } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ControlLabel } from "react-bootstrap";
import firebase from "../firebase.js";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Card, CardTitle, CardText, CardImg } from 'reactstrap';
import car_icon from "../../img/car_icon.svg";

class WaitModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleWait = this.handleWait.bind(this);
    this.state = {
      show: this.props.show,
      Timestamp: this.props.timestamp,
      driver: this.props.driver,
      info: this.props.info,
      email: this.props.email,
      waitnum: this.props.waitnum
    };
  }

  handleWait() {
      let timestamp = this.state.Timestamp;
      let unique = this.props.driver + timestamp;
      //let date = new Date();
  //    let waitstamp = this.state.waitnum;
      let ref = firebase.database().ref(`/trips/${unique}/Waitlist`);
      // let childnode = ref.child(`${this.props.driver}`);
      // childnode.once('value', function(snapshot) {
      //   if (snapshot.exists()) {
      //     ref.child(waitstamp).set(`${firebase.auth().currentUser.uid}`);
      //     childnode.remove();
      //   } else {
      //     ref.child(waitstamp).set(`${firebase.auth().currentUser.uid}`);
      //   }
      // });
      ref.once('value').then(snapshot => {
        var queue;
        if (!snapshot.exists()) {
          queue = [];

        }
        else {
          queue = snapshot.val();

        }
        queue.push(`${firebase.auth().currentUser.uid}`);
        ref.set(queue);
      })

      var ref_waitnumChange = firebase.database().ref("/trips/" + this.state.driver
      + this.state.Timestamp);
      ref_waitnumChange.once('value').then(snapshot => {
        this.state.waitnum++;
        ref_waitnumChange.update({waitnum: this.state.waitnum});
        var request = new XMLHttpRequest();

        request.open("POST", "https://rideshare-server1.herokuapp.com", true);
        request.setRequestHeader('Content-Type', 'text/plain');
        request.onreadystatechange = function() {
          if (request.readyState === 4) {
            //window.location.reload();
          }
        }
        var message = this.props.user.email + "\n" +
        "Congratulations! You are in a waitlist of a ride. We will notify you if you are selected." + "\n" +
        this.state.info.date + "\n" +
        this.state.info.time + "\n" +
         this.state.info.start + "\n" +
         this.state.info.dest + "\n" +
         this.state.info.paymentMethods + "\n" +
          this.state.info.cost + "\n" +
          this.state.info.description;
        request.send(message);
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
    this.handleMultipleSeats = this.handleMultipleSeats.bind(this);
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
      waitnum: this.props.ride.waitnum,
      seatsDelta: 1
    };
  }
  handleMultipleSeats(event) {
    this.setState({seatsDelta: event.target.value});
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
      let temp = this.state.seats;
      this.setState({seats: temp - this.state.seatsDelta});
      ref_seatChange.update({seats: this.state.seats});
    });

    let date = new Date();
    let timestamp = date.toGMTString();
    ref_userTrips.once('value').then(snapshot => {
      let temp = snapshot.child('TripsArray').val();
      if (temp == null) {
        temp = {};
      }
      if (!temp[this.state.driver + this.state.Timestamp]) {
        temp[this.state.driver + this.state.Timestamp] = 0;
      }
      temp[this.state.driver + this.state.Timestamp] += Number(this.state.seatsDelta);
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
              //window.location.reload();
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
    return (
      <Card className = "card-outline">
      <CardTitle>
      <Breadcrumb>
        <Breadcrumb.Item active>
        {this.state.start}
          <CardImg className = "car-icon" src={car_icon} alt="No image" />
        {this.state.dest}</Breadcrumb.Item>
        <Breadcrumb.Item active>{this.state.date}</Breadcrumb.Item>
        <Breadcrumb.Item active>{this.state.time}</Breadcrumb.Item>
        <Breadcrumb.Item active>{this.state.cost}
        {this.state.chargeType === "2" && " in total"}
        {this.state.chargeType === 1 && " per person"}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{this.state.paymentMethods}</Breadcrumb.Item>
      </Breadcrumb>
      </CardTitle>

      <CardText>
      <CardImg className = "ride-picture" src={this.state.picture} alt="no picture available" />
      <tr>
      <td className = "ride-description">{this.state.description}</td>
      <td className = "ride-seat">{this.state.seats} seats available</td>
      <td className = "ride-book">
      <Button onClick={this.handleShow} bsStyle="btn btn-info" disabled = {this.getAvailableSeats()}>Book now!</Button>

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
      <FormGroup controlId="SelectSeats">
      <Col componentClass={ControlLabel} sm={6}>
      Seats to book :
      </Col>
      <Col sm={6}>
      <FormControl
      componentClass="select"
      placeholder="select"
      value={this.state.value }
      inputRef={ref => (this.input = ref)}
      onChange={event => this.handleMultipleSeats(event)}
      >
      <option value="1">1</option>
      <option show={this.state.seats > 1 ? true : false} value="2">2</option>
      </FormControl>
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
      <td className = "ride-waitlist">
      <Button onClick={() => this.setState({ smShow: true })} bsStyle="btn btn-warning" disabled = {this.ifBooked()}>Waitlist</Button>
      <WaitModal waitnum={this.state.waitnum} driver={this.state.driver} timestamp={this.state.Timestamp} info={this.state} email={this.state.email} show={this.state.smShow} onHide={smClose} />
      </td>
      </tr>
      </CardText>

    </Card>





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
