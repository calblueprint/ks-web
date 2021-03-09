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
        <div style={{ width: '100%', marginLeft: '16px' }}>
          <h3 style={{ margin: '0px' }}>North Shore</h3>
          <h3 style={{ margin: '0px' }}>EVP</h3>
        </div>
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
                <Link to="/supply">Supply</Link>
              </li>

              <li
                className={`${
                  pathname === '/' ? 'nav-item-selected' : 'nav-item'
                } nav-item-styling`}
                style={{
                  borderRadius: '5px',
                  border: '1px solid #4074B0',
                  padding: '0px 18px'
                }}
              >
                <Link to="/farm/asdf" style={{ color: '#4074B0' }}>
                  New Farm
                </Link>
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
