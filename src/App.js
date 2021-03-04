/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import KSDashboard from './screens/ks/KSDashboard';
import NSEVPDashboard from './screens/nsevp/NSEVPDashboard';
import AdminDashboard from './screens/admin/AdminDashboard';
import UserProfile from './screens/shared/UserProfile';
import About from './screens/shared/About';
import ErrorPage from './screens/nsevp/ErrorPage';
import './styles/App.css';
import { refreshUserData, clearUserData } from './lib/redux/userData';
import { history } from './lib/redux/store';
import {
  isNSEVPUser,
  isKSUser,
  isSignedIn,
  Credentials,
  isOnboarding,
  getCredentials
} from './lib/credentials';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import SuperAdminDashboard from './screens/admin/SuperAdminDashboard';
import PPRoute from './components/PPRoute';
import FeedbackButton from './components/FeedbackButton';
import FarmSearch from './screens/farmSearch/FarmSearch';
import { getUserById } from './lib/airtable/request';
import FarmProfile from './screens/farmProfile/FarmProfile';

class App extends React.Component {
  async componentDidMount() {
    const { user } = this.props;
    // TODO: check that airlock session token is valid

    // If userLogin info is in Redux, fetch latest version
    if (user) {
      try {
        await getUserById(user.id);
        refreshUserData(user.id);
      } catch (e) {
        console.log('Session Expired');
        clearUserData();
        history.push('/');
      }
    }
  }

  // Figure out component to be shown at root based on user credentials
  getHomeComponent() {
    const { user } = this.props;
    const credentials = getCredentials(user);
    const onboarding = isOnboarding(credentials);
    const signedIn = isSignedIn(credentials);
    const isNSEVP = isNSEVPUser(credentials);
    const isKS = isKSUser(credentials);
    let homeComponent;
    if (onboarding) {
      homeComponent = () => <Redirect to={{ pathname: '/onboarding' }} />;
    } else if (!signedIn) {
      homeComponent = Login;
    } else if (isKS) {
      // Dashboard for both ks and ks ownrers (ks with shares)
      homeComponent = KSDashboard;
    } else if (isNSEVP) {
      homeComponent = NSEVPDashboard;
    }
    return homeComponent;
  }

  render() {
    const HomeComponent = this.getHomeComponent();
    return (
      <ConnectedRouter history={history}>
        <div className="app-container">
          <NavBar history={history} />
          <Switch>
            <PPRoute exact path="/" component={HomeComponent} />

            {/* TEMP ROUTES */}
            <PPRoute exact path="/farms" component={FarmSearch} />
            <PPRoute exact path="/farm/:farmId" component={FarmProfile} />

            <PPRoute exact path="/about" component={About} />
            <AuthenticatedRoute path="/profile" component={UserProfile} />

            <AuthenticatedRoute
              onboarding // Signed out/Onboarding Users Only
              path="/onboarding"
              component={Onboarding}
            />
            <AuthenticatedRoute
              credential={Credentials.ADMIN} // Admins only
              path="/admin"
              component={AdminDashboard}
            />
            <AuthenticatedRoute
              credential={Credentials.SUPERADMIN} // Admins only
              path="/superadmin"
              component={SuperAdminDashboard}
            />
            <PPRoute path="*" component={ErrorPage} />
          </Switch>
          <FeedbackButton history={history} />
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(App);
