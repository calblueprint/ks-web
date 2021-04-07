import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '@shared/dashboard/Dashboard';

class KSDashboard extends React.PureComponent {
  render() {
    return <Dashboard />;
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(KSDashboard);
