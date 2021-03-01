import React from 'react';
import '../../styles/NSEVPUserDashboard.css';

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
      <div className="dashboard__stat-card">
        <img src={statIcon} alt="icon" style={{ paddingTop: '20px' }} />
        <h3>{statName}</h3>
        <h2>{statNumber + statUnit}</h2>
        <p>{statDescription}</p>
      </div>
    );
  }
}

export default StatCard;
