import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import '../../../styles/SubscriberOwnerDashboardMainView.css';
import { centsToDollars } from '../../../lib/subscriberHelper';
import { getLoggedInUserId } from '../../../lib/auth';
import recordBillPaymentSuccess from '../../../lib/paypal';

import secret from '../../../lib/secret';

const { clientId } = secret;

export default class SubscriberOwnerDashboardMainView extends React.Component {
  constructor(props) {
    super(props);
    const { bills } = this.props;
    this.state = {
      latestBill: bills.filter(bill => bill['Is Latest'])[0]
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
  }

  onPaypalPaymentSuccess(details, data) {
    const { latestBill } = this.state;
    recordBillPaymentSuccess(details, data, latestBill);
  }

  render() {
    const { callback } = this.props;
    const { latestBill } = this.state;
    const amtDue = centsToDollars(latestBill['Amount Due']);
    return (
      <div className="subscriber-dash-outer-container">
        <h3>My Finances</h3>
        <div className="subscriber-dash-inner-container">
          <div className="subscriber-left-col subscriber-dash-col">
            <p className="subscriber-header">Billing Summary</p>
            <div className="col-card">
              <div className="class-elems">
                <div className="balance-header-section">
                  <p>Your Balance</p>
                  <h3>${centsToDollars(latestBill['Amount Due'])}</h3>
                </div>
                <hr id="divider" />
                <div className="balance-nums-section">
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Due Now</p>
                    <p className="line-item">
                      ${centsToDollars(latestBill['Amount Due'])}
                    </p>
                  </div>
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Upcoming</p>
                    <p className="line-item">$0.00</p>
                  </div>
                  <br />
                  <br />
                  <div className="balance-nums-line">
                    <p className="line-item descrip">
                      <strong>Total</strong>
                    </p>
                    <p className="line-item">
                      <strong>
                        ${centsToDollars(latestBill['Amount Due'])}
                      </strong>
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <PayPalButton
                  amount={amtDue}
                  onSuccess={this.onPaypalPaymentSuccess}
                  options={{
                    clientId
                  }}
                />
              </div>
            </div>
          </div>
          <div className="subscriber-right-col subscriber-dash-col">
            <div className="subscriber-right-duo-header">
              <p className="subscriber-header">Recent Transactions</p>
              <button
                className="subscriber-all-billls-button"
                type="button"
                onClick={callback}
              >
                →
              </button>
            </div>
            <div className="col-card" />
          </div>
        </div>
      </div>
    );
  }
}
