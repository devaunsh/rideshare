import React, { Component } from "react";
import { Well, Image, tr, td, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import firebase from "../firebase.js";
import { ReactDOM } from "react-dom";
import { Collapse } from "react-bootstrap";

import { Popover } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Panel } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { ControlLabel } from "react-bootstrap";
import { Checkbox } from "react-bootstrap";
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
      email: this.props.email,
      info: this.props.info
    };
  }

  handleCancel() {
      let timestamp = this.state.Timestamp;
      let unique = this.props.driver + timestamp;

        //cancel driver case
        let ref = firebase.database().ref("/trips");

        let ref2 = firebase.database().ref(`/trips/${unique}/UsersArray`);
        ref2.once('value').then(snapshot => {
        let temp = snapshot.val();
        Object.entries(temp).forEach(entry => {

          let key = entry[0];
          let userRef = key;
          let ref3 = firebase.database().ref("/users");

           ref3.once('value').then(snapshot1 => {
             var message = snapshot1.child(`${userRef}/email`).val() + "\n" +
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


             request.send(message);

             var desertRef = ref3.child(`${userRef}/TripsArray/${unique}`).remove();

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
<<<<<<< HEAD
    //    window.location.reload();

        //delete in the TripsArray
        let userRef = firebase.auth().currentUser.uid;
        let ref1 = firebase.database().ref(`/users/${userRef}/TripsArray`);
        var desertRef2 = ref1.child(unique).remove();
        window.location.reload();
    }
=======
      //  window.location.reload();


        //delete in the TripsArray
        let userRef = firebase.auth().currentUser.uid;
        let ref4 = firebase.database().ref(`/users/${userRef}/TripsArray`);
        var desertRef2 = ref4.child(unique).remove();


>>>>>>> 23d2dbac33f49b692e160e175c08d7802e68b8ee

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
class DriverRide extends Component {

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
    };
  }





  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

<<<<<<< HEAD

    handleStartChange(event) {
      this.setState({ start: event.target.value });
    }
    handleDestChange(event) {
      this.setState({ dest: event.target.value });
    }
    handleDateChange(event) {
      this.setState({ date: event.target.value });
    }
    handleTimeChange(event) {
      this.setState({ time: event.target.value });
    }
    handleSeatsChange(event) {
      //  console.log(ReactDOM.findDOMNode(this.select).value);
      /*if (this.input && this.input.value != 0)*/
      this.setState({ seats: event.target.value });
    }
    handleDescriptionChange(event) {
      this.setState({ description: event.target.value });
    }
    handleCostsChange(event) {

      console.log(this.state.cost);
      console.log(event.target.value);
      this.setState({ cost: event.target.value });
    }
    handleTypeChange(event) {
      //if (this.input1)
      this.setState({ total_or_perperson: event.target.value });
    }
    handleCash(event) {
      this.setState({ Cash: event.target.checked });
    }
    handleVenmo(event) {
      this.setState({ Venmo: event.target.checked });
    }
    handlePaypal(event) {
      this.setState({ PayPal: event.target.checked });
    }

    handleImageChange(event) {
      // var blob = this.input2.files[0].slice(0, );
      // var base64data;
      // var reader = new FileReader();
      // reader.readAsDataURL(blob);
      // reader.onloadend = function() {
      //       base64data = reader.result;
      //     }

      const localImageURL = window.URL.createObjectURL(this.input2.files[0]);
      console.log(localImageURL)
      console.log(this.input2);
      this.setState({ picture: localImageURL });
    }
    getValidationStateStart(){
      if(this.state.start === "" )
      return 'error';
    }
    getValidationStateDest(){
      if(this.state.dest === "" )
      return 'error';
    }
    getValidationStateDate(){
      if(this.state.date === "" )
      return 'error';
    }
    getValidationStateTime(){
      if(this.state.time === "" )
      return 'error';
    }
    getValidationStateCost(){
      if(this.state.cost === "" )
      return 'error';
    }

    handleSubmit() {
      if(this.state.start === "" || this.state.start === null || this.state.dest === "" || this.state.dest === null || this.state.date === "" || this.state.date === null
      || this.state.cost === "" || this.state.cost === null ){
        alert('Please make sure to complete the required fields before you Submit');
        return;
      }
      const { firebase } = this.props.packages;
      const { gapi } = this.props.packages;
      let date = new Date();
      let timestamp = date.toGMTString();
      let unique = firebase.auth().currentUser.uid + timestamp;
      let ref = firebase.database().ref("/trips/" + unique);
      ref.once("value").then(snapshot => {
        if (!snapshot.val()) {
      //    console.log(this.state);
      //    console.log(ref);
          ref.set(
            {
              start: this.state.start,
              dest: this.state.dest,
              date: this.state.date,
              time: this.state.time,
              seats: this.state.seats,
              ImageURL: this.state.picture,
              costs: this.state.cost,
              description: this.state.description,
              total_or_perperson: this.state.total_or_perperson,
              Paypal: this.state.PayPal,
              Venmo: this.state.Venmo,
              Cash: this.state.Cash,
              UsersArray: {[firebase.auth().currentUser.uid]: timestamp},
              Timestamp: timestamp,
              driver: firebase.auth().currentUser.uid
            },
            () => {
              if (this.state.picture !== null) {
                let ref_storage = firebase.storage().ref("/" + unique + "/Image");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", this.state.picture, true);
                xhr.responseType = "blob";
                xhr.onload = function(e) {
                  if (this.status == 200) {
                    var myImage = this.response;
                    ref_storage.put(myImage).then(snapshot => {
                      snapshot.ref.getDownloadURL().then(value => {

                      console.log(value);
                        ref.child('ImageURL').set(value);
                      //  window.location.reload();
                      });
                    });


                  }
                };
                xhr.send();
              }

              let ref2 = firebase
              .database()
              .ref("/users/" + firebase.auth().currentUser.uid);
              ref2.once("value").then(snapshot => {

                let temp = snapshot.child("TripsArray").val();
                if (temp === null) {
                  temp = {};
                }
                temp[unique] = timestamp;
                ref2.child("TripsArray").set(temp, () => {
                  if (this.state.picture == null) {
                    window.location.reload();
                  }
                });
              });

            }

          );
        }
      });
      this.setState({ editShow: false });
      this.handleCancel();
    }

=======
>>>>>>> 23d2dbac33f49b692e160e175c08d7802e68b8ee
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
<<<<<<< HEAD
      <CancelModal ref={el => this.state.element = el} driver={this.state.driver} timestamp={this.state.Timestamp} show={this.state.smShow} onHide={smClose} />
      </td>
      <td>
      <Button bsStyle="primary" onClick={() => this.setState({ editShow: true})}>Edit!</Button>
=======
      <CancelModal driver={this.state.driver} timestamp={this.state.Timestamp} info={this.state} email={this.state.email} show={this.state.smShow} onHide={smClose} />
>>>>>>> 23d2dbac33f49b692e160e175c08d7802e68b8ee
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
  )(DriverRide)
);
