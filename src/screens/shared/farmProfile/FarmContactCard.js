import React from 'react';
import farmProfileCover from '@assets/farmProfileCover.png';
import farmProfilePhoto from '@assets/farmProfilePhoto.png';
import userIcon from '@assets/userIcon.png';

import '@styles/FarmProfile.css';

import StatusChip from '@components/StatusChip';

class FarmContactCard extends React.PureComponent {
  render() {
    const { farm } = this.props;
    const {
      farmAddress,
      contactFirstName,
      contactLastName,
      farmEmail: email,
      GroupGapContactIds: inspector,
      phone
    } = farm;

    const gapApproved = true;
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
              <p>{`Address: ${farmAddress}`}</p>
            </div>
            <StatusChip
              type={gapApproved ? 'certified' : 'notCertified'}
              data={farm}
            />
          </div>
        </div>

        <div className="contact-card__inspector">
          <h2>Group GAP Contact</h2>
          <div className="contact-card__inspector-info">
            <img
              className="farm-contact-card__user-icon"
              src={userIcon}
              alt="user"
            />
            {inspector}
          </div>
        </div>
      </div>
    );
  }
}

export default FarmContactCard;
