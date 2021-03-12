/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import NavBar from './route/NavBar';
import Login from './screens/auth/Login';
import KSDashboard from './screens/ks/KSDashboard';
import NSEVPDashboard from './screens/nsevp/NSEVPDashboard';
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
  isOnboarding,
  getCredentials
} from './lib/credentials';
import AuthenticatedRoute from './route/AuthenticatedRoute';
import SuspenseRoute from './route/SuspenseRoute';
import FeedbackButton from './route/FeedbackButton';
import FarmSearch from './screens/FarmSearch/FarmSearch';
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
          <div className="route-container">
            <Switch>
              <SuspenseRoute exact path="/" component={HomeComponent} />

              {/* TEMP ROUTES */}
              <SuspenseRoute exact path="/farms" component={FarmSearch} />
              <SuspenseRoute
                exact
                path="/farm/:farmId"
                component={FarmProfile}
              />

              <SuspenseRoute exact path="/about" component={About} />
              <AuthenticatedRoute path="/profile" component={UserProfile} />

              <SuspenseRoute path="*" component={ErrorPage} />
            </Switch>
          </div>
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
