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

import ReactDOM from 'react-dom';

import { userLogin } from './redux/actions'
import logo from '../img/logo.svg';
import Rides from './components/Rides'

class RidePage extends Component {

constructor(props, context) {

    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleDestChange = this.handleDestChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSeatsChange = this.handleSeatsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCash = this.handleCash.bind(this);
    this.handleVenmo = this.handleVenmo.bind(this);
    this.handlePaypal = this.handlePaypal.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {
      show: false,
      start: null,
      dest: null,
      date: null,
      time: null,
      seats: 0,
      description: null,
      costs: 0,
      total_or_perperson: 1,
      Cash: false,
      Venmo: false,
      PayPal: false,
      ImageURL: null,
    };
  }

  componentDidMount() {
    if(!window.location.hash) {
        window.location = window.location + '#rides';
        window.location.reload();
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleStartChange (event) {
  	this.setState( {start: event.target.value} );
  }
  handleDestChange (event) {
    this.setState( {dest: event.target.value} );
  }
  handleDateChange (event) {
    this.setState( {date: event.target.value} );
  }
  handleTimeChange (event) {
    this.setState( {time: event.target.value} );
  }
  handleSeatsChange () {
  //  console.log(ReactDOM.findDOMNode(this.select).value);
    this.setState( {seats: this.input.value} );
  }
  handleDescriptionChange (event) {
    this.setState( {description: event.target.value} );
  }
  handleCostsChange (event) {
    this.setState( {costs: event.target.value} );
  }
  handleTypeChange (event) {
    this.setState( {total_or_perperson: this.input1.value} );
  }
  handleCash(event) {
    this.setState( {Cash: event.target.checked} );
  }
  handleVenmo(event) {
    this.setState( {Venmo: event.target.checked} );
  }
  handlePaypal(event) {
    this.setState( {PayPal: event.target.checked} );
  }

  handleImageChange(event) {
    // var blob = this.input2.files[0].slice(0, );
    // var base64data;
    // var reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onloadend = function() {
    //       base64data = reader.result;
    //     }
    const localImageURL = window.URL.createObjectURL(this.input2.files[0]);

    this.setState({ImageURL: localImageURL}, () => {

    });

  }
  handleSubmit(){
    const { gapi, firebase } = this.props.packages;
    let date = new Date();
    let timestamp = date.toGMTString();
    let unique = firebase.auth().currentUser.uid + timestamp
    let ref = firebase.database().ref('/trips/' + unique);
    ref.once('value').then(snapshot => {
      if (!snapshot.val()) {
        ref.set({
          start: this.state.start,
          dest: this.state.dest,
          date: this.state.date,
          time: this.state.time,
          seats: this.state.seats,
          costs: this.state.costs,
          description: this.state.description,
          total_or_perperson: this.state.total_or_perperson,
          Paypal: this.state.PayPal,
          Venmo: this.state.Venmo,
          Cash: this.state.Cash,
          UsersArray: [firebase.auth().currentUser.uid],
        } , () => {
          if (this.state.ImageURL !== null) {
            let ref_storage = firebase.storage().ref('/'+ unique + '/Image');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.state.ImageURL, true);
            xhr.responseType = 'blob';
            xhr.onload = function(e) {
              if (this.status == 200) {
                var myImage = this.response;
                ref_storage.put(myImage).then(snapshot => {
                  snapshot.ref.getDownloadURL().then(value => {
                    ref.child('ImageURL').set(value);
                  });
                });

                //ref.set({ImageURL: })
              }
            };
            xhr.send();

          }
          //Possible Concurrency Problem
          let ref2 = firebase.database().ref('/users/' + firebase.auth().currentUser.uid);
          ref2.once('value').then(snapshot => {
            ref2.child('TripsArray').set([unique], () => {
              this.setState({
                show: false,
                start: null,
                dest: null,
                date: null,
                time: null,
                seats: 0,
                description: null,
                costs: 0,
                total_or_perperson: 0,
                PayPal: false,
                Venmo: false,
                Cash: false,
                ImageURL: null,
              })
            });
          })

        });
      }
    });

  }
  componentWillMount() {
    // const element = <Rides />;
    // ReactDOM.render(element, document.getElementById('ride-page'));
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
      <div id="ride-page">
        <Rides />
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
      <FormControl name = 'start' type="text" placeholder="Enter the start location" onChange={event => this.handleStartChange(event)} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalGoing">
    <Col componentClass={ControlLabel} sm={3}>
      Going to
    </Col>
    <Col sm={9}>
      <FormControl name = 'dest' type="text" placeholder="Enter the destination" onChange={event => this.handleDestChange(event)} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalDate">
    <Col componentClass={ControlLabel} sm={3}>
      Date
    </Col>
    <Col sm={9}>
      <FormControl type="text" placeholder="mm/dd/yyyy" onChange={event => this.handleDateChange(event)} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalGoing">
    <Col componentClass={ControlLabel} sm={3}>
      Time
    </Col>
    <Col sm={9}>
      <FormControl type="text" placeholder="hh:mm" onChange={event => this.handleTimeChange(event)} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalSelectSeats">
      <Col componentClass={ControlLabel} sm={3}>
      Available Seats
      </Col>
      <Col sm={9}>
      <FormControl componentClass="select" placeholder="select"  inputRef={ref => { this.input = ref; }} onChange={event => this.handleSeatsChange(event)}>
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
      <FormControl componentClass="textarea" placeholder="Enter trip details" onChange={event => this.handleDescriptionChange(event)}/>
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
      <FormControl type="text" placeholder="Enter the amount to be charged" onChange={event => this.handleCostsChange(event)}/>
    </Col>
  </FormGroup>

<FormGroup controlId="formHorizontalSelectCharge">
      <Col componentClass={ControlLabel} sm={3}>
      Charge <OverlayTrigger overlay={popover}>
                <a href="#popover">Type</a>
              </OverlayTrigger>
      </Col>
      <Col sm={9}>
      <FormControl componentClass="select" placeholder="select" inputRef = {ref => { this.input1 = ref; }} onChange={event => this.handleTypeChange(event)}>
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
      <Checkbox inline checked={this.state.CashChecked}
          onChange={event => this.handleCash(event)}>Cash</Checkbox> <Checkbox inline checked={this.state.VenmoChecked}
              onChange={event => this.handleVenmo(event)}>Venmo</Checkbox>{' '}
      <Checkbox checked={this.state.PayPalChecked}
          onChange={event => this.handlePaypal(event)}>PayPal</Checkbox>
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
      <FormControl type="file" accept="image/*" inputRef={ref => this.input2=ref} onChange={event => this.handleImageChange(event)}/>
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
