import React from 'react';
import '@styles/NSEVPUserDashboard.css';

class RecentUpdate extends React.PureComponent {
  render() {
    const { profilePic, updateDate, updateAuthor, updateText } = this.props;
    return (
      <div className="update">
        <div>
          <img className="update__profile-pic" src={profilePic} alt="icon" />
        </div>
        <div>
          <div className="update__title">
            <h3>{updateAuthor}</h3>
            <p>{updateDate}</p>
          </div>
          <p className="update__body">{updateText}</p>
        </div>
      </div>
    );
  }
}

export default RecentUpdate;
