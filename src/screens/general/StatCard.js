import React from 'react';
import '../../styles/GeneralUserDashboard.css';

class StatCard extends React.PureComponent {
  render() {
    const {
      statIcon,
      statName,
      statNumber,
      statUnit,
      statDescription
    } = this.props;
    return (
      <div className="stat-card-column">
        <div className="stat-card">
          <img src={statIcon} alt="icon" style={{ paddingTop: '20px' }} />
          <h3>{statName}</h3>
          <h1>{statNumber + statUnit}</h1>
          <p>{statDescription}</p>
        </div>
      </div>
    );
  }
}

export default StatCard;
