import React from 'react';
import '../../../styles/NewFarmCard.css';
import fileIcon from '../../../assets/file-icon.png';

class NewFarmCard extends React.PureComponent {
  render() {
    return (
      <div className="newfarm-card">
        New Farm Profile
        <img src={fileIcon} className="newfarm-fileIcon" alt="file-icon" />
      </div>
    );
  }
}

export default NewFarmCard;
