import React, { Component } from "react";
import Ride from "./Ride.jsx";
import firebase from "../firebase.js";
import { Well } from "react-bootstrap";
class Rides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: []
    };
  }

  //componentDidMount() {
  //  let tripsRef = firebase.database().ref("/trips/");
  //  tripsRef.on("value", function(snapshot) {
  //    console.log(snapshot.val());
  //    let trips = [];
  //    snapshot.forEach(function(childSnapshot) {
  //      trips.push(childSnapshot.val());
  //      console.log(childSnapshot.val());
  //     let trip = childSnapshot.val();
  //     trip["trip_id"] = childSnapshot.key;
  //     console.log(trip);
  //   });
  // });
  //  console.log(trips);
  //  this.setState({ rides: trips });
  // }
  componentDidMount() {
    const tripsRef = firebase.database().ref("/trips/");
    tripsRef.on("value", snapshot => {
      let trips = snapshot.val();
      let newState = [];
      for (let trip in trips) {

        newState.push({
          id: trip,
          chargeType: trips[trip].chargeType,
          cost: trips[trip].costs,
          date: trips[trip].date,
          description: trips[trip].description,
          dest: trips[trip].dest,
          participants: trips[trip].participants,
          paymentMethods: trips[trip].paymentMethods,
          picture: trips[trip].ImageURL,
          seats: trips[trip].seats,
          start: trips[trip].start,
          time: trips[trip].time,
          trip_id: trips[trip].trip_id
        });
      }

      this.setState({
        rides: newState
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.rides.map(ride => (
          <Ride ride={ride} />
        ))}
      </div>
    );
  }
}

export default Rides;
