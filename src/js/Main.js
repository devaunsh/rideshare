import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase from './firebase.js';
import NavigationBar from './components/NavigationBar';

import MyRides from './MyRides';

import LoginPage from './LoginPage';
import RidePage from './RidePage';
import AccountPage from './AccountPage';

import { userLogin, setFirebase, setGAPI } from './redux/actions';

export class Main extends Component {

  componentWillMount() {
    const gapiConfig = {
      client_id: '591511873815-grq5if4sl6dcn2jpcnncauvk7kneo1ji.apps.googleusercontent.com'
    }
    require('google-client-api')().then(gapi => {
      gapi.load('auth2', () => {
        gapi.auth2.init(gapiConfig).then(auth => {
          if (auth.isSignedIn.get()) {
            firebase.auth().signInAndRetrieveDataWithCredential(
              firebase.auth.GoogleAuthProvider.credential(auth.currentUser.get().getAuthResponse().id_token, null)
            ).then(firebaseUser => {

              this.props.setGAPI(gapi);
              this.props.setFirebase(firebase);
              let ref = firebase.database().ref('/users/' + firebaseUser.user.uid);

              ref.once('value').then(snapshot => {
                  if (this.props.history.location.pathname === '/') {
                    if (!snapshot.val()) {
                      ref.set(firebaseUser.user.uid, () => {
                      ref.set({name: firebaseUser.user.displayName, email: firebaseUser.user.email});
                    });
                  }
                    this.props.history.push('/ride');
                  }


              })


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
          <Route path="/ride" component={RidePage} />
          <Route path="/account" component={AccountPage} />
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
