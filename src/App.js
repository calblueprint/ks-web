/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import Billing from './screens/subscriber/Billing';
import SubscriberDashboard from './screens/subscriber/SubscriberDashboard';
import SubscriberWithSharesDashboard from './screens/subscriber/SubscriberWithSharesDashboard';
import Community from './screens/shared/Community';
import GeneralDashboard from './screens/general/GeneralDashboard';
import AdminDashboard from './screens/admin/AdminDashboard';
import UserProfile from './screens/shared/UserProfile';
import './styles/App.css';
import { refreshUserData } from './lib/userDataUtils';
import { history } from './lib/redux/store';
import {
  isGeneralOwner,
  isSubscriberOwner,
  isSignedIn
} from './lib/credentials';

class App extends React.Component {
  componentDidMount() {
    const { userLogin } = this.props;
    if (userLogin) {
      refreshUserData(userLogin);
    }
  }

  getHomeComponent() {
    const { credentials } = this.props;
    const signedIn = isSignedIn(credentials);
    const isGeneral = isGeneralOwner(credentials);
    const isSubscriber = isSubscriberOwner(credentials);
    let homeComponent;
    if (!signedIn) {
      homeComponent = Login;
    } else if (isGeneral && isSubscriber) {
      homeComponent = SubscriberWithSharesDashboard;
    } else if (isGeneral) {
      homeComponent = GeneralDashboard;
    } else if (isSubscriber) {
      homeComponent = SubscriberDashboard;
    }
    return homeComponent;
  }

  render() {
    const HomeComponent = this.getHomeComponent();
    return (
      <ConnectedRouter history={history}>
        <div className="app-container">
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/community" component={Community} />
            <Route path="/billing" component={Billing} />
            <Route path="/profile" component={UserProfile} />
            <Route>
              <p style={{ color: 'white', margin: '30px' }}>Not Found - 404</p>
            </Route>
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  userLogin: state.userData.userLogin,
  credentials: state.userData.credentials
});

export default connect(mapStateToProps)(App);
