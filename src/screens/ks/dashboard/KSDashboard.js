import React from 'react';
import { connect } from 'react-redux';
import DashboardSection from './DashboardSection';

class KSDashboard extends React.Component {
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
      <div className="ks-page ">
        <div className="ks-main">
          <div className="ks-section">
            <DashboardSection />
          </div>
        </div>
        {/* <div className="subscriber-side" /> */}
      </div>
    );
  }
}

const mapStateToProps = () => ({
  // user: state.userData.user,
  // projectGroup: state.userData.projectGroup,
  // solarProjects: state.userData.solarProjects
});

export default connect(mapStateToProps)(KSDashboard);
