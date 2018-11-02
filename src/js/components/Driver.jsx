import React, { Component } from "react";
import DriverRide from "./DriverRide.jsx";
import firebase from "../firebase.js";
import { Well, Table } from "react-bootstrap";
class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: []
    };
  }

  
  componentDidMount() {
    const tripsRef = firebase.database().ref("/trips/");
    tripsRef.on("value", snapshot => {
      let trips = snapshot.val();
      let newState = [];
      for (let trip in trips) {
        if (trips[trip].driver == firebase.auth().currentUser.uid) {
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
          let format_date = trips[trip].date;
          format_date = format_date.split("/");
          let month = format_date[0];
          let day = format_date[1];
          let year = format_date[2];
          let res =
            year + "-" + month + "-" + day + "T" + trips[trip].time + ":00";

          var cash = false;
          var venmo = false;
          var paypal = false;

          if(payMethods.includes("Venmo"))
            venmo = true;
          if(payMethods.includes("Cash"))
            cash = true;
          if(payMethods.includes("PayPal"))
            paypal = true;

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
            start: trips[trip].start,
            time: trips[trip].time,
            Timestamp: trips[trip].Timestamp,
            dateandtime: res,
            Cash: cash,
            Venmo: venmo,
            PayPal: paypal
          });
        }
      }

      this.setState({
        rides: newState
      });
    });
  }
  render() {
    const sorted = []
      .concat(this.state.rides)
      .sort((a, b) => new Date(a.dateandtime) - new Date(b.dateandtime));
    return (
      <div className="container-fluid">
        <h2>Driving</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Description</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Time</th>
              <th>From</th>
              <th>To</th>
              <th>Seats Available</th>
              <th>Charge Type</th>
              <th>Payment Methods</th>
              <th>Picture</th>
              <th>Cancel this trip</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(ride => (
              <DriverRide ride={ride} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Driver;
