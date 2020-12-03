import React from 'react';
import farmProfileCover from '../../../assets/farmProfileCover.png';
import farmProfilePhoto from '../../../assets/farmProfilePhoto.png';
import checkIcon from '../../../assets/checkIcon.png';
import cancelIcon from '../../../assets/cancelIcon.png';
import userIcon from '../../../assets/userIcon.png';

import '../../../styles/FarmProfile.css';

class FarmContactCard extends React.PureComponent {
  render() {
    const {
      id,
      farmerName,
      phone,
      email,
      address,
      gapCertified,
      certificationDate,
      inspector
    } = this.props;

    return (
      <div className="farm-contact-card" id={id}>
        <div className="farm-contact-card__main hover-background">
          <img
            className="farm-contact-card__main__cover-photo"
            src={farmProfileCover}
            alt="farm profile cover"
          />
          <img
            className="farm-contact-card__main__profile-photo"
            src={farmProfilePhoto}
            alt="farm profile"
          />

          <div className="farm-contact-card__main__text">
            <div className="farm-profile__subheader">{farmerName}</div>
            <div className="farm-contact-card__main__text__details">
              <div>{`Phone: ${phone}`}</div>
              <div>{`Email: ${email}`}</div>
              <div>{`Address: ${address}`}</div>
              {gapCertified ? (
                <div className="farm-contact-card__main__text__details__certification">
                  <img
                    className="farm-contact-card__certification-icon"
                    src={checkIcon}
                    alt="certification"
                  />
                  {`GAP Certified since ${certificationDate}`}
                </div>
              ) : (
                <div className="farm-contact-card__main__text__details__certification">
                  <img src={cancelIcon} alt="certification" />
                  Not GAP Certified
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="farm-contact-card__inspector hover-background">
          <div className="farm-profile__subheader">NSEVP Inspector</div>
          <div className="farm-contact-card__inspector__body">
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
