import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  isNSEVPUser,
  isKSUser,
  isSignedIn,
  getCredentials
} from '@lib/credentials';

import '@styles/NavBar.css';
import NSEVPLogo from '@assets/NSEVP-LOGO.svg';
import KSLogo from '@assets/KS-LOGO.svg';
import DefaultUserIcon from '@assets/defaultUserIcon-small.svg';
import SettingsDropdown from './SettingsDropdown';

class NavBar extends React.PureComponent {
  render() {
    const { user, history } = this.props;
    const credentials = getCredentials(user);

    let affiliation;
    if (isNSEVPUser(credentials)) {
      affiliation = (
        <div className="nav-bar__title">
          <h3>North Shore</h3>
          <h3>EVP</h3>
        </div>
      );
    }
    if (isKSUser(credentials)) {
      affiliation = (
        <img
          className="nav-bar__kslogo"
          src={KSLogo}
          alt="Kamehameha Schools Logo"
        />
      );
    }

    return affiliation ? (
      <div className="nav-bar">
        <a href="/">
          <img
            className="nav-bar__nsevplogo"
            src={NSEVPLogo}
            alt="North Shore Economic Vitality Partnership Logo"
          />
        </a>
        {affiliation}
        <nav>
          {isSignedIn(credentials) && (
            <ul>
              <div className="nav-left-container">
                <li>
                  <NavLink
                    to="/"
                    exact
                    className="nav-bar__header"
                    activeClassName="nav-bar__header-active"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/farms"
                    className="nav-bar__header"
                    activeClassName="nav-bar__header-active"
                  >
                    Farms
                  </NavLink>
                </li>
                {isNSEVPUser(credentials) && (
                  <li>
                    <NavLink
                      to="/forecast"
                      className="nav-bar__header"
                      activeClassName="nav-bar__header-active"
                    >
                      Forecast
                    </NavLink>
                  </li>
                )}
                {isNSEVPUser(credentials) && (
                  <li>
                    <NavLink
                      to="/error"
                      className="nav-bar__header"
                      activeClassName="nav-bar__header-active"
                    >
                      Referrals
                    </NavLink>
                  </li>
                )}
                {isKSUser(credentials) && (
                  <li>
                    <NavLink
                      to="/referral"
                      className="nav-bar__header"
                      activeClassName="nav-bar__header-active"
                    >
                      Referral
                    </NavLink>
                  </li>
                )}
              </div>

              <div className="nav-right-container">
                <button type="button" className="nav-button">
                  <img
                    src={DefaultUserIcon}
                    alt="NavBarIcon"
                    className="nav-button__user-icon"
                  />
                  <div className="nav-button__name">{user.name}</div>
                </button>

                <div className="dropdown-safety-box" />
                <li className="nav-item dropdown-container">
                  <SettingsDropdown history={history} />
                </li>
              </div>
            </ul>
          )}
        </nav>
      </div>
    ) : (
      <div />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user,
  pathname: state.router.location.pathname
});
export default connect(mapStateToProps)(NavBar);
