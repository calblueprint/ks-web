import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/GeneralOwnerDashboard.css';
import RightArrow from '../../assets/right_arrow.png';

class GeneralOwnerDashboard extends React.PureComponent {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-box">
          <div className="dashboard-content">
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
