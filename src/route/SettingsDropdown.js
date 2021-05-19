import React from 'react';
import Constants from '@root/constants';

import { Link } from 'react-router-dom';
import Gear from '../assets/settingsIcon.svg';
import { logoutUser } from '../lib/airlock/airlock';

class SettingsDropdown extends React.PureComponent {
  handleLogoutClick = async () => {
    const { history } = this.props;
    const logOutSuccess = await logoutUser();
    if (logOutSuccess) {
      history.push('/');
    } else {
      // TODO: Display error to user (also wonder if there's a way to encapsulate this logic in auth.js)
      console.warn('Logout failed');
    }
  };

  render() {
    return (
      <div className="settings-dropdown inline">
        <img className="nav-item-gear" alt="nav item gear" src={Gear} />
        <span className="dropdown-content">
          <div className="settings-dropdown-logout">
            <Link to={Constants.ABOUT_ROUTE} className="dropdown-link">
              About
            </Link>
          </div>
          <div className="settings-dropdown-logout">
            <Link to={Constants.PROFILE_ROUTE} className="dropdown-link">
              Settings
            </Link>
          </div>
          <button
            type="button"
            className="dropdown-logout dropdown-link"
            onClick={this.handleLogoutClick}
          >
            Logout
          </button>
        </span>
      </div>
    );
  }
}

export default SettingsDropdown;
