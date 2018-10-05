import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


import { userLogout } from '../redux/actions';
import logo from '../../img/logo.svg';


export class NavBar extends Component {

  signOut() {
    this.props.userLogout();
    this.props.history.push('/');
  }


  render() {
    const { user } = this.props;
    return (
      <Navbar collapseOnSelect style={{display: user.name ? 'block' : 'none'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a><img alt="logo" src={logo} /></a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
          Home
          </NavItem>
          <NavItem eventKey={2} href="#">
          Find a Ride
          </NavItem>
          <NavItem eventKey={2} href="#">
          Create a Ride
          </NavItem>
          <NavItem eventKey={3} href="#">
          Account
          </NavItem>
          <MenuItem eventKey={1.1} onClick={this.signOut.bind(this)} >Log out</MenuItem>
          <div>Welcome, {user.name}!</div>
          <div><img className="navbar-user-icon" src={user.profilePicURL} alt="User logo" />{user.name}</div>
      
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    settings: state.settings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout()),

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
