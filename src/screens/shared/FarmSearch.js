import React, { Component } from 'react';
import Modal from 'react-modal';

import '../../styles/FarmSearch.css';
import FarmCard from './components/FarmCard';
import NewFarmCard from './components/NewFarmCard';

import SearchIcon from '../../assets/search-icon.png';
import farmProfileDefaultCover from '../../assets/farmProfileCover.png';
import farmProfileDefaultIcon from '../../assets/farmProfilePhoto.png';

const ROOT_ELEMENT = '#root';
Modal.setAppElement(ROOT_ELEMENT);

class FarmSearch extends Component {
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
    return (
      <div className="farmsearch-container">
        <div className="farmsearch-header">
          Farm Search
          <div className="farmsearch-box">
            <input type="text" placeholder="Search" name="search" />
            <input type="image" src={SearchIcon} alt="searchIcon" />
          </div>
          <button type="button" className="farmsearch-filterbox">
            GAP Certification Stage
          </button>
          <button type="button" className="farmsearch-filterbox">
            Sort By:
          </button>
        </div>

        <button
          type="button"
          className="buttontest"
          onClick={() => this.showModal()}
        >
          Overlay Test
        </button>
        <Modal
          isOpen={showFarmModal}
          onRequestClose={() => this.hideModal}
          className="farm-modal"
          overlayClassName="farm-modal-overlay"
        >
          Farm Profile
          <button
            type="button"
            className="buttontest"
            onClick={() => this.hideModal()}
          >
            Close
          </button>
          {/* 
        insert Phoebe's card code here
        */}
        </Modal>

        <div className="farmsearch-gridcontainer">
          <NewFarmCard />
          <FarmCard
            hubApproved="HUB"
            S
            gapApproved="GAP"
            farmName="Nick's Tomato Farm"
            farmerName="Nick Wong"
            farmLocation="199 Cooley Ct, Wahiawa, Hawaii"
            farmCover={farmProfileDefaultCover}
            userIcon={farmProfileDefaultIcon}
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="KS Kapālama"
            farmerName="Andi Halim"
            farmLocation="1887 Makuakāne St Honolulu, HI 96817"
            farmCover={farmProfileDefaultCover}
            userIcon={farmProfileDefaultIcon}
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="KS Maui"
            farmerName="Spring Ma"
            farmLocation="275 ‘A‘apueo Pkwy
            Pukalani, HI 96768"
            farmCover={farmProfileDefaultCover}
            userIcon={farmProfileDefaultIcon}
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="KS Hawai‘i"
            farmerName="Alice Zhao"
            farmLocation="16-716 Volcano Rd Kea‘au, HI 96749"
            farmCover={farmProfileDefaultCover}
            userIcon={farmProfileDefaultIcon}
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Kawaiaha‘o Plaza"
            farmerName="Phoebe Li"
            farmLocation="567 South King St Honolulu, HI 96813"
            farmCover={farmProfileDefaultCover}
            userIcon={farmProfileDefaultIcon}
          />
          <FarmCard
            farmName="Hawaiian Mana Farm"
            farmerName="Lebron James"
            farmLocation="84-5090 Hawaii Belt Rd, Captain Cook, HI 96704"
          />
        </div>
      </div>
    );
  }
}

export default FarmSearch;
