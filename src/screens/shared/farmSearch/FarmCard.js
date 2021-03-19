import React from 'react';
import farmCover from '@assets/farmProfileCover.png';
import userIcon from '@assets/farmProfilePhoto.png';

import Link from '@material-ui/core/Link';
import '@styles/FarmCard.css';

class FarmCard extends React.PureComponent {
  render() {
    const { farm } = this.props;
    const {
      farmId,
      farmName,
      foodHubAffiliation,
      contactFirstName,
      contactLastName,
      address: farmAddress
    } = farm;
    const gapApproved = true;
    const hubApproved = Boolean(foodHubAffiliation);
    const farmerName = `${contactFirstName} ${contactLastName}`;
    return (
      <Link href={`/farm/${farmId}`} underline="none" color="inherit">
        <div className="farm-card">
          <div className="farm-card__top">
            <img
              src={farmCover}
              alt="defaultfarmCover"
              className="farm-card__photo"
            />
            <div className="farm-card__button-row">
              {gapApproved ? (
                <button type="button" className="farm-card__button">
                  GAP
                </button>
              ) : null}
              {hubApproved ? (
                <button type="button" className="farm-card__button">
                  HUB
                </button>
              ) : null}
            </div>
            <img src={userIcon} alt="userIcon" className="farm-card__icon" />
          </div>
          <div className="farm-card__bot">
            <div className="farm-card__farm-name">
              <h2>{farmName}</h2>
            </div>
            <div className="farm-card__farm-details">
              {farmerName}
              <br />
              {farmAddress}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default FarmCard;
