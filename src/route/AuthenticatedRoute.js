/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthenticatedRoute extends React.PureComponent {
  render() {
    const {
      component: Component,
      user,
      isAuthorized,
      isNSEVP,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthorized ? (
            <Component user={user} isNSEVP={isNSEVP} {...props} />
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
