import React from 'react';
import '../../styles/GeneralUserDashboard.css';

class RecentUpdate extends React.PureComponent {
  render() {
    const { profilePic, updateDate, updateAuthor, updateText } = this.props;
    return (
      <div className="dashboard-update">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img
            src={profilePic}
            alt="icon"
            style={{ width: '40px', height: '40px', margin: '16px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h3>{updateAuthor}</h3>
            <p style={{ marginLeft: '64px' }}>{updateDate}</p>
          </div>
        </div>
        <p style={{ margin: '8px' }}>{updateText}</p>
      </div>
    );
  }
}

export default RecentUpdate;
