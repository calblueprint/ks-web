import React from 'react';
import '../../../styles/FarmCard.css';

class FarmCard extends React.PureComponent {
  render() {
    const {
      hubApproved,
      gapApproved,
      farmName,
      farmerName,
      farmLocation,
      farmCover,
      userIcon
    } = this.props;

    return (
      <div className="farm-card">
        <div className="farm-card-top">
          <img
            src={farmCover}
            alt="defaultfarmCover"
            className="farm-card-photo"
          />
          <button type="button" className="gap-button">
            {gapApproved}
          </button>
          <button type="button" className="hub-button">
            {hubApproved}
          </button>
          <img src={userIcon} alt="userIcon" className="farm-card-icon" />
        </div>
        <div className="farm-card-bot">
          <div className="farmname">{farmName}</div>
          <div className="farmdetails">
            {farmerName}
            <br />
            {farmLocation}
          </div>
        </div>
      </div>
    );
  }
}

export default FarmCard;
