import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import logo from '../img/logo.svg';
import { userLogin } from './redux/actions';
import MyRides from './components/MyRides.jsx'
class AccountPage extends Component {


  render() {
    return (
      <div className="home-page">
        <MyRides />


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
