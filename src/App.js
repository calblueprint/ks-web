/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import '@styles/App.css';

import KSDashboard from '@ks/dashboard/KSDashboard';
import FarmReferralForm from '@ks/FarmReferralForm';
import NSEVPDashboard from '@nsevp/dashboard/NSEVPDashboard';
import UserProfile from '@shared/UserProfile';
import Login from '@shared/auth/Login';
import About from '@shared/About';
import ErrorPage from '@shared/ErrorPage';
import FarmSearch from '@shared/farmSearch/FarmSearch';
import FarmProfile from '@shared/farmProfile/FarmProfile';
import FarmProfileEdit from '@shared/farmProfileEdit/FarmProfileEdit';

import { getUserById } from '@lib/airtable/request';
import { refreshUserData, clearUserData } from '@lib/redux/userData';
import { history } from '@lib/redux/store';
import {
  isNSEVPUser,
  isKSUser,
  isSignedIn,
  getCredentials
} from '@lib/credentials';

import NavBar from '@route/NavBar';
import AuthenticatedRoute from '@route/AuthenticatedRoute';
import SuspenseRoute from '@route/SuspenseRoute';
import FeedbackButton from '@route/FeedbackButton';

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
    const signedIn = isSignedIn(credentials);
    const isNSEVP = isNSEVPUser(credentials);
    const isKS = isKSUser(credentials);
    let homeComponent;
    if (!signedIn) {
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
              <AuthenticatedRoute
                exact
                path="/farm/:farmId/:state"
                component={FarmProfileEdit}
              />
              <SuspenseRoute exact path="/about" component={About} />
              <AuthenticatedRoute path="/profile" component={UserProfile} />
              <AuthenticatedRoute
                path="/referral"
                component={FarmReferralForm}
                credentialCheck={isKSUser}
              />
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
