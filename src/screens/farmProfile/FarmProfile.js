import React from 'react';
import FarmContactCard from './components/FarmContactCard';
import leftArrow from '../../assets/left_arrow.png';
import '../../styles/FarmProfile.css';

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
            <div className="farm-profile__graph hover-background">Data</div>
            <div className="farm-profile__graph hover-background">Data</div>
            <div className="farm-profile__graph hover-background">Data</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FarmProfile;
