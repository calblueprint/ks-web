import React from 'react';
import '../../../styles/FarmCard.css';
import farmProfileDefaultCover from '../../../assets/farmProfileCover.png';
import farmProfileDefaultIcon from '../../../assets/farmProfilePhoto.png';

class FarmCard extends React.PureComponent {
  render() {
    const {
      hubApproved,
      gapApproved,
      farmName,
      farmerName,
      farmLocation
    } = this.props;
    return (
      <div className="farm-card">
        <div className="farm-card-top">
          <button type="button" className="gap-button">
            {gapApproved}
          </button>
          <button type="button" className="hub-button">
            {hubApproved}
          </button>
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
/** 
<img src={farmProfileDefaultCover} alt="defaultfarmCover" className="farm-card-photo"/>
<img src={farmProfileDefaultIcon} alt="defaultFarmProfileIcon" className="farm-card-icon"/>
*/

export default FarmCard;
