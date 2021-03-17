import React from 'react';

import { getSingleFarm } from '@lib/farmUtils';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '@styles/FarmProfile.css';

import FarmContactCard from './FarmContactCard';
import FarmGraph from './FarmGraph';

class FarmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farm: {},
      farmId: ''
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    const farm = await getSingleFarm(farmId);

    this.setState({ farm, farmId });
  }

  render() {
    const { farm, farmId } = this.state;
    const {
      contactFirstName,
      contactLastName,
      address: farmAddress,
      phone,
      farmName,
      farmEmail: email,
      GroupGapContactIds: inspector,
      certificationDate
    } = farm;
    const gapApproved = true;
    const farmerName = `${contactFirstName} ${contactLastName}`;

    return (
      <div className="farm-profile">
        <div className="farm-profile__back-button">
          <Button>
            <ArrowBackIcon />
            Back to Farm Search
          </Button>
        </div>
        <h1 className="farm-profile__header">{farmName}</h1>
        <div className="farm-profile__body">
          <div className="farm-profile__body__left">
            <FarmContactCard
              id={farmId}
              farmerName={farmerName}
              phone={phone}
              email={email}
              address={farmAddress}
              gapCertified={gapApproved}
              certificationDate={certificationDate}
              inspector={inspector}
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
