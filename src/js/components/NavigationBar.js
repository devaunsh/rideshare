import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


import { userLogout } from '../redux/actions';
import logo from '../../img/logo.svg';


export class NavBar extends Component {

  signOut() {
    this.props.userLogout();
//    this.props.setPlayingMusicId('');
//    this.props.setPlaylists({});
//    this.props.history.push('/');
  }

  handleToggleClick() {
//    this.props.setSidebarOpenState(true);
  }

  render() {
    const { user } = this.props;

    return (
      <Navbar collapseOnSelect style={{display: user.name ? 'block' : 'none'}}>
        <Navbar.Toggle onClick={this.handleToggleClick.bind(this)} />
        <Navbar.Header>
          <Navbar.Brand>
            <a><img alt="logo" src={logo} />RideShare</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown
            eventKey={1}
            title={user ?
              <div><img className="navbar-user-icon" src={user.profilePicURL} alt="User logo" />{user.name}</div>
              : ''}
            id="basic-nav-dropdown">
            <MenuItem eventKey={1.1} onClick={this.signOut.bind(this)} >Sign out</MenuItem>
          </NavDropdown>
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
  //  setSidebarOpenState: isSidebarOpen => dispatch(setSidebarOpenState(isSidebarOpen)),
//    setPlaylists: playlists => dispatch(setPlaylists(playlists)),
//    setPlayingMusicId: id => dispatch(setPlayingMusicId(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
