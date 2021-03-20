/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSignedIn, getCredentials } from '@lib/credentials';
import SuspenseRoute from './SuspenseRoute';

class AuthenticatedRoute extends React.PureComponent {
  isAuthorized() {
    const { user, credential } = this.props;
    const userCredentials = getCredentials(user);

    if (credential) {
      // If credential prop exists, ensure they are authorized
      return userCredentials.includes(credential);
    }

    // else, just ensure they are signed in
    return isSignedIn(userCredentials);
  }

  render() {
    const { component: Component, user, ...rest } = this.props;
    const authorized = this.isAuthorized();
    return (
      <SuspenseRoute
        {...rest}
        render={props =>
          authorized ? (
            <Component {...props} />
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
