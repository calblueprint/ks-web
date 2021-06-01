import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import '@styles/NavBar.css';
import NSEVPLogo from '@assets/NSEVP-LOGO.svg';
import KSLogo from '@assets/KS-LOGO.svg';
import DefaultUserIcon from '@assets/defaultUserIcon-small.svg';
import SettingsDropdown from './SettingsDropdown';

class NavBar extends React.PureComponent {
  render() {
    const { user, history, isNSEVP, isSignedIn } = this.props;

    let affiliation;
    if (isSignedIn) {
      if (isNSEVP) {
        affiliation = (
          <div className="nav-bar__title">
            <h3>North Shore</h3>
            <h3>EVP</h3>
          </div>
        );
      } else {
        affiliation = (
          <img
            className="nav-bar__kslogo"
            src={KSLogo}
            alt="Kamehameha Schools Logo"
          />
        );
      }
    }

    return affiliation ? (
      <div className="nav-bar">
        <NavLink to="/" exact>
          <img
            className="nav-bar__nsevplogo"
            src={NSEVPLogo}
            alt="North Shore Economic Vitality Partnership Logo"
          />
        </NavLink>
        <NavLink to="/" exact className="nav-bar__header">
          {affiliation}
        </NavLink>
        <nav>
          {isSignedIn && (
            <ul>
              <div className="nav-left-container">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    exact
                    className="nav-bar__header"
                    activeclassname="nav-bar__header-active"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/farms"
                    className="nav-bar__header"
                    activeclassname="nav-bar__header-active"
                  >
                    Farms
                  </NavLink>
                </li>
                {isNSEVP && (
                  <li className="nav-item">
                    <a
                      href="https://airtable.com/shrdkcW9b6rA5HMxl"
                      className="nav-bar__header"
                      activeclassname="nav-bar__header-active"
                    >
                      Referrals
                    </a>
                  </li>
                )}
                {!isNSEVP && (
                  <div className="nav-item">
                    <NavLink
                      to="/referral"
                      className="nav-bar__header"
                      activeclassname="nav-bar__header-active"
                    >
                      Referral
                    </NavLink>
                  </div>
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
                <div className="nav-item">
                  <SettingsDropdown history={history} />
                </div>
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
