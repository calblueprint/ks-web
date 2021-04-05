import React from 'react';
import { connect } from 'react-redux';
import TotalHarvestIcon from '@assets/totalHarvestStat.png';
import GapCertificationIcon from '@assets/gapCertificationStat.png';
import HarvestingFarmIcon from '@assets/harvestingFarmStat.png';
import NorthShoreGapIcon from '@assets/northShoreGapStat.png';
import TrainingFarmsIcon from '@assets/trainingFarmsStat.png';
import Icon from '@assets/userIcon.png';
import DashboardGraph from '@assets/dashboardGraph.png';
import '@styles/Dashboard.css';

import RecentUpdate from '@shared/dashboard/RecentUpdate';
import StatCard from '@shared/dashboard/StatCard';

class KSDashboard extends React.PureComponent {
  // TO-DO: Ensure structure is the same as NSEVP Dashboard, once it is completed
  // On the above note, it may be possible to just have one shared Dashboard class
  render() {
    const numUpdates = 5;
    return (
      <div className="dashboard__container">
        <h1>Dashboard</h1>
        <div className="dashboard__stat-card-row">
          <StatCard
            statIcon={TotalHarvestIcon}
            statName="Total Harvest"
            statNumber="17,000"
            statUnit=" lbs"
            statDescription="of harvest to date"
          />
          <StatCard
            statIcon={GapCertificationIcon}
            statName="GAP Certification"
            statNumber="40"
            statUnit="%"
            statDescription="of farms in Food Hub are GAP Certified"
          />
          <StatCard
            statIcon={HarvestingFarmIcon}
            statName="Harvesting Farms"
            statNumber="10"
            statUnit=" farms"
            statDescription="are harvesting this week"
          />
          <StatCard
            statIcon={NorthShoreGapIcon}
            statName="North Shore GAP"
            statNumber="20"
            statUnit="%"
            statDescription="of all GAP-certified farms in North Shore are NSEVP"
          />
          <StatCard
            statIcon={TrainingFarmsIcon}
            statName="Training Farms"
            statNumber="20"
            statUnit=" farms"
            statDescription="are currently in a Group GAP cohort"
          />
        </div>
        <div className="dashboard__secondary-row">
          <div className="dashboard__production-container">
            <img src={DashboardGraph} alt="farm production history" />
          </div>
          <div className="dashboard__updates-container">
            <h2>Recent Updates</h2>
            {[...Array(numUpdates)].map(id => {
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(KSDashboard);
