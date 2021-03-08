/* eslint react/jsx-props-no-spreading: 0 */

import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { getUserById } from './lib/airtable/request';
import { refreshUserData, clearUserData } from './lib/redux/userData';
import { history } from './lib/redux/store';
import {
  isNSEVPUser,
  isKSUser,
  isSignedIn,
  isOnboarding,
  getCredentials
} from './lib/credentials';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import FeedbackButton from './components/FeedbackButton';
import NavBar from './components/NavBar';
import LoadingComponent from './components/LoadingComponent';

import './styles/App.css';

// import Onboarding from './screens/onboarding/Onboarding';
// import Login from './screens/auth/Login';
// import KSDashboard from './screens/ks/KSDashboard'
// import NSEVPDashboard from './screens/nsevp/NSEVPDashboard'
// import UserProfile from './screens/shared/UserProfile'
// import About from './screens/shared/About'
// import ErrorPage from './screens/nsevp/ErrorPage'

const About = lazy(() => import('./screens/shared/About'));
const ErrorPage = lazy(() => import('./screens/nsevp/ErrorPage'));
const FarmProfile = lazy(() => import('./screens/farmProfile/FarmProfile'));
const FarmSearch = lazy(() => import('./screens/FarmSearch/FarmSearch'));
const KSDashboard = lazy(() => import('./screens/ks/KSDashboard'));
const Login = lazy(() => import('./screens/auth/Login'));
const NSEVPDashboard = lazy(() => import('./screens/nsevp/NSEVPDashboard'));
const Onboarding = lazy(() => import('./screens/onboarding/Onboarding'));
const UserProfile = lazy(() => import('./screens/shared/UserProfile'));

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
            <Suspense fallback={<LoadingComponent />}>
              <Switch>
                <Route exact path="/" component={HomeComponent} />

                {/* TEMP ROUTES */}
                <Route exact path="/farms" component={FarmSearch} />
                <Route exact path="/farm/:farmId" component={FarmProfile} />
                <Route exact path="/about" component={About} />

                <AuthenticatedRoute path="/profile" component={UserProfile} />
                <AuthenticatedRoute
                  onboarding // Signed out/Onboarding Users Only
                  path="/onboarding"
                  component={Onboarding}
                />
                <Route path="*" component={ErrorPage} />
              </Switch>
            </Suspense>
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
