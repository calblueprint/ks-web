import React from 'react';
import '../../styles/GeneralUserDashboard.css';

class StatCard extends React.PureComponent {
  render() {
    const { statIcon, statName, statNumber, statDescription } = this.props;
    return (
      <div className="stat-card-column">
        <div className="stat-card">
          <img src={statIcon} alt="icon" />
          <h3>{statName}</h3>
          <h1>{statNumber}</h1>
          <h4>{statDescription}</h4>
        </div>
      </div>
    );
  }
}

export default StatCard;
