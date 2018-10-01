import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


import { userLogout } from '../redux/actions';
import logo from '../../img/logo.svg';


export class NavBar extends Component {

  signOut() {
    this.props.userLogout();
//    this.props.setPlayingMusicId('');
//    this.props.setPlaylists({});
    this.props.history.push('/');
  }

  handleToggleClick() {
//    this.props.setSidebarOpenState(true);
  }

  render() {
    const { user } = this.props;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a><img alt="logo" src={logo} /></a>
          </Navbar.Brand>
        </Navbar.Header>
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
  //  setSidebarOpenState: isSidebarOpen => dispatch(setSidebarOpenState(isSidebarOpen)),
//    setPlaylists: playlists => dispatch(setPlaylists(playlists)),
//    setPlayingMusicId: id => dispatch(setPlayingMusicId(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
