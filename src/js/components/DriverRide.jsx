import React, { Component } from "react";
import { Well, Image, tr, td, Button, Breadcrumb } from "react-bootstrap";
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
import { Card, CardTitle, CardText, CardImg } from 'reactstrap';
import car_icon from "../../img/car_icon.svg";

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

    //delete in the TripsArray
    let userRef = firebase.auth().currentUser.uid;
    let ref4 = firebase.database().ref(`/users/${userRef}/TripsArray`);
    var desertRef2 = ref4.child(unique).remove();

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
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleDestChange = this.handleDestChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSeatsChange = this.handleSeatsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCash = this.handleCash.bind(this);
    this.handleVenmo = this.handleVenmo.bind(this);
    this.handlePaypal = this.handlePaypal.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

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
      Cash: this.props.ride.Cash,
      Venmo: this.props.ride.Venmo,
      Paypal: this.props.ride.Paypal,
      localImage: null
    };
  }





  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    //Edit button
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

    this.setState({ cost: event.target.value });
  }
  handleTypeChange(event) {
    if (this.input1)
    this.setState({ chargeType: Number(this.input1.value) });
  }
  handleCash(event) {
    this.setState({ Cash: event.target.checked });
  }
  handleVenmo(event) {
    this.setState({ Venmo: event.target.checked });
  }
  handlePaypal(event) {
    this.setState({ Paypal: event.target.checked });
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
    this.setState({ localImage: localImageURL });
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

    let unique = firebase.auth().currentUser.uid + this.state.Timestamp;
    let ref = firebase.database().ref("/trips/" + unique);
    ref.once("value").then(snapshot => {
      if (snapshot.exists()) {
        ref.update(
          {
            start: this.state.start,
            dest: this.state.dest,
            date: this.state.date,
            time: this.state.time,
            seats: this.state.seats,
            costs: this.state.cost,
            description: this.state.description,
            total_or_perperson: this.state.chargeType,
            Paypal: this.state.Paypal,
            Venmo: this.state.Venmo,
            Cash: this.state.Cash,
          },
          () => {
            if (this.state.localImage !== null) {
              let ref_storage = firebase.storage().ref("/" + unique + "/Image");
              var xhr = new XMLHttpRequest();
              xhr.open("GET", this.state.localImage, true);
              xhr.responseType = "blob";
              xhr.onload = function(e) {
                if (this.status == 200) {
                  var myImage = this.response;
                  ref_storage.put(myImage).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(value => {


                      ref.child('ImageURL').set(value);
                        window.location.reload();
                    });
                  });


                }
              };
              xhr.send();
            }
            else {
              window.location.reload();
            }

            // let ref2 = firebase
            // .database()
            // .ref("/users/" + firebase.auth().currentUser.uid);
            // ref2.once("value").then(snapshot => {
            //
            //   let temp = snapshot.child("TripsArray").val();
            //   if (temp === null) {
            //     temp = {};
            //   }
            //   temp[unique] = timestamp;
            //   ref2.child("TripsArray").set(temp, () => {
            //     if (this.state.picture == null) {
            //       window.location.reload();
            //     }
            //   });
            // });

          }

        );
      }
    });
    this.setState({ editShow: false });

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
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
    let smClose = () => this.setState({ smShow: false });
    return (
      <Card className = "rider-card-outline">
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
      <td className = "ride-cancel">
      <Button bsStyle="btn btn-warning" onClick={() => this.setState({ smShow: true })} >Cancel this trip!</Button>
      <CancelModal waitnum={this.state.waitnum} seats={this.state.seats}
      driver={this.state.driver} timestamp={this.state.Timestamp}
      info={this.state} email={this.state.email} show={this.state.smShow}
      onHide={smClose} />
      </td>
      <td className = "ride-edit">
      <Button bsStyle="primary" onClick={this.handleShow} >
      Edit
      </Button>
      <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Create Ride</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Ride Information">
      <Form horizontal>
      <p />
      <FormGroup controlId="formHorizontalLeave" validationState={this.getValidationStateStart()}>
      <Col componentClass={ControlLabel} sm={3}>
      Leaving From *
      </Col>
      <Col sm={9}>
      <FormControl
      componentClass="select"
      value={this.state.start}
      inputRef={ref => (this.input = ref)}
      onChange={event => this.handleStartChange(event)}
      >
      <option value="1"></option>
      <option value="Chicago">Chicago</option>
      <option value="Indianapolis">Indianapolis</option>
      <option value="Purdue">Purdue</option>
      </FormControl>
      </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalGoing" validationState={this.getValidationStateDest()}>
      <Col componentClass={ControlLabel} sm={3}>
      Going to *
      </Col>
      <Col sm={9}>
      <FormControl
      componentClass="select"
      placeholder="select"
      value={this.state.dest }
      inputRef={ref => (this.input = ref)}
      onChange={event => this.handleDestChange(event)}
      >
      <option value="1"></option>
      <option value="Chicago">Chicago</option>
      <option value="Indianapolis">Indianapolis</option>
      <option value="Purdue">Purdue</option>
      </FormControl>
      </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalDate" validationState={this.getValidationStateDate()}>
      <Col componentClass={ControlLabel} sm={3}>
      Date *
      </Col>
      <Col sm={9}>
      <FormControl
      type="date"
      placeholder={this.state.date}
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
      type="time"
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
      value={this.state.seats }
      inputRef={ref => (this.input = ref)}
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
      inputRef={ref => (this.input1 = ref)}
      value={this.state.chargeType}
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
      checked={this.state.Paypal}
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
      <Button bsStyle="primary" onClick={this.handleSubmit}>
      Submit
      </Button>
      <Button onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
      </Modal>
      </td>
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
  )(DriverRide)
);
