import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { userLogin } from './redux/actions';
import logo from '../img/logo.svg';
import NavigationBar from './components/NavigationBar';

class TestPage extends Component {


  render() {
    return (
      <div className="test-page">
        <div className="test-page-title-wrapper">
          //<h1>RideShare</h1>
            <NavigationBar />
            <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               pauseOnHover
             />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestPage));
