import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase from 'firebase';
import NavigationBar from './components/NavigationBar';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RidePage from './RidePage';

import { userLogin, setFirebase, setGAPI } from './redux/actions';

export class Main extends Component {

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyCmtoHnfyQB9ffgfuYCt-ztRJFMWkLErfs",
      authDomain: "rideshare-3c3c1.firebaseapp.com",
      databaseURL: "https://rideshare-3c3c1.firebaseio.com",
      projectId: "rideshare-3c3c1",
      storageBucket: "rideshare-3c3c1.appspot.com",
      messagingSenderId: "591511873815"
    }
    const gapiConfig = {
      client_id: '591511873815-grq5if4sl6dcn2jpcnncauvk7kneo1ji.apps.googleusercontent.com'
    }
    require('google-client-api')().then(gapi => {
      gapi.load('auth2', () => {
        gapi.auth2.init(gapiConfig).then(auth => {
          firebase.initializeApp(firebaseConfig);
          if (auth.isSignedIn.get()) {
            firebase.auth().signInAndRetrieveDataWithCredential(
              firebase.auth.GoogleAuthProvider.credential(auth.currentUser.get().getAuthResponse().id_token, null)
            ).then(firebaseUser => {

              this.props.setGAPI(gapi);
              this.props.setFirebase(firebase);
              // let ref = firebase.database().ref('/users/' + firebaseUser.user.uid);
              //
              // ref.once('value').then(snapshot => {
              //   console.log(snapshot);
              //   if (this.props.history.location.pathname === '/' || !snapshot.val()) {
              //     this.props.history.push('/home');
              //   }
              // })


            }).catch(error => {
              console.log(error);
            });

            this.props.userLogin(auth.currentUser.get().getBasicProfile());
          } else {
            this.props.setGAPI(gapi)
            this.props.setFirebase(firebase)
          }
        }, error => {
          console.log(error);
         })

      })
    });
  }

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Switch key={this.props.location.pathname} location={this.props.location}>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/ride" component={RidePage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => dispatch(userLogin(user)),
    setFirebase: firebase => dispatch(setFirebase(firebase)),
    setGAPI: gapi => dispatch(setGAPI(gapi)),

  }
}

export default withRouter(connect(null, mapDispatchToProps)(Main));