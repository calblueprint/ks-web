import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/GeneralOwnerDashboard.css';
import RightArrow from '../../assets/right_arrow.png';
// import ProductionEquivalenciesChart from '../../components/ProductionEquivalenciesChart';

class GeneralOwnerDashboard extends React.PureComponent {
  /* dash-solar-details will eventually be its own graph component
     so it'll be easy to write a ternary operator that will render
     it when it's loaded.
  */
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="dash-announcements-cont">
            <div className="header-button">
              <div className="header-only">
                <h3>Page 1</h3>
              </div>
              <div className="right-button">
                <Link to="/404">
                  <img
                    className="button right-arrow-button"
                    src={RightArrow}
                    alt="right arrow"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner
  // projectGroup: state.userData.projectGroup,
  // solarProjects: state.userData.solarProjects
});

export default connect(mapStateToProps)(GeneralOwnerDashboard);
