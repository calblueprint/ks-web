/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSignedIn, isOnboarding, getCredentials } from '../lib/credentials';
import SuspenseRoute from './SuspenseRoute';

class AuthenticatedRoute extends React.PureComponent {
  isAuthorized() {
    const { user, credential, onboarding } = this.props;
    const userCredentials = getCredentials(user);
    // If user is still onboarding, they can only access onboarding routes
    if (isOnboarding(userCredentials)) {
      return onboarding;
    }

    if (credential) {
      // If credential prop exists, ensure they are authorized
      return userCredentials.includes(credential);
    }

    // If this is the onboarding route, user must either be signed out
    // or actively onboarding (handled above)
    if (onboarding) {
      return !isSignedIn(userCredentials);
    }

    // else, just ensure they are signed in
    return isSignedIn(userCredentials);
  }

  render() {
    const { component: Component, user, ...rest } = this.props;
    const authorized = this.isAuthorized();
    const userCredentials = getCredentials(user);
    const redirectRoute = isOnboarding(userCredentials) ? '/onboarding' : '/';
    return (
      <SuspenseRoute
        {...rest}
        render={props =>
          authorized ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: redirectRoute, state: { from: props.location } }}
            />
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
