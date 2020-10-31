import React from 'react';
import { connect } from 'react-redux';
import DashboardSection from './components/DashboardSection';
import '../../styles/SubscriberDashboard.css';
import '../../styles/Community.css';

class SubscriberDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      activeBill: null,
      effectiveCostData: [],
      mode: 0
    };
  }

  seeAllBills() {
    this.setState({
      mode: 1
    });
  }

  render() {
    return (
      <div className="subscriber-page ">
        <div className="subscriber-main">
          <div className="subscriber-section">
            <DashboardSection />
          </div>
        </div>
        {/* <div className="subscriber-side" /> */}
      </div>
    );
  }
}

const mapStateToProps = () => ({
  // owner: state.userData.owner,
  // projectGroup: state.userData.projectGroup,
  // solarProjects: state.userData.solarProjects
});

export default connect(mapStateToProps)(SubscriberDashboard);
