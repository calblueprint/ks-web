/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const SuspenseRoute = ({ isLoadingUserData, ...rest }) => {
  return <Route {...rest} />;
};

const mapStateToProps = state => ({
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(SuspenseRoute);
