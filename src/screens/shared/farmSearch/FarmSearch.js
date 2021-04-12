import React from 'react';

import { getAllFarmsForFarmSearch } from '@lib/farmUtils';

import '@styles/FarmSearch.css';
import SearchIcon from '@assets/search-icon.png';

import FarmCard from './FarmCard';

class FarmSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      search: null,
      filteredFarms: []
    };
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    this.setState({ farms, filteredFarms: farms });
    console.log(farms);
  }

  searchAndFilter = e => {
    const { farms } = this.state;
    const keyword = e.target.value;
    const filteredFarms = farms.filter(
      farm =>
        (farm.farmName &&
          farm.farmName.toLowerCase().includes(keyword.toLowerCase())) ||
        (farm.contactFirstName &&
          farm.contactLastName &&
          `${farm.contactFirstName} ${farm.contactLastName}`
            .toLowerCase()
            .includes(keyword.toLowerCase()))
    );
    this.setState({ filteredFarms });
  };

  render() {
    const { filteredFarms } = this.state;
    return (
      <div className="farm-search__body">
        <div className="farm-search__header">
          <div className="farm-search__header-left-column">
            <h1>Farm Search</h1>
            <div className="farm-search__input">
              <input
                type="text"
                placeholder="Search by Farm Name or Contact Name"
                name="search"
                onChange={event => this.searchAndFilter(event)}
              />
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
          {filteredFarms.map(farm => (
            <FarmCard key={farm.farmId} farm={farm} />
          ))}
        </div>
      </div>
    );
  }
}

export default FarmSearch;
