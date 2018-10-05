import React, { Component } from "react";
import Ride from "./Ride.jsx";
import firebase from "../firebase.js";
import { Well } from "react-bootstrap";
class Rides extends Component {
  constructor(props) {
    super(props);
    this.state = { rides: [],
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
    trip_id: this.props.trip_id};
  }

  componentWillMount() {
    let trips = [];
    let tripsRef = firebase.database().ref("/trips/");
    const ref = this;
    tripsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        trips.push(childSnapshot.val());
        let trip = childSnapshot.val();
        trip['trip_id'] = childSnapshot.key;
      });
    //   this.setState({ rides: trips }, () => {
    //     console.log(this.state.rides);
    //   });
     });



  }

  render() {
    return (
      <div>
        {this.state.rides.map(ride => (
          <Well>
            <p>Ride chargeType: {}</p>
            <p>Ride cost: {ride.costs}</p>
            <p>Ride date {this.state.date}</p>
            <p>Ride description: {ride.description}</p>
            <p>Ride dest: {this.state.dest}</p>
            <p>Ride participants: {this.state.participants}</p>
            <p>Ride paymentMethods: {this.state.paymentMethods}</p>
            <p>Ride picture: {this.state.picture}</p>
            <p>Ride seats: {this.state.seats}</p>
            <p>Ride start: {this.state.start}</p>
            <p>Ride time: {this.state.time}</p>
            <p>Ride trip_id: {this.state.trip_id}</p>
          </Well>
        ))}
      </div>
    );
  }
}

export default Rides;
