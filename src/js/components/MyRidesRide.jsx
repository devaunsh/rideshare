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

class CancelModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      show: this.props.show,
      Timestamp: this.props.timestamp,
      driver: this.props.driver,
      info: this.props.info,
      email: this.props.email,
      seats: this.props.seats,
      waitnum:this.props.waitnum
    };
  }

  handleCancel() {
      let date = new Date();
      let waitstamp = date.toGMTString();

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

          //window.location.reload();

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
            // console.log(snapshot1.val());
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

        //case: when no seats availble and waitnum not 0, rider cancels the trip
        if ((this.props.seats == 0) && (this.props.waitnum != 0)) {
          var ref_trip = firebase.database().ref("/trips/" + this.state.driver
          + this.state.Timestamp);
          ref_trip.once('value').then(snapshot => {
            this.state.waitnum--;
            ref_trip.update({waitnum: this.state.waitnum});

            var waitRef = firebase.database().ref(`/trips/${unique}/Waitlist`);
            waitRef.once('value').then(snapshot => {
              let queue = snapshot.val();
              let dequeue_user = queue.shift();
              waitRef.set(queue);
              //add this user to UsersArray
              ref_trip.child(`UsersArray/${dequeue_user}`).set(0);
              let dequeue_user_ref = firebase.database().ref(`/users/${dequeue_user}/TripsArray`);
              dequeue_user_ref.once('value').then(snapshot => {
                dequeue_user_ref.child(unique).set(0);
              })
            })

          });
        } else {
          var desert_trip = firebase.database().ref("/trips/" + this.state.driver
          + this.state.Timestamp);
          desert_trip.once('value').then(snapshot => {
            this.state.seats++;
            desert_trip.update({seats: this.state.seats});
          });

        }

        //delete in the TripsArray
        let userRef = firebase.auth().currentUser.uid;
        let ref2 = firebase.database().ref(`/users/${userRef}/TripsArray`);
        var desertRef2 = ref2.child(unique).remove();
        console.log(this.state.info.waitnum);


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

class MyRidesRide extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
      email: this.props.user.email,
      driver: this.props.ride.id, //driver
      waitnum: this.props.ride.waitnum
    };
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
      <Button bsStyle="primary" onClick={() => this.setState({ smShow: true })} >Cancel!</Button>
      <CancelModal waitnum={this.state.waitnum} seats={this.state.seats} driver={this.state.driver} timestamp={this.state.Timestamp} info={this.state} email={this.state.email} show={this.state.smShow} onHide={smClose} />
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
  )(MyRidesRide)
);
