import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  isAdmin,
  // isSubscriberUser,
  // isGeneralUser,
  isSignedIn,
  isOnboarding,
  getCredentials
} from '../lib/credentials';
import Logo from '../assets/NSEVP-LOGO.svg';
import '../styles/NavBar.css';
import SettingsDropdown from './SettingsDropdown';
import NavBarDefaultUserIcon from '../assets/NavBarDefaultUserIcon.png';

class NavBar extends React.PureComponent {
  render() {
    const { user, pathname, history } = this.props;
    const credentials = getCredentials(user);

    // if onboarding
    if (isOnboarding(credentials)) {
      return (
        <div className="nav-bar">
          <a href="/">
            <img
              className="logo"
              src={Logo}
              alt="North Shore Economic Vitally Partnership Logo"
            />
          </a>
          <div style={{ width: '100%', marginLeft: '16px' }}>
            <h3 style={{ margin: '0px' }}>North Shore</h3>
            <h3 style={{ margin: '0px' }}>EVP</h3>
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
            className="logo"
            src={Logo}
            alt="North Shore Economic Vitally Partnership Logo"
          />
        </a>
        <div style={{ marginLeft: '16px' }}>
          <h3 style={{ margin: '0px' }}>North Shore</h3>
          <h3 style={{ margin: '0px' }}>EVP</h3>
        </div>
        <nav>
          {isSignedIn(credentials) && (
            <ul>
              <div className="nav-left-container">
                <li
                  className={`${
                    pathname === '/' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/">Dashboard</Link>
                </li>
                <li
                  className={`${
                    pathname === '/' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/farms">Farms</Link>
                </li>
                <li
                  className={`${
                    pathname === '/' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/forecast">Forecast</Link>
                </li>
              </div>

              <div className="nav-right-container">
                <button type="button" className="nav-button">
                  <img
                    src={NavBarDefaultUserIcon}
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

              {/*  
              not shown on page yet 

              {isAdmin(credentials) && (
                <li
                  className={`${
                    pathname === '/admin' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              */}
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
