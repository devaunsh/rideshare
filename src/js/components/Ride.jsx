import React, { Component } from "react";
import { Well } from "react-bootstrap";

class Ride extends Component {
  state = {
    chargeType: this.props.chargeType,
    cost: this.props.cost,
    date: this.props.date,
    description: this.props.description,
    dest: this.props.dest,
    participants: this.props.participants,
    paymentMethods: this.props.paymentMethods,
    picture: this.props.picture,
    seats: this.props.seats,
    start: this.props.start,
    time: this.props.time,
    trip_id: this.props.trip_id
  };
  render() {
    return (
      <Well>
        <p>Ride chargeType: {this.state.chargeType}</p>
        <p>Ride cost: {this.state.cost}</p>
        <p>Ride date {this.state.date}</p>
        <p>Ride description: {this.state.description}</p>
        <p>Ride dest: {this.state.dest}</p>
        <p>Ride participants: {this.state.participants}</p>
        <p>Ride paymentMethods: {this.state.paymentMethods}</p>
        <p>Ride picture: {this.state.picture}</p>
        <p>Ride seats: {this.state.seats}</p>
        <p>Ride start: {this.state.start}</p>
        <p>Ride time: {this.state.time}</p>
        <p>Ride trip_id: {this.state.trip_id}</p>
      </Well>
    );
  }
}

export default Ride;
