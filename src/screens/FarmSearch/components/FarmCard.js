/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import Modal from 'react-modal';

import '@styles/FarmCard.css';

const ROOT_ELEMENT = '#root';
Modal.setAppElement(ROOT_ELEMENT);

class FarmCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFarmModal: false
    };
  }

  showModal = () => {
    this.setState({ showFarmModal: true });
  };

  hideModal = () => {
    this.setState({ showFarmModal: false });
  };

  render() {
    const { showFarmModal } = this.state;
    const {
      hubApproved,
      gapApproved,
      farmName,
      farmerName,
      farmLocation,
      farmCover,
      userIcon
    } = this.props;

    return (
      <div className="farm-card">
        <div className="farm-card__top">
          <img
            src={farmCover}
            alt="defaultfarmCover"
            className="farm-card__photo"
            onClick={this.showModal}
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
          <h2 className="farm-card__farm-name">{farmName}</h2>
          <p className="farm-card__farm-details">{farmerName}</p>
          <p className="farm-card__farm-details"> {farmLocation}</p>
        </div>

        <Modal
          isOpen={showFarmModal}
          onRequestClose={this.hideModal}
          className="farm-card__modal"
          overlayClassName="farm-card__modal__overlay"
        >
          Farm Profile
          <button
            type="button"
            className="farm-card__modal__btn-close"
            onClick={() => this.hideModal()}
          >
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

export default FarmCard;
