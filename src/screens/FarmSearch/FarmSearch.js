import React from 'react';

import '../../styles/FarmSearch.css';
import FarmCard from './components/FarmCard';
import NewFarmCard from './components/NewFarmCard';

import SearchIcon from '../../assets/search-icon.png';
import farmProfileDefaultCover from '../../assets/farmProfileCover.png';
import farmProfileDefaultIcon from '../../assets/farmProfilePhoto.png';

class FarmSearch extends React.PureComponent {
  render() {
    const details = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <div className="farm-search__body">
        <div className="farm-search__header">
          Farm Search
          <div className="farm-search__search">
            <input type="text" placeholder="Search" name="search" />
            <input type="image" src={SearchIcon} alt="searchIcon" />
          </div>
          <button type="button" className="farm-search__filter">
            GAP Certification Stage
          </button>
          <button type="button" className="farm-search__filter">
            Sort By
          </button>
        </div>

        <div className="farm-search__grid">
          <NewFarmCard />
          {details.map(id => {
            return (
              <FarmCard
                key={id}
                hubApproved={Boolean(1)}
                gapApproved={Boolean(1)}
                farmName="Nick's Tomato Farm"
                farmerName="Nick Wong"
                farmLocation="199 Cooley Ct, Wahiawa, Hawaii"
                farmCover={farmProfileDefaultCover}
                userIcon={farmProfileDefaultIcon}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default FarmSearch;
