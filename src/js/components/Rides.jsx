import React, { Component } from "react";
import Ride from "./Ride.jsx";
import firebase from "../firebase.js";
import { Well, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setRides } from '../redux/actions';
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

        let res = format_date + "T" + trips[trip].time + ":00";


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
          dateandtime: res
        });
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
      <div>
      <h2>Available Rides</h2>

        {sorted.map(ride => (
          <Ride ride={ride} />
        ))}


      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRides: rides => {
      dispatch(setRides(rides))
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rides));
