/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSignedIn, getCredentials } from '@lib/credentials';

class AuthenticatedRoute extends React.PureComponent {
  isAuthorized() {
    const { user, credentialCheck } = this.props;
    const userCredentials = getCredentials(user);

    if (credentialCheck) {
      // If credential check prop exists, ensure they are authorized
      return credentialCheck(userCredentials);
    }

    // ensure they are signed in
    return isSignedIn(userCredentials);
  }

  render() {
    const { component: Component, user, ...rest } = this.props;
    const authorized = this.isAuthorized();
    return (
      <Route
        {...rest}
        render={props =>
          authorized ? (
            <Component user={user} {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.userData.user
});
export default connect(mapStateToProps)(AuthenticatedRoute);
