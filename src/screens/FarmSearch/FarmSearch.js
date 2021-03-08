import React from 'react';
import '../../styles/FarmSearch.css';
import FarmCard from './components/FarmCard';
import NewFarmCard from './components/NewFarmCard';
import SearchIcon from '../../assets/search-icon.png';
import getAllFarmsForFarmSearch from '../../lib/farmUtils';

class FarmSearch extends React.PureComponent {
  // lifecycle methods
  // functional vs class components in react
  // react "hooks"
  // javascript promises

  constructor(props) {
    super(props);
    this.state = {
      farms: []
    };
  }

  async componentDidMount() {
    const farms = await getAllFarmsForFarmSearch();
    this.setState({
      farms
    });
  }

  render() {
    const { farms } = this.state;
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
          {farms.map(farm => (
            <FarmCard key={farm.farmId} farm={farm} />
          ))}
        </div>
      </div>
    );
  }
}

export default FarmSearch;
