import React, { Component } from "react";
import { Well, Image, tr, td, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ControlLabel } from "react-bootstrap";
import firebase from "../firebase.js";
import { userLogin } from "../redux/actions";

class CancelModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      show: this.props.show,
      Timestamp: this.props.timestamp,
      rider: this.props.rider
    };
  }

  handleCancel() {
      let timestamp = this.state.Timestamp;
      console.log(timestamp);
      if (this.props.rider == firebase.auth().currentUser.uid) {
        let unique = this.props.rider + timestamp;
        let ref = firebase.database().ref("/trips");
        var desertRef = ref.child(unique);
        desertRef.remove();
      } else {
        let unique = this.props.rider + timestamp;
        let ref = firebase.database().ref(`/trips/${unique}/UsersArray`);
        var desertRef = ref.child(firebase.auth().currentUser.uid).remove();

      }
      window.location.reload();
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
class Ride extends Component {

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
      rider: this.props.ride.id,
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
    console.log(this.state.Timestamp);//////
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
                            <Button bsStyle="primary" >
                              Confirm
                            </Button>
                            <Button onClick={this.handleClose}>Close</Button>
                          </Modal.Footer>
                </Modal>
        </td>
        <td>
          <Button bsStyle="primary" onClick={() => this.setState({ smShow: true })} >Cancel!</Button>
          <CancelModal rider={this.state.rider} timestamp={this.state.Timestamp} show={this.state.smShow} onHide={smClose} />
        </td>
      </tr>



    );
  }
}

export default Ride;
