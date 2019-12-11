import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import SubscriberOwnerDashboardAllBillsView from './SubscriberOwnerDashboardAllBillsView';
import SubscriberOwnerDashboardMainView from './SubscriberOwnerDashboardMainView';
import { getLoggedInUserId } from '../../../lib/auth';
import LoadingComponent from '../../../components/LoadingComponent';

import {
  areDiffBills,
  getSubscriberBills
} from '../../../lib/subscriberHelper';

export default class SubscriberOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      mode: 0,
      isReady: false
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
    } else {
      this.getBills();
    }
  }

  getBills() {
    const loggedInUserId = getLoggedInUserId();
    getSubscriberBills(loggedInUserId, this.updateState);
  }

  updateState(transactions) {
    if (transactions == null) {
      console.error('transactions argument to updateState is null');
      return;
    }

    this.setState(prevState => {
      if (areDiffBills(prevState.transactions, transactions)) {
        return { transactions, isReady: true };
      }
      return { isReady: true };
    });
  }

  seeSubscriberOwnerDashboardAllBillsView() {
    this.setState({
      mode: 1
    });
  }

  seeDashboard() {
    this.setState({
      mode: 0
    });
  }

  render() {
    const { mode, transactions, isReady } = this.state;
    if (!isReady) {
      return <LoadingComponent />;
    }
    if (mode === 0) {
      return (
        <SubscriberOwnerDashboardMainView
          callback={() => this.seeSubscriberOwnerDashboardAllBillsView()}
          transactions={transactions}
        />
      );
    }
    if (mode === 1) {
      return (
        <SubscriberOwnerDashboardAllBillsView
          callback={() => this.seeDashboard()}
          transactions={transactions}
        />
      );
    }

    return <div>404: invalid state. Call your dev</div>;
  }
}