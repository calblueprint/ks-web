import React from 'react';

import '../../styles/FarmSearch.css';
import FarmCard from './components/FarmCard';
import NewFarmCard from './components/NewFarmCard';

import SearchIcon from '../../assets/search-icon.png';
import farmProfileDefaultCover from '../../assets/farmProfileCover.png';
import farmProfileDefaultIcon from '../../assets/farmProfilePhoto.png';

class FarmSearch extends React.PureComponent {
  render() {
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
        <div className="farmsearch-gridcontainer">
          <NewFarmCard />
          <FarmCard
            hubApproved="HUB"
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
      /**
            <div className="farmsearch-container">
                <div className="farmsearch-header">
                    <h1>Farm Search</h1>
                    <div className="farmsearch-box">
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="farm-row">
                </div>
        </div>
        */
    );
  }
}

export default FarmSearch;
