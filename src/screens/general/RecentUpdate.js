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
            <p style={{ float: 'right' }}>{updateDate}</p>
          </div>
        </div>
        <h4 style={{ margin: 0 }}>{updateText}</h4>
      </div>
    );
  }
}

export default RecentUpdate;
