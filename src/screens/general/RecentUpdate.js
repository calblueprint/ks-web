import React from 'react';
import Icon from '../../assets/success.png';
import '../../styles/GeneralUserDashboard.css';

class RecentUpdate extends React.PureComponent {
  render() {
    return (
      <div className="update">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img
            src={Icon}
            alt="icon"
            style={{ width: '40px', height: '40px', margin: '16px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h3>Nick Wong</h3>
            <p>11/17/20</p>
          </div>
        </div>
        <h4 style={{ margin: 0 }}>
          This is an announcement from your community. Please read this.
        </h4>
      </div>
    );
  }
}

export default RecentUpdate;
