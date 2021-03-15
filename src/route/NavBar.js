import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  isAdmin,
  isSignedIn,
  isOnboarding,
  getCredentials
} from '@lib/credentials';
import Logo from '@assets/NSEVP-LOGO.svg';
import '@styles/NavBar.css';
import SettingsDropdown from './SettingsDropdown';
import DefaultUserIcon from '../assets/defaultUserIcon-small.svg';

class NavBar extends React.PureComponent {
  render() {
    const { user, pathname, history } = this.props;
    const credentials = getCredentials(user);

    if (isOnboarding(credentials)) {
      return (
        <div className="nav-bar">
          <a href="/">
            <img
              className="nav-bar__logo"
              src={Logo}
              alt="North Shore Economic Vitality Partnership Logo"
            />
          </a>
          <div className="nav-bar__title">
            <h3>North Shore</h3>
            <h3>EVP</h3>
          </div>
          <nav>
            {isSignedIn(credentials) && (
              <ul>
                <div className="dropdown-safety-box" />
                <li className="nav-item dropdown-container">
                  <SettingsDropdown history={history} />
                </li>
              </ul>
            )}
          </nav>
        </div>
      );
    }
    // else, if is signed in and DONE with onboarding

    return (
      <div className="nav-bar">
        <a href="/">
          <img
            className="nav-bar__logo"
            src={Logo}
            alt="North Shore Economic Vitality Partnership Logo"
          />
        </a>
        <div className="nav-bar__title">
          <h3>North Shore</h3>
          <h3>EVP</h3>
        </div>
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
                <li>
                  <NavLink
                    to="/forecast"
                    className="nav-bar__header"
                    activeClassName="nav-bar__header-active"
                  >
                    Forecast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/referrals"
                    className="nav-bar__header"
                    activeClassName="nav-bar__header-active"
                  >
                    Referrals
                  </NavLink>
                </li>
              </div>

              <div className="nav-right-container">
                <button type="button" className="nav-button">
                  <img
                    src={DefaultUserIcon}
                    alt="NavBarIcon"
                    className="nav-button__user-icon"
                  />
                  <div className="nav-button__name">{this.props.user.name}</div>
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user,
  pathname: state.router.location.pathname
});
export default connect(mapStateToProps)(NavBar);
