import React from 'react';

import SearchIcon from '@assets/search-icon.png';
import { getAllFarmsForFarmSearch } from '@lib/farmUtils';

import '@styles/FarmSearch.css';

import FarmCard from './FarmCard';
import NewFarmCard from './NewFarmCard';

class FarmSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      farms: []
    };
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    this.setState({ farms });
  }

  render() {
    const { farms } = this.state;
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
          {farms.map(farm => (
            <FarmCard key={farm.farmId} farm={farm} />
          ))}
        </div>
      </div>
    );
  }
}

export default FarmSearch;
