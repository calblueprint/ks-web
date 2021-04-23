import React from 'react';
import farmProfileCover from '@assets/farmProfileCover.png';
import farmProfilePhoto from '@assets/farmProfilePhoto.png';
import Chip from '@material-ui/core/Chip';
import { Home, AccountCircle } from '@material-ui/icons';

import '@styles/FarmProfile.css';

import StatusChip from '@components/StatusChip';

class FarmContactCard extends React.PureComponent {
  render() {
    const { farm } = this.props;
    const {
      address:physicalAddress,
      mailingAddress,
      contactFirstName,
      contactLastName,
      farmEmail: email,
      groupGapContactIds: inspector,
      phone,
      foodHubAffiliation: foodHub
    } = farm;
    const { GAP } = this.props;
    const {
      gapCertified
    } = GAP;
    const { GAPContact } = this.props;
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
              type={gapCertified ? 'certified' : 'notCertified'}
              data={GAP}
            />
          </div>
        </div>

        <div className="contact-card__inspector">
        <div className="contact-card__inspector-info">
          <h2>Group GAP Contact</h2>
          <Chip
          avatar={<AccountCircle />}
          label={`${GAPContact}`}
          />
          </div> 
          <h2>Food Hub</h2>
          <Chip
          avatar={<Home />}
          label={`${foodHub}`}
          />
        </div>
      </div>
    );
  }
}

export default FarmContactCard;
