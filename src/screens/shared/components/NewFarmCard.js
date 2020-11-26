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
/** 
<img src={farmProfileDefaultCover} alt="defaultfarmCover" className="farm-card-photo"/>
<img src={farmProfileDefaultIcon} alt="defaultFarmProfileIcon" className="farm-card-icon"/>
*/

export default NewFarmCard;
