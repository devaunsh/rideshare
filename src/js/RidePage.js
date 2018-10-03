import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Well } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Tabs } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';
import { withRouter } from 'react-router';


import { userLogin } from './redux/actions'
import logo from '../img/logo.svg';


class RidePage extends Component {

constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange (event) {
  	this.setState( [event.target.name]: event.target.value )
  }

  handleSubmit(){

  	
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
      <div className="ride-page">
        <div className="ride-page-title-wrapper">
          <h1>RidePage</h1>
        </div>
       
      	


<div>

        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Create Ride
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Ride</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">


  <Tab eventKey={1} title="Ride Information">
    <Form horizontal>
    <p></p>
  <FormGroup controlId="formHorizontalLeave">
  	<p></p>
    <Col componentClass={ControlLabel} sm={3}>
      Leaving from
    </Col>
    <Col sm={9}>
      <FormControl name = 'start' type="text" placeholder="Enter the start location" onChange={event => this.handleChange(event)} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalGoing">
    <Col componentClass={ControlLabel} sm={3}>
      Going to
    </Col>
    <Col sm={9}>
      <FormControl name = 'dest' type="text" placeholder="Enter the destination" onChange={event => this.handleChange(event)} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalDate">
    <Col componentClass={ControlLabel} sm={3}>
      Date
    </Col>
    <Col sm={9}>
      <FormControl type="text" placeholder="mm/dd/yyyy"/>
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalGoing">
    <Col componentClass={ControlLabel} sm={3}>
      Time
    </Col>
    <Col sm={9}>
      <FormControl type="text" placeholder="hh:mm" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalSelectSeats">
      <Col componentClass={ControlLabel} sm={3}>
      Available Seats
      </Col>
      <Col sm={9}>
      <FormControl componentClass="select" placeholder="select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </FormControl>
      </Col>
    </FormGroup>

     <FormGroup controlId="formHorizontalDesc">
      <Col componentClass={ControlLabel} sm={3}>
      Trip Description
      </Col>
      <Col sm={9}>
      <FormControl componentClass="textarea" placeholder="Enter trip details" />
      </Col>
    </FormGroup>
  </Form>
  </Tab>



  <Tab eventKey={2} title="Payment">

  <Form horizontal>
  	<p></p>
    <FormGroup controlId="formHorizontalCost">
  	<p></p>
    <Col componentClass={ControlLabel} sm={3}>
      Cost
    </Col>
    <Col sm={9}>
      <FormControl type="text" placeholder="Enter the amount to be charged" />
    </Col>
  </FormGroup>

<FormGroup controlId="formHorizontalSelectCharge">
      <Col componentClass={ControlLabel} sm={3}>
      Charge <OverlayTrigger overlay={popover}>
                <a href="#popover">Type</a>
              </OverlayTrigger>
      </Col>
      <Col sm={9}>
      <FormControl componentClass="select" placeholder="select">
        <option value="1">Cost Per Person</option>
        <option value="2">Total Cost</option>
      </FormControl>
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPayment">
    <Col componentClass={ControlLabel} sm={3}>
      Payment Methods
    </Col>
    <Col sm={9}>
      <Checkbox inline>Cash</Checkbox> <Checkbox inline>Venmo</Checkbox>{' '}
      <Checkbox inline>PayPal</Checkbox>
      </Col>
    </FormGroup>

  </Form>
  </Tab>


  <Tab eventKey={3} title="Picture">
    
    <Form horizontal>
    
  	<p></p>
    <FormGroup controlId="formHorizontalCost">
  	
    <Col componentClass={ControlLabel} sm={3}>
      Upload
    </Col>
    <p></p>
    <Col sm={6}>
      <FormControl type="file" accept="image/*" />
    </Col>
  </FormGroup>
  </Form>


            


  </Tab>
</Tabs>
            
            
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick = {this.handleSubmit}>Submit</Button>
            <Button onClick={this.handleClose}>Close</Button>

          </Modal.Footer>
        </Modal>
      </div>

      

      </div>






    );
  }
}


const mapStateToProps = state => {
	return {
    user: state.user,
    packages: state.packages
	}
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => {
      dispatch(userLogin(user))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RidePage));
