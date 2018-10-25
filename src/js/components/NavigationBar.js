import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import { userLogout } from "../redux/actions";
import logo from "../../img/logo.svg";

export class NavBar extends Component {
  signOut() {
    this.props.userLogout();
    this.props.history.push("/");
  }

  render() {
      /*do not modify! Notify Zhe before make changes*/
    const { user } = this.props;
    return (
      <Navbar>
        <Navbar.Header>
            <img src={logo} className="navbar-logo" alt="logo" />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/home">
              Home
            </NavItem>
            <NavItem eventKey={2} href="/ride">
              Find a Ride
            </NavItem>
            <NavItem eventKey={3} href="#">
              Create a Ride
            </NavItem>
            <NavItem eventKey={4} href="#">
              Account
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <MenuItem eventKey={1.1} onClick={this.signOut.bind(this)}>
                Log out
              </MenuItem>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <div><img className="navbar-user-icon" src={user.profilePicURL} alt="User logo" />{user.name}</div>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    settings: state.settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
