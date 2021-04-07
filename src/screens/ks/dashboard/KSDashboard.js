import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '@shared/dashboard/Dashboard';
import CertificationGraph from '../../shared/graphs/CertificationGraph';

class KSDashboard extends React.PureComponent {
  render() {
    return <Dashboard graph={<CertificationGraph />} />;
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(KSDashboard);
