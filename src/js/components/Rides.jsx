import React, { Component } from "react";
import Ride from "./Ride.jsx";
import firebase from "../firebase.js";

class Rides extends Component {
  constructor(props) {
    super(props);
    this.state = { rides: [] };
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
          <Ride key={this.props.trip_id} ride={ride} />
        ))}
      </div>
    );
  }
}

export default Rides;
