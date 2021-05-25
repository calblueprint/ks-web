import React from 'react';
import farmProfileCover from '@assets/farmProfileCover.png';
import farmProfilePhoto from '@assets/farmProfilePhoto.png';

import '@styles/FarmProfile.css';

import StatusChip from '@components/StatusChip';
import FoodHub from '@components/FoodHub';
import GroupContact from '@components/GroupContact';

class FarmContactCard extends React.PureComponent {
  render() {
    const { farm } = this.props;
    const {
      address: physicalAddress,
      mailingAddress,
      contactFirstName,
      contactLastName,
      farmEmail: email,
      phone,
      foodHubAffiliation: foodHub
    } = farm;
    const { GAP } = this.props;
    let GAPCertified;
    if (GAP !== '') {
      GAPCertified = GAP.gapCertified;
    }
    const { GAPContact } = this.props;
    let GAPContactName;
    if (GAPContact !== '') {
      GAPContactName = GAPContact.name;
    }
    const farmerName = `${contactFirstName} ${contactLastName}`;

    return (
      <div>
        <div className="contact-card">
          <img
            className="contact-card__cover-photo"
            src={farmProfileCover}
            alt="farm profile cover"
          />
          <img
            className="contact-card__profile-photo"
            src={farmProfilePhoto}
            alt="farm profile"
          />
          <div className="contact-card__info">
            <h2>{farmerName}</h2>
            <div className="contact-card__info-details">
              <p>{`Phone: ${phone}`}</p>
              <p>{`Email: ${email}`}</p>
              <p>{`Physical Address: ${physicalAddress}`}</p>
              <p>{`Mailing Address: ${mailingAddress}`}</p>
            </div>
            <StatusChip
              type={GAPCertified ? 'certified' : 'notCertified'}
              data={GAP}
            />
          </div>
        </div>

        <div className="contact-card__inspector">
          <div className="contact-card__inspector-info">
            <h2>Group GAP Contact</h2>
            <GroupContact type={GAPContactName} data={GAPContactName} />
          </div>
          <h2>Food Hub</h2>
          <FoodHub type={foodHub} data={foodHub} />
        </div>
      </div>
    );
  }
}

export default FarmContactCard;
