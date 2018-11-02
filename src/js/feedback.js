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

    	<div>
    	
      
      
      <Form horizontal>
      <p />
      <FormGroup controlId="feedbackemail" >
      <p />
      <Col componentClass={ControlLabel} sm={3}>
      Enter email
      </Col>
      <Col sm={6}>
      <FormControl
      name="email"
      type="email"
      placeholder="Enter your email here"
      value={this.state.value}
      onChange={event => this.handleEmailChange(event)}
      />
      </Col>
      </FormGroup>

      <FormGroup controlId="feedbackdesc" >
      <Col componentClass={ControlLabel} sm={3}>
      Enter feedback
      </Col>
      <Col sm={6}>
      <FormControl
      name="feedback"
      type="text"
      placeholder="Enter your feedback here"
      value={this.state.value}
      onChange={event => this.handleFeedChange(event)}
      />
      </Col>
      </FormGroup>

      <FormGroup controlId="feedbackrating" >
      <Col componentClass={ControlLabel} sm={3}>
      Rating
      </Col>
      <Col sm={6}>
      <FormControl
      type="text"
      name="rating"
      placeholder="1-5"
      value={this.state.value}
      onChange={event => this.handleRatingChange(event)}
      />
      </Col>
      </FormGroup>
      
      

      <Button bsStyle="primary" onClick={this.handleSubmit}>
      Submit
      </Button>
      
      

     

      </Form>
      
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

