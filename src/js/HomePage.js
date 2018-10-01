import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import logo from '../img/logo.svg';
import { userLogin } from './redux/actions';
class HomePage extends Component {


  render() {
    return (
      <div className="home-page">
        <div className="home-page-title-wrapper">

      
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
