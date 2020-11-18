import React from 'react';
import Icon from '../../assets/success.png';
import '../../styles/GeneralUserDashboard.css';

class StatCard extends React.PureComponent {
  render() {
    return (
      <div className="column">
        <div className="stat-card">
          <img src={Icon} alt="icon" />
          <h3>Stat Name</h3>
          <h1>99</h1>
          <h4>Stat description that describes stat</h4>
        </div>
      </div>
    );
  }
}

export default StatCard;
