import React, { Component } from "react";
import Ride from "./Ride.jsx";
import firebase from "../firebase.js";
import {
  Well,
  Table,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Row,
  Col
} from "react-bootstrap";

class Rides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
      result: []
    };
  }

  componentDidMount() {
    const tripsRef = firebase.database().ref("/trips/");
    tripsRef.on("value", snapshot => {
      let trips = snapshot.val();
      let newState = [];
      for (let trip in trips) {
        let payMethods = [];
        if (trips[trip].Cash) {
          payMethods.push("Cash");
          payMethods.push(" ");
        }
        if (trips[trip].Paypal) {
          payMethods.push("Paypal");
          payMethods.push(" ");
        }
        if (trips[trip].Venmo) {
          payMethods.push("Venmo");
        }

        let format_date = trips[trip].date + "T" + trips[trip].time + ":00";

        newState.push({
          id: trips[trip].driver,
          chargeType: trips[trip].total_or_perperson,
          cost: trips[trip].costs,
          date: trips[trip].date,
          description: trips[trip].description,
          dest: trips[trip].dest,
          paymentMethods: payMethods,
          picture: trips[trip].ImageURL,
          seats: trips[trip].seats,
          waitnum: trips[trip].waitnum,
          start: trips[trip].start,
          time: trips[trip].time,
          Timestamp: trips[trip].Timestamp,
          dateandtime: format_date
        });
      }

      this.setState({
        rides: newState
      });

    });
  }

  render() {
    // const sorted = []
    //   .concat(this.state.rides)
    //   .sort((a, b) => new Date(a.dateandtime) - new Date(b.dateandtime));

    // //Filtering of rides
    // let filter_start = document.getElementById("start_loc").value;
    // let filter_dest = document.getElementById("end_loc").value;
    // let filter_date = document.getElementById("trip_date").value;
    // let result = sorted;
    // if (filter_start) {
    //   result = sorted.filter(entry => entry.start === filter_start);
    // }
    // if (filter_dest) {
    //   result = sorted.filter(entry => entry.dest === filter_dest);
    // }
    // if (filter_date) {
    //   result = sorted.filter(entry => entry.date === filter_date);
    // }

    return (
      <div>
        <h2>Available Rides</h2>
        {this.state.rides.map(ride => (
          <Ride ride={ride} />
        ))}
      </div>
    );
  }
}

export default Rides;
