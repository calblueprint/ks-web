import React from 'react';
import { connect } from 'react-redux';
import StatCard from './StatCard';
import RecentUpdate from './RecentUpdate';
import Icon from '../../assets/success.png';
import '../../styles/GeneralUserDashboard.css';

class GeneralUserDashboard extends React.PureComponent {
  render() {
    const updates = [1, 2, 3, 4, 5];
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="stat-card-row">
          <StatCard
            statIcon={Icon}
            statName="Stat Name"
            statNumber="99"
            statDescription="This is the description of the statistic above"
          />
          <StatCard
            statIcon={Icon}
            statName="Stat Name"
            statNumber="99"
            statDescription="This is the description of the statistic above"
          />
          <StatCard
            statIcon={Icon}
            statName="Stat Name"
            statNumber="99"
            statDescription="This is the description of the statistic above"
          />
          <StatCard
            statIcon={Icon}
            statName="Stat Name"
            statNumber="99"
            statDescription="This is the description of the statistic above"
          />
          <StatCard
            statIcon={Icon}
            statName="Stat Name"
            statNumber="99"
            statDescription="This is the description of the statistic above"
          />
        </div>
        <div className="dashboard-update-box">
          <h2>Recent Updates</h2>
          {updates.map(id => {
            return (
              <RecentUpdate
                key={id}
                profilePic={Icon}
                updateDate="11/17/20"
                updateAuthor="Nick Wong"
                updateText="This is an update. Please read it, it must be quite important ya'know."
              />
            );
          })}
        </div>
        <div className="dashboard-chart" />
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
