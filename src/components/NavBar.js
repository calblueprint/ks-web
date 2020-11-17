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
import Logo from '../assets/PPSC-logo.png';
import '../styles/NavBar.css';
import SettingsDropdown from './SettingsDropdown';

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
              alt="People Power Solar Cooperative Logo"
            />
          </a>
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
            alt="People Power Solar Cooperative Logo"
          />
        </a>
        <nav>
          {isSignedIn(credentials) && (
            <ul>
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
                <Link to="/farm/asdf">Farm Profile</Link>
              </li>
              {/* {isGeneralUser(credentials) && ()} */}
              {/* isSubscriberUser(credentials) && (
                <li
                  className={`${
                    pathname === '/billing' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/billing">Billing</Link>
                </li>
              ) */}
              {isAdmin(credentials) && (
                <li
                  className={`${
                    pathname === '/admin' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/admin">Admin</Link>
                </li>
              )}
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
}

const mapStateToProps = state => ({
  user: state.userData.user,
  pathname: state.router.location.pathname
});
export default connect(mapStateToProps)(NavBar);
