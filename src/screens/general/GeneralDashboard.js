import React from 'react';
import { connect } from 'react-redux';
import StatCard from './StatCard';
import RecentUpdate from './RecentUpdate';
import '../../styles/GeneralUserDashboard.css';

class GeneralUserDashboard extends React.PureComponent {
  render() {
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="row">
          <StatCard />
          <StatCard />
          <StatCard />
          <StatCard />
          <StatCard />
        </div>
        <div className="updates-box">
          <h2>Recent Updates</h2>
          <RecentUpdate />
          <RecentUpdate />
          <RecentUpdate />
        </div>
        <div className="chart" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
  // projectGroup: state.userData.projectGroup,
  // solarProjects: state.userData.solarProjects
});

export default connect(mapStateToProps)(GeneralUserDashboard);
