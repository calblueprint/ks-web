import React from 'react';

import '@styles/FarmSearch.css';

import SearchIcon from '@assets/search-icon.png';
import farmProfileDefaultCover from '@assets/farmProfileCover.png';
import farmProfileDefaultIcon from '@assets/farmProfilePhoto.png';
import NewFarmCard from './NewFarmCard';
import FarmCard from './FarmCard';

class FarmSearch extends React.PureComponent {
  render() {
    const numDetails = 16;
    return (
      <div className="farm-search__body">
        <div className="farm-search__header">
          <div className="farm-search__header-left-column">
            <h1>Farm Search</h1>
            <div className="farm-search__input">
              <input type="text" placeholder="Search" name="search" />
              <img type="image" src={SearchIcon} alt="searchIcon" />
            </div>
          </div>
          <div className="farm-search__header-right-column">
            <button type="button" className="farm-search__filter">
              GAP Certification Stage
            </button>
            <button type="button" className="farm-search__filter">
              Sort By
            </button>
          </div>
        </div>
        <div className="farm-search__grid">
          <NewFarmCard />
          {[...Array(numDetails)].map(id => {
            return (
              <FarmCard
                key={id}
                hubApproved
                gapApproved
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
