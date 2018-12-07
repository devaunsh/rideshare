import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Collapse } from "react-bootstrap";

import { Modal } from "react-bootstrap";
import { Well } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Panel } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ControlLabel } from "react-bootstrap";
import { Checkbox } from "react-bootstrap";
import { withRouter } from "react-router";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

import 'mdbreact/dist/css/mdb.css';


import ReactDOM from "react-dom";
import { userLogin } from "./redux/actions";

class Feedback extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFeedChange = this.handleFeedChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: null,
      feedback: null,
      rating: null
    };
  }





  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handleFeedChange(event) {
    this.setState({ feedback: event.target.value });
  }
  handleRatingChange(event) {
    this.setState({ rating: event.target.value });
  }


  handleSubmit() {

    console.log(this.state);

    /* TODO: Hook it up to backend */

    this.setState({
      email: null,
      feedback: null,
      rating: null
    }, () => {
    	window.location.reload();
    });



  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
      Cost Per Person: The same amount will be charged to each rider.
      <hr />
      Total Cost: The total cost would be split between your riders.
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (


    <MDBContainer style={{ marginLeft: "29%", marginTop: "10%"}}>
    <MDBRow>
      <MDBCol md="6">
        <form>
          <p className="h3 text-center mb-4">Write to us</p>
          <div className="grey-text">

            <MDBInput
              value={this.state.email}
              label="Enter your email here"
              onChange={event => this.handleEmailChange(event)}
              icon="envelope"
              group
              size="lg"
              type="email"
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              type="textarea"
              rows="2"
              size="lg"
              label="Your message"
              icon="pencil"
              value={this.state.feedback}
              onChange={event => this.handleFeedChange(event)}
              label="Enter your feedback here"
            />

            <MDBInput
              label="Rating"
              icon="tag"
              group
              size="lg"
              type="text"
              validate
              error="wrong"
              success="right"
              value={this.state.rating}
              onChange={event => this.handleRatingChange(event)}
              label="Enter your rating here"

            />

          </div>
          <div className="text-center">
            <MDBBtn size="lg" outline color="primary" onClick={this.handleSubmit}>
              <b>Send</b> <MDBIcon size="lg" icon="paper-plane" className="indigo-text pr-3" />
            </MDBBtn>
          </div>
        </form>
      </MDBCol>
    </MDBRow>
  </MDBContainer>

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
    userLogin: user => {
      dispatch(userLogin(user));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Feedback)
);
