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

    /** 
    function on() {
      document.getElementById("farm-card-overlay").style.display = "block";
    };
    function off() {
      document.getElementById("farm-card-overlay").style.display = "none";
    };
    const card = document.querySelector(".farm-card")
    const overlay =document.querySelector('.farm-card-overlay')
    function handleClick(event) {
      const noTextSelected = !window.getSelection().toString();
      if (noTextSelected) {
        overlay.click();
      }
    }
    card.addEventListener("click", handleClick)
    */

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
          <div className="farmname">
          {farmName}
          </div>
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
<a href="https://css-tricks.com/a-complete-guide-to-calc-in-css/" 
className="farm-card-overlay">
*/

export default FarmCard;
