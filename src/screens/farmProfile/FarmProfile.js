import React from 'react';
import FarmContactCard from './components/FarmContactCard';
import FarmGraph from './components/FarmGraph';
import leftArrow from '../../assets/left_arrow.png';
import '../../styles/FarmProfile.css';

class FarmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmId: null,
      farmName: ''
    };
  }

  componentDidMount() {
    //     this.props.match.params.farmId
    // const farm = await getSingleFarm(url parameter goes here) // this returns a farm object

    const { match } = this.props;
    const { farmId } = match.params;
    this.setState({ farmId });
  }

  render() {
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
        <h1 className="farm-profile__header">Farm Name</h1>

        <div className="farm-profile__body">
          <div className="farm-profile__body__left">
            <FarmContactCard
              id="23"
              farmerName="SANDRA"
              phone="123"
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
