import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";

import { userLogin } from "./redux/actions";
import logo from "../img/logo.svg";

class LoginPage extends Component {
  handleGoogleSigninClick() {
    const { gapi, firebase } = this.props.packages;
    const gapiAuth = gapi.auth2.getAuthInstance();

    if (gapiAuth.isSignedIn.get()) {
      this.props.userLogin(gapiAuth.currentUser.get().getBasicProfile());

    } else {
      gapiAuth.signIn().then(user => {
        this.props.userLogin(user.getBasicProfile());
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(
            firebase.auth.GoogleAuthProvider.credential(
              user.getAuthResponse().id_token
            )
          )
          .then(firebaseUser => {
            let ref = firebase
              .database()
              .ref("/users/" + firebaseUser.user.uid);

            // Reroute user if user is at '/'

            ref.once("value").then(snapshot => {
              if (

                !snapshot.val()
              ) {
                ref.set(firebaseUser.user.uid, () => {
                  ref.set({
                    name: this.props.user.name,
                    email: this.props.user.email
                  });
                });


              }
              this.props.history.push("/ride");
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-page-title-wrapper">
          <img src={logo} className="login-page-logo" alt="logo" />
        </div>

        <Button
          bsStyle="primary"
          bsSize="Large"
          onClick={this.handleGoogleSigninClick.bind(this)}
        >
          Sign in with Google
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => {
      dispatch(userLogin(user));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
