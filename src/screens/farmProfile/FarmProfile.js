import React from 'react';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '@styles/FarmProfile.css';

import FarmContactCard from './components/FarmContactCard';
import FarmGraph from './components/FarmGraph';

class FarmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmId: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    this.setState({ farmId });
  }

  render() {
    return (
      <div className="farm-profile">
        <div className="farm-profile__back-button">
          <Button>
            <ArrowBackIcon />
            Back to Farm Search
          </Button>
        </div>

        <h1 className="farm-profile__header">Farm Name</h1>

        <div className="farm-profile__body">
          <div className="farm-profile__body__left">
            <FarmContactCard
              id="123"
              farmerName="Farmer Name"
              phone="(xxx) - xxx - xxxx"
              email="farmerfarmer@farmer.com"
              address="xxxxx Farmer Lane Kauai, HI, xxxxx"
              gapCertified
              certificationDate="xxxx"
              inspector="Lisa Rhoden"
            />
          </div>

          <div className="farm-profile__body__right">
            <FarmGraph title="Top 5 Items" data={null} />
            <div className="divider" />
            <FarmGraph title="Recent Harvests" data={null} />
            <div className="divider" />
            <FarmGraph title="Recent Harvest Logs" data={null} />
            <div className="divider" />
            <FarmGraph title="GAP Certification Status" data={null} />
          </div>
        </div>
      </div>
    );
  }
}

export default FarmProfile;
