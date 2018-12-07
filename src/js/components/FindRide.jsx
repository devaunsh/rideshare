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
  Col,
  Button
} from "react-bootstrap";

class FindRides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
      result: []
    };
  }

  filterData() {
    let filter_start = "";
    let filter_dest = "";
    let filter_date = "";
    if (document.getElementById("start_loc") != null) {
      filter_start = document.getElementById("start_loc").value;
    }
    if (document.getElementById("end_loc") != null) {
      filter_dest = document.getElementById("end_loc").value;
    }
    if (document.getElementById("trip_date") != null) {
      filter_date = document.getElementById("trip_date").value;
    }
    const tripsRef = firebase.database().ref("/trips/");
    tripsRef.on("value", snapshot => {
      let trips = snapshot.val();
      let newState = [];
      if(filter_start && filter_dest && filter_date){
        for (let trip in trips) {
          if (trips[trip].start == filter_start && trips[trip].dest
            == filter_dest && filter_date == trips[trip].date) {
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
              dateandtime: res
            });
          }
        }

        this.setState({
          result: newState
        });
      }
      else if(filter_start && filter_dest){
        for (let trip in trips) {
          if (trips[trip].start == filter_start && trips[trip].dest
            == filter_dest) {
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
              dateandtime: res
            });
          }
        }

        this.setState({
          result: newState
        });
      }
      else if(filter_start && filter_date){
        for (let trip in trips) {
          if (trips[trip].start == filter_start && filter_date == trips[trip].date) {
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
              dateandtime: res
            });
          }
        }

        this.setState({
          result: newState
        });
      }
      else if(filter_dest && filter_date){
        for (let trip in trips) {
          if (trips[trip].dest == filter_dest && filter_date == trips[trip].date) {
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
              dateandtime: res
            });
          }
        }

        this.setState({
          result: newState
        });
      }
      else if(filter_date){
        for (let trip in trips) {
          if (filter_date == trips[trip].date) {
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
              dateandtime: res
            });
          }
        }

        this.setState({
          result: newState
        });
      }
      else if(filter_start){
        for (let trip in trips) {
          if (trips[trip].start == filter_start) {
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
              dateandtime: res
            });
          }
        }

        this.setState({
          result: newState
        });
      }
      else if(filter_dest){
        for (let trip in trips) {
          if (trips[trip].dest == filter_dest) {
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
              dateandtime: res
            });
          }
        }

        this.setState({
          result: newState
        });
      }

    });

  };
    // const sorted = []
    //   .concat(this.state.rides)
    //   .sort((a, b) => new Date(a.dateandtime) - new Date(b.dateandtime));
    //
    // let filter_start = "";
    // let filter_dest = "";
    // let filter_date = "";
    // if (document.getElementById("start_loc") != null) {
    //   filter_start = document.getElementById("start_loc").value;
    // }
    // if (document.getElementById("end_loc") != null) {
    //   filter_dest = document.getElementById("end_loc").value;
    // }
    // if (document.getElementById("trip_date") != null) {
    //   filter_date = document.getElementById("trip_date").value;
    // }
    //
    // //Filtering of rides
    // let result = sorted;
    // if (filter_start) {
    //   result = result.filter(entry => entry.start === filter_start);
    // }
    // if (filter_dest) {
    //   result = result.filter(entry => entry.dest === filter_dest);
    // }
    // if (filter_date) {
    //   result = result.filter(entry => entry.date === filter_date);
    // }
    //
    // this.setState({
    //   result: result
    // });

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
  selectOnchange = () => {
      this.setState({result: []});
      this.filterData();
      this.forceUpdate();
    };
  clear = () => {
        this.setState({result: []});
      };
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
        <h2>Find Rides</h2>

        <FormGroup controlId="formControlsSelect">
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <ControlLabel>Start Location</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="Choose Location"
                  id="start_loc"
                >
                  <option value="" >
                    Choose here
                  </option>
                  <option value="Chicago">Chicago</option>
                  <option value="Purdue">Purdue</option>
                  <option value="Indianapolis">Indianapolis</option>
                </FormControl>
              </Col>
              <Col xs={6} md={4}>
                <ControlLabel>End Location</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="Choose Location"
                  id="end_loc"
                >
                  <option value="" >
                    Choose here
                  </option>
                  <option value="Chicago">Chicago</option>
                  <option value="Purdue">Purdue</option>
                  <option value="Indianapolis">Indianapolis</option>
                </FormControl>
              </Col>
              <Col xsHidden md={4}>
                <ControlLabel>Choose Date</ControlLabel>
                <FormControl
                  id="trip_date"
                  type="date"
                />
              </Col>
            </Row>
          </Grid>
        </FormGroup>
        <Button bsStyle="primary" onClick={this.selectOnchange}>
        Submit
        </Button>
        <Button bsStyle="primary" onClick={this.clear}>
        Clear
        </Button>
        {this.state.result.map(ride => (
          <Ride ride={ride} />
        ))}
      </div>
    );
  }
}

export default FindRides;
