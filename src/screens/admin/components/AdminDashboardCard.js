import React from 'react';
import '../../../styles/main.css';
import { getCredentials, isAdmin } from '../../../lib/credentials';
import { removeUser } from '../../../lib/adminUtils';

class AdminDashboardCard extends React.PureComponent {
  render() {
    const { user, handleAdminChange } = this.props;
    const { userTypes, dateCreated } = user;
    const credentials = getCredentials(user);
    const isAdminUser = isAdmin(credentials);

    if (isAdminUser) {
      userTypes.push('Admin');
    }

    const userTags = userTypes.map(function(type) {
      switch (type) {
        case 'NSEVP':
          return (
            <div key={type} className="admin-pp-tag pp-tag-general">
              NSEVP User
            </div>
          );
        case 'Admin':
          return (
            <div key={type} className="admin-pp-tag pp-tag-admin">
              {type}
            </div>
          );
        case 'KS':
          return (
            <div key={type} className="admin-pp-tag pp-tag-subscriber">
              {type}
            </div>
          );
        default:
          return (
            <div key={type} className="pp-tag">
              {type}
            </div>
          );
      }
    });
    return (
      <button
        className="admin-card"
        type="button"
        name="admin"
        onClick={() => handleAdminChange(user)}
      >
        <div className="card-name">
          <h3>{user.name}</h3>
          <div className="card-tags">{userTags}</div>
        </div>
        <div className="flex justify-content-space">
          <div className="member-since-text">
            Member since {dateCreated.substring(0, 4)}
          </div>
          {!isAdminUser && (
            <button
              type="button"
              onClick={() => removeUser(user)}
              className="card-button"
            >
              Remove
            </button>
          )}
        </div>
      </button>
    );
  }
}

export default AdminDashboardCard;
