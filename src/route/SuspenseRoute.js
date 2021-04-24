/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingComponent from './Loading';

class SuspenseRoute extends React.PureComponent {
  render() {
    // TODO: Replace loading spinner with suspense fallback
    const {
      component: Component,
      isNSEVP,
      isLoadingUserData,
      ...rest
    } = this.props;
    const loading = isLoadingUserData;
    return loading ? (
      <LoadingComponent />
    ) : (
      <Route
        {...rest}
        render={props => <Component {...props} isNSEVP={isNSEVP} />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(SuspenseRoute);
