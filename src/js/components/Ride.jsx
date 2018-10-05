import React, { Component } from "react";
import { Well, Image, tr, td, Button } from "react-bootstrap";

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
    time: this.props.ride.time
  };

  render() {
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
          <Button bsStyle="primary">Book now!</Button>
        </td>
      </tr>
    );
  }
}

export default Ride;
