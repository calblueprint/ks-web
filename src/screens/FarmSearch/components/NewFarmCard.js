import React from 'react';
import '../../../styles/NewFarmCard.css';
import fileIcon from '../../../assets/file-icon.png';

class NewFarmCard extends React.PureComponent {
  render() {
    return (
      <div className="new-farm-card">
        New Farm Profile
        <img
          src={fileIcon}
          className="new-farm-card__file-icon"
          alt="file-icon"
        />
      </div>
    );
  }
}

export default NewFarmCard;
