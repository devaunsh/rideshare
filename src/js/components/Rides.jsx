import React, { Component } from "react";
import Ride from "./Ride.jsx";
import firebase from "../firebase.js";

class Rides extends Component {
  constructor(props) {
    super(props);
    this.state = { rides: [] };
  }

  componentDidMount() {
    let trips = [];
    let tripsRef = firebase.database().ref("/trips/");
    const ref = this;
    tripsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        trips.push(childSnapshot.val());
        //console.log(childSnapshot.val());
        let trip = childSnapshot.val();
        console.log(trip);
        trip["trip_id"] = childSnapshot.key;
      });
    });
    console.log(trips);
    this.setState({ rides: trips });
    console.log(this.state.rides);
  }

  render() {
    return (
      <div>
        {this.state.rides.map(ride => (
          <Ride key={ride.trip_id} ride={ride} />
        ))}
      </div>
    );
  }
}

export default Rides;
