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

class CancelModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      show: this.props.show,
      Timestamp: this.props.timestamp,
      driver: this.props.driver
    };
  }

  handleCancel() {
      let timestamp = this.state.Timestamp;
      let unique = this.state.driver + timestamp;
      console.log(unique);
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
    //    window.location.reload();

        //delete in the TripsArray
        let userRef = firebase.auth().currentUser.uid;
        let ref1 = firebase.database().ref(`/users/${userRef}/TripsArray`);
        var desertRef2 = ref1.child(unique).remove();
        window.location.reload();
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

class DriverRide extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      smShow: false,
      editShow: false,
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
      total_or_perperson: this.props.ride.chargeType,
      Cash: this.props.ride.Cash,
      Venmo: this.props.ride.Venmo,
      PayPal: this.props.ride.PayPal
    };
  }

  handleCancel() {
      let timestamp = this.state.Timestamp;
      let unique = this.state.driver + timestamp;
      console.log(unique);
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
        window.location.reload();
    }

  }





  handleClose() {
    this.setState({ show: false });
  }

  handleEditClose() {
    this.setState({ editShow: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


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

  getAvailableSeats(){
    if(this.state.seats === 0 )
    return true;
    else
    return false;
  }



  render() {

  const popover = (
    <Popover id="modal-popover" title="popover">
    Cost Per Person: The same amount will be charged to each rider.
    <hr />
    Total Cost: The total cost would be split between your riders.
    </Popover>
  );
    let smClose = () => this.setState({ smShow: false });
    let editClose = () => this.setState({ editShow: false });
    return (

      <tr>
      <Modal show={this.state.editShow} onHide={this.handleEditClose.bind(this)}>
      <Modal.Header closeButton>
      <Modal.Title>Create Ride</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Ride Information">
      <Form horizontal>
      <p />
      <FormGroup controlId="formHorizontalLeave" validationState={this.getValidationStateStart()}>
      <p />
      <Col componentClass={ControlLabel} sm={3}>
      Leaving from *
      </Col>
      <Col sm={9}>
      <FormControl
      name="start"
      type="text"
      placeholder="Enter the start location"
      value={this.state.start}
      onChange={event => this.handleStartChange(event)}
      />
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalGoing" validationState={this.getValidationStateDest()}>
      <Col componentClass={ControlLabel} sm={3}>
      Going to *
      </Col>
      <Col sm={9}>
      <FormControl
      name="dest"
      type="text"
      placeholder="Enter the destination"
      value={this.state.dest}
      onChange={event => this.handleDestChange(event)}
      />
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalDate" validationState={this.getValidationStateDate()}>
      <Col componentClass={ControlLabel} sm={3}>
      Date *
      </Col>
      <Col sm={9}>
      <FormControl
      type="text"
      placeholder="mm/dd/yyyy"
      value={this.state.date}
      onChange={event => this.handleDateChange(event)}
      />
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalGoing" validationState={this.getValidationStateTime()}>
      <Col componentClass={ControlLabel} sm={3}>
      Time *
      </Col>
      <Col sm={9}>
      <FormControl
      type="text"
      placeholder="hh:mm"
      value={this.state.time}
      onChange={event => this.handleTimeChange(event)}
      />
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalSelectSeats">
      <Col componentClass={ControlLabel} sm={3}>
      Available Seats *
      </Col>
      <Col sm={9}>
      <FormControl
      componentClass="select"
      placeholder="select"
      value={this.state.seats}
      onChange={event => this.handleSeatsChange(event)}
      >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      </FormControl>
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalDesc">
      <Col componentClass={ControlLabel} sm={3}>
      Trip Description
      </Col>
      <Col sm={9}>
      <FormControl
      componentClass="textarea"
      placeholder="Enter trip details"
      value={this.state.description}
      onChange={event =>
        this.handleDescriptionChange(event)
      }
      />
      </Col>
      </FormGroup>
      </Form>
      </Tab>

      <Tab eventKey={2} title="Payment">
      <Form horizontal>
      <p />
      <FormGroup controlId="formHorizontalCost" validationState={this.getValidationStateCost()}>
      <p />
      <Col componentClass={ControlLabel} sm={3}>
      Cost *
      </Col>
      <Col sm={9}>
      <FormControl
      type="number"
      placeholder="Enter the amount to be charged"
      value={this.state.cost}
      onChange={event => this.handleCostsChange(event)}
      />
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalSelectCharge">
      <Col componentClass={ControlLabel} sm={3}>
      Charge{" "}
      <OverlayTrigger overlay={popover}>
      <a href="#popover">Type</a>
      </OverlayTrigger>
      </Col>
      <Col sm={9}>
      <FormControl
      componentClass="select"
      placeholder="select"
      value={this.state.total_or_perperson}
      onChange={event => this.handleTypeChange(event)}
      >
      <option value="1">Cost Per Person</option>
      <option value="2">Total Cost</option>
      </FormControl>
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPayment">
      <Col componentClass={ControlLabel} sm={3}>
      Payment Methods
      </Col>
      <Col sm={9}>
      <Checkbox
      inline
      checked={this.state.Cash}
      onChange={event => this.handleCash(event)}
      >
      Cash
      </Checkbox>{" "}
      <Checkbox
      inline
      checked={this.state.Venmo}
      onChange={event => this.handleVenmo(event)}
      >
      Venmo
      </Checkbox>{" "}
      <Checkbox
      checked={this.state.PayPal}
      onChange={event => this.handlePaypal(event)}
      >
      PayPal
      </Checkbox>
      </Col>
      </FormGroup>
      </Form>
      </Tab>

      <Tab eventKey={3} title="Picture">
      <Form horizontal>
      <p />
      <FormGroup controlId="formHorizontalCost">
      <Col componentClass={ControlLabel} sm={3}>
      Upload
      </Col>
      <p />
      <Col sm={6}>
      <FormControl
      type="file"
      accept="image/*"
      inputRef={ref => (this.input2 = ref)}
      onChange={event => this.handleImageChange(event)}
      />
      </Col>
      </FormGroup>
      </Form>
      </Tab>
      </Tabs>
      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>
      Submit
      </Button>
      <Button onClick={this.handleEditClose.bind(this)}>Close</Button>
      </Modal.Footer>
      </Modal>
      <td>{this.props.ride.description}</td>
      <td>{this.props.ride.cost}</td>
      <td>{this.props.ride.date}</td>
      <td>{this.props.ride.time}</td>
      <td>{this.props.ride.start}</td>
      <td>{this.props.ride.dest}</td>
      <td>{this.props.ride.seats}</td>
      <td>
      {this.props.ride.chargeType === "2" && "Total Cost"}
      {this.props.ride.chargeType === 1 && "Cost per person"}
      </td>
      <td>{this.props.ride.paymentMethods}</td>

      <td>
      <Image src={this.props.ride.picture} alt="No image" />
      </td>
      <td>
      <Button bsStyle="primary" onClick={() => this.setState({ smShow: true })} >Cancel!</Button>
      <CancelModal ref={el => this.state.element = el} driver={this.state.driver} timestamp={this.state.Timestamp} show={this.state.smShow} onHide={smClose} />
      </td>
      <td>
      <Button bsStyle="primary" onClick={() => this.setState({ editShow: true})}>Edit!</Button>
      </td>
      </tr>

    );
  }
}

export default DriverRide;
