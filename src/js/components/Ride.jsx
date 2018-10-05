import React, { Component } from "react";
import { Well, Image } from "react-bootstrap";

class Ride extends Component {
  state = {
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
    cash: this.props.ride.cash,
    paypal: this.props.ride.paypal,
    venmo: this.props.ride.venmo
  };
  render() {
        return (
      <Well>
        <p>description: {this.state.description}</p>
        <p>cost: {this.state.cost}</p>
        <p>date: {this.state.date}</p>
        <p>start location: {this.state.start}</p>
        <p>destination: {this.state.dest}</p>
        <p>seats: {this.state.seats}</p>
        <p>
          chargeType: {this.state.chargeType === "2" && "Total Cost"}
          {this.state.chargeType === 1 && "Cost per person"}
        </p>
        <p>Ride paymentMethods: {this.state.paymentMethods}</p>
        <p>Ride time: {this.state.time}</p>
        <p>Ride picture</p>
        <Image src={this.state.picture} alt="No image"/>


      </Well>
    );
  }
}

export default Ride;
