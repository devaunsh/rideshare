import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { userLogin } from './redux/actions'
import logo from '../img/logo.svg';

class RidePage extends Component {


  render() {
    return (
      <div className="ride-page">
        <div className="ride-page-title-wrapper">
          <h1>RidePage</h1>
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
