import React from 'react';
import Dashboard from '@shared/dashboard/Dashboard';

class NSEVPDashboard extends React.PureComponent {
  render() {
    return <Dashboard graph="production" />;
  }
}

export default NSEVPDashboard;
