/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingComponent from './LoadingComponent';

const PPRoute = ({ isLoadingUserData, ...rest }) => {
  const loading = isLoadingUserData;
  return loading ? <LoadingComponent /> : <Route {...rest} />;
};

const mapStateToProps = state => ({
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(PPRoute);
