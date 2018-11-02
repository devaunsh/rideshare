import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import logo from '../img/logo.svg';
import { userLogin } from './redux/actions';
import MyRides from './components/MyRides.jsx'
import Driver from './components/Driver.jsx'
class AccountPage extends Component {


  render() {
    return (
      <div className="home-page">
      <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Driver">
          <Driver packages={this.props.packages}/>
        </Tab>
        <Tab eventKey={2} title="Rider">
          <MyRides />
        </Tab>
      </Tabs>;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountPage));
