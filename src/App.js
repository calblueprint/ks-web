/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Constants from '@root/constants';

import '@styles/App.css';

import Dashboard from '@shared/dashboard/Dashboard';
import FarmReferralForm from '@ks/FarmReferralForm';
import UserProfile from '@shared/UserProfile';
import Login from '@shared/auth/Login';
import SignUp from '@shared/auth/SignUp';
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

  render() {
    const { user } = this.props;
    const credentials = getCredentials(user);
    const signedIn = isSignedIn(credentials);
    const isNSEVP = isNSEVPUser(credentials);
    let HomeComponent = Dashboard;
    if (!signedIn) {
      HomeComponent = Login;
    }

    return (
      <ConnectedRouter history={history}>
        <div className="app-container">
          <NavBar history={history} isNSEVP={isNSEVP} isSignedIn={signedIn} />
          <div className="route-container">
            <Switch>
              <SuspenseRoute
                exact
                path="/"
                component={HomeComponent}
                isNSEVP={isNSEVP}
              />

              {/* TEMP ROUTES */}
              <AuthenticatedRoute exact path="/farms" component={FarmSearch} />
              <AuthenticatedRoute
                exact
                path="/farm/:farmId"
                component={FarmProfile}
              />
              <AuthenticatedRoute
                exact
                path="/farm/:farmId/:state"
                component={FarmProfileEdit}
              />
              <AuthenticatedRoute exact path="/about" component={About} />
              <AuthenticatedRoute path="/profile" component={UserProfile} />
              <AuthenticatedRoute
                path="/referral"
                component={FarmReferralForm}
                credentialCheck={isKSUser}
              />

              <AuthenticatedRoute
                credentialCheck={c => !isSignedIn(c)}
                exact
                path={Constants.SIGNUP_ROUTE}
                component={SignUp}
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
