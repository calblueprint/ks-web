import React from 'react';
import FarmContactCard from './components/FarmContactCard';
import FarmGraph from './components/FarmGraph';
import leftArrow from '../../assets/left_arrow.png';
import '../../styles/FarmProfile.css';
import { getSingleFarm } from '../../lib/farmUtils';

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
    console.log(farm);
    this.setState({ farm, farmId });
  }

  render() {
    const {
      contactFirstName,
      contactLastName,
      address: farmAddress,
      phone,
      farmName,
      farmEmail: email,
      GroupGapContactIds: inspector,
      certificationDate
    } = this.state.farm;
    const gapApproved = true;
    const farmerName = `${contactFirstName} ${contactLastName}`;
    const {farmId} = this.state;

    return (
      <div className="farm-profile">
        <div className="farm-profile__back-button">
          <img
            className="farm-profile__back-button-icon"
            src={leftArrow}
            alt="back arrow"
          />
          Back to Farm Search
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
