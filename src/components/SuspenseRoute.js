/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingComponent from './Loading';

const SuspenseRoute = ({ isLoadingUserData, ...rest }) => {
  // TODO: Replace loading spinner with suspense fallback
  const loading = isLoadingUserData;
  return loading ? <LoadingComponent /> : <Route {...rest} />;
};

const mapStateToProps = state => ({
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(SuspenseRoute);
