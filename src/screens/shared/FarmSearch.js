import React from 'react';

import '../../styles/FarmSearch.css';
import FarmCard from './components/FarmCard';
import NewFarmCard from './components/NewFarmCard';
import SearchIcon from '../../assets/search-icon.png';

class FarmSearch extends React.PureComponent {
  render() {
    return (
      <div className="farmsearch-container">
        <div className="farmsearch-header">
          Farm Search
          <form className="farmsearch-box">
            <input type="text" placeholder="Search" name="search" />
            <input type="image" src={SearchIcon} alt="searchIcon" />
          </form>
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
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Andi's Weed Shack"
            farmerName="Andi Halim"
            farmLocation="420 Snoop Dogg Lane, Pittsburgh, PA"
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Farmville"
            farmerName="The Zuck"
            farmLocation="Facebook"
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Toilet"
            farmerName="Custodian"
            farmLocation="High School"
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Toilet"
            farmerName="Custodian"
            farmLocation="High School"
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Toilet"
            farmerName="Custodian"
            farmLocation="High School"
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Toilet"
            farmerName="Custodian"
            farmLocation="High School"
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Toilet"
            farmerName="Custodian"
            farmLocation="High School"
          />
          <FarmCard
            hubApproved="HUB"
            gapApproved="GAP"
            farmName="Toilet"
            farmerName="Custodian"
            farmLocation="High School"
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
