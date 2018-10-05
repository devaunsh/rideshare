import React, { Component } from "react";
import { Well } from "react-bootstrap";

class Ride extends Component {
  state = {
    chargeType: this.props.ride.chargeType,
    cost: this.props.ride.cost,
    date: this.props.ride.date,
    description: this.props.ride.description,
    dest: this.props.ride.dest,
    participants: this.props.ride.participants,
    paymentMethods: this.props.ride.paymentMethods,
    picture: this.props.ride.picture,
    seats: this.props.ride.seats,
    start: this.props.ride.start,
    time: this.props.ride.time,
    trip_id: this.props.ride.trip_id
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
